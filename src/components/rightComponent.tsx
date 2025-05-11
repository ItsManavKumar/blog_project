import { ProfileImage } from "~/components/ProfileImage";
import { Button } from "~/components/Button";
import Link from "next/link";

type Props = {
  tweet: {
    user: {
      name: string | null;
      image: string | null;
      bio?: string | null;
      location?: string | null;
      id: string;
    };
  };
};

export default function RightComponent({ tweet }: Props) {
  return (
    <div
      className="relative flex flex-col overflow-hidden rounded-md border-x border-b border-t border-gray-200 bg-white text-lg"
      style={{ zIndex: 1 }}
    >
      <div className="flex h-[35px] bg-black"></div>
      <div className="relative flex items-center gap-2 font-semibold">
        <ProfileImage
          src={tweet.user.image}
          className="absolute -top-6 left-4 h-12 w-12 rounded-full border-4 border-white"
        />
        <div className="text-md ml-4 font-bold">{tweet.user.name}</div>
      </div>
      <Link href={`/profiles/${tweet.user.id}`} className="block mx-4">
        <Button className="mb-4 rounded-md bg-[#3b49df] w-full">
          View Profile
        </Button>
      </Link>
      <div className="flex flex-col space-y-4 p-5">
        <p className="text-base text-gray-500">
          {tweet.user.bio ?? "404 bio not found"}
        </p>
        <div>
          <p className="text-xs font-semibold text-gray-600">LOCATION</p>
          <p className="text-base text-gray-500">{tweet.user.location}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-600">WORK</p>
          <p className="text-base text-gray-500">Software Graduate</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-600">JOINED</p>
          <p className="text-base text-gray-500">21 Jun 2024</p>
        </div>
      </div>
    </div>
  );
}
