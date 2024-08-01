import Image from "next/image";
import { UserIcon } from "@heroicons/react/24/solid";

type ProfileImageProps = {
  src?: string | null;
  className?: string;
};

export function ProfileImage({ src, className = "" }: ProfileImageProps) {
  return (
    <div
      className={`relative h-12 w-12 overflow-hidden rounded-full ${className}`}
    >
      {src == null ? (
        <UserIcon className="h-full w-full" />
      ) : (
        <Image src={src} alt="Profile Image" quality={100} fill />
      )}
    </div>
  );
}