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

export default function EditProfile() {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = api.userProfile.getUserDetails.useQuery({ userId: userId ?? "" });

  const mutation = api.userProfile.updateProfile.useMutation({
    onSuccess: () => {
      setError("Profile updated successfully!"); // Set a success message
    },
    onError: (err) => {
      console.error("Failed to update profile:", err);
      setError("Failed to update profile."); // Set an error message
    },
  });

  useEffect(() => {
    if (user) {
      setName(user.name ?? ""); // Convert null to empty string
      setEmail(user.email ?? "");
      setBio(user.bio ?? "");
      setLocation(user.location ?? "");
      setImage(user.image ?? "");
      setPreviewImage(user.image ?? null);
    }
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await mutation.mutateAsync({
        name,
        email,
        bio,
        location,
        image,
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

            <div>
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
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 outline-none "
                />
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white hover:bg-blue-700"
            >
              Save Changes
            </button>
            {error && <p className="text-green-600">{error}</p>}
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
