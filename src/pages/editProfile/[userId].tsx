/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState, useEffect, FormEvent } from "react";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { Dialog, DialogPanel } from "@tremor/react";

import {
  BookmarkIcon,
  ChatBubbleLeftRightIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/solid";
import { ProfileImage } from "~/components/ProfileImage";

type SignResponse = {
  timestamp: number;
  signature: string;
  folder: string;
};

export default function EditProfile() {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [image, setImage] = useState<string>(""); // store URL
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // separate states: page loading vs image upload
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = api.userProfile.getUserDetails.useQuery({ userId: userId ?? "" });

  const mutation = api.userProfile.updateProfile.useMutation({
    onSuccess: () => setError("Profile updated successfully!"),
    onError: (err) => {
      console.error("Failed to update profile:", err);
      setError("Failed to update profile.");
    },
  });

  useEffect(() => {
    if (user) {
      setName(user.name ?? "");
      setEmail(user.email ?? "");
      setBio(user.bio ?? "");
      setLocation(user.location ?? "");
      setImage(user.image ?? "");
      setPreviewImage(user.image ?? null);
    }
  }, [user]);

  async function uploadToCloudinary(file: File) {
    setIsUploadingImage(true);
    setError(null);

    try {
      // 1) sign request (your existing API route)
      const signRes = await fetch("/api/cloudinary/sign", { method: "POST" });
      if (!signRes.ok) throw new Error("Failed to get upload signature");
      const { timestamp, signature, folder } =
        (await signRes.json()) as SignResponse;

      // 2) upload to Cloudinary
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
      if (!cloudName || !apiKey) {
        throw new Error(
          "Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME or NEXT_PUBLIC_CLOUDINARY_API_KEY"
        );
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", String(timestamp));
      formData.append("signature", signature);
      formData.append("folder", folder);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: formData }
      );

      const uploadJson = await uploadRes.json();
      if (!uploadRes.ok) {
        throw new Error(uploadJson?.error?.message ?? "Upload failed");
      }

      const url = uploadJson.secure_url as string;

      // ✅ store URL in state (not base64)
      setPreviewImage(url);
      setImage(url);
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? "Profile image upload failed");
    } finally {
      setIsUploadingImage(false);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // optional: basic size guard (2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError("Image too large. Please choose a file under 2MB.");
      return;
    }

    void uploadToCloudinary(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await mutation.mutateAsync({
        name,
        email,
        bio,
        location,
        image, // ✅ URL saved to DB
      });
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError("Failed to update profile.");
    }
  };

  if (userLoading) return <p>Loading...</p>;
  if (userError)
    return <p className="text-red-600">Failed to load user data.</p>;

  return (
    <div className="flex min-h-screen gap-4 bg-[#f5f5f5] px-4 py-8 pt-[74px] lg:flex-row lg:px-16">
      <div className="sidebar-hidden mx-[200px] flex gap-4 text-gray-700">
        <ul className="w-[240px] flex-row space-y-2">
          <li className="rounded-md bg-white">
            <a
              href="#home"
              className="flex h-10 w-full items-center gap-2 rounded-md px-2 py-[16px] hover:bg-blue-700/5 hover:underline"
            >
              <FaceSmileIcon className="h-6 w-6 text-[#525252]" />
              Profile
            </a>
          </li>
          <li className="rounded-md">
            <a
              href="#home"
              className="flex h-10 w-full items-center gap-2 rounded-md px-2 hover:bg-blue-700/5 hover:underline"
            >
              <ChatBubbleLeftRightIcon className="h-6 w-6 text-[#525252]" />{" "}
              Customization
            </a>
          </li>
          <li className="rounded-md">
            <a
              href="#home"
              className="flex h-10 w-full items-center gap-2 rounded-md px-2 hover:bg-blue-700/5 hover:underline"
            >
              <BookmarkIcon className="h-6 w-6 text-[#525252]" /> Notifications
            </a>
          </li>
          <li className="rounded-md">
            <a
              href="#home"
              className="flex h-10 w-full items-center gap-2 rounded-md px-2 hover:bg-blue-700/5 hover:underline"
            >
              <BookmarkIcon className="h-6 w-6 text-[#525252]" /> Account
            </a>
          </li>
          <li className="rounded-md">
            <a
              href="#home"
              className="flex h-10 w-full items-center gap-2 rounded-md px-2 hover:bg-blue-700/5 hover:underline"
            >
              <BookmarkIcon className="h-6 w-6 text-[#525252]" /> Organization
            </a>
          </li>
        </ul>

        <form onSubmit={handleSubmit} className="">
          <div>
            <h1 className="mb-2 p-1 text-3xl">{user?.name}</h1>
          </div>

          <div className="w-[700px] space-y-4 rounded-md bg-white p-8">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 outline-none"
              required
            />

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 outline-none"
                required
              />
            </div>

            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700"
              >
                Bio
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 outline-none"
                rows={4}
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 outline-none"
              />
            </div>

            <div className="flex items-center gap-4">
              <ProfileImage src={previewImage} className="h-16 w-16" />

              <div className="w-[250px]">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Profile Image
                </label>

                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={isUploadingImage}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 outline-none"
                />

                {isUploadingImage && (
                  <p className="mt-1 text-sm text-gray-500">Uploading...</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isUploadingImage || mutation.isPending}
              className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white hover:bg-blue-700 disabled:opacity-60"
            >
              Save Changes
            </button>

            {error && (
              <p
                className={
                  error.includes("successfully")
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {error}
              </p>
            )}
          </div>
        </form>

        {error && (
          <Dialog open={Boolean(error)} onClose={() => setError(null)}>
            <DialogPanel className="rounded-md bg-red-100 p-4 text-red-600">
              {error}
            </DialogPanel>
          </Dialog>
        )}
      </div>
    </div>
  );
}
