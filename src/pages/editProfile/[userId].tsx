import { useState, useEffect, FormEvent } from "react";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { Dialog, DialogPanel } from '@tremor/react';

import {
  BookmarkIcon,
  ChatBubbleLeftRightIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/solid";

export default function EditProfile() {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [location, setLocation] = useState<string>("");
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
    }
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await mutation.mutateAsync({
        name,
        email,
        bio,
        location,
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
              <h1 className="p-1 mb-2 text-3xl">{user?.name}</h1>
            </div>
          
          
          <div className="bg-white w-[700px] rounded-md p-8 space-y-4">
            

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
              className="mt-1 block w-full rounded-md border-gray-300 border p-2 outline-none"
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
              className="mt-1 block w-full rounded-md border-gray-300 border p-2 outline-none"
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
              className="mt-1 block w-full rounded-md border-gray-300 border p-2 outline-none "
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
              className="mt-1 block w-full rounded-md border-gray-300 border p-2 outline-none"
            />
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
    <DialogPanel className="bg-red-100 text-red-600 p-4 rounded-md">
      {error}
    </DialogPanel>
  </Dialog>
)}

      </div>
    </div>
  );
}
