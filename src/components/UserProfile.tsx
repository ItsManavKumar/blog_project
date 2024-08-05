// components/UserProfile.tsx

import Navbar from "./navbar";
import { ProfileImage } from "./ProfileImage";

type UserProfileProps = {
  user: {
    id: string;
    name: string;
    image: string | null;
  };
};

export const UserProfile = ({ user }: UserProfileProps) => (
    <>
    <div className="bg-black h-[200px] relative">
      <div className="bg-white shadow-lg rounded-md p-4 container mx-auto absolute top-36 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4 sm:px-8 lg:px-16">
        <ProfileImage src={user.image} className="h-24 w-24 rounded-full mx-auto bg-blue-500" />
        <h1 className="text-2xl text-center font-bold mt-4">{user.name}</h1>
        <h2 className="justify-center flex mt-4">404 bio not found</h2>
        {/* Add more user information here */}
      </div>
      <Navbar />
    </div>
  </>
  
);
