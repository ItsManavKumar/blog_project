import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { ProfileImage } from "~/components/ProfileImage";
import { Button } from "~/components/Button";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function RightComponent() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();

  const {
    data: tweet,
    isLoading,
    isError,
  } = api.tweet.getTweetById.useQuery(id as string ?? null);
 

  if (isLoading) return <p>Loading...</p>;
  if (isError || !tweet) return <h1>Error loading post...</h1>;

  return (
    <div
              className="relative flex flex-col  overflow-hidden rounded-md border-x border-b border-t border-gray-200 bg-white text-lg "
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
              <Button className="mx-4 mb-4 rounded-md bg-[#3b49df]">
                Follow
              </Button>
              <div className="flex flex-col space-y-4 p-5">
                <p className="text-base text-gray-500">
                  {tweet.user.bio ?? "404 bio not found"}
                </p>
                <div>
                  <p className="text-xs font-semibold text-gray-600">
                    LOCATION
                  </p>
                  <p className="text-base text-gray-500">Sydney, Australia</p>
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
  )
}

