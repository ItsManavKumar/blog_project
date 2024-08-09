import {
  ChatBubbleLeftIcon,
  HashtagIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { api } from "~/utils/api";
import { ProfileImage } from "./ProfileImage";
import { useSession } from "next-auth/react";
import { InfiniteTweetList } from "./InfiniteTweetList";

type UserProfileProps = {
  user: {
    id: string;
    name: string;
    image: string | null;
    bio: string | null;
  };
};

function RecentUserPosts({ userId }: { userId: string }) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
  } = api.tweet.infiniteFeed.useInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  // Filter tweets to only include those by the current user
  const tweets = data?.pages.flatMap((page) => page.tweets) ?? [];
  // const userTweets = tweets.filter(tweet => tweet.user.id === currentUserId);
    //  const userTweets = tweets.filter((tweet) => tweet.user.id === user.id);
    const userTweets = tweets.filter(tweet => tweet.user.id === userId);

  return (
    <InfiniteTweetList
      tweets={userTweets}
      fetchNextPage={fetchNextPage}
      hasMore={hasNextPage ?? false}
      isLoading={isLoading}
      isError={isError}
    />
  );
}

export const UserProfile = ({ user }: UserProfileProps) => {
  const { data: session } = useSession();
  // const currentUserId = session?.user?.id ?? "";

  return (
    <div className="flex min-h-screen bg-[#f5f5f5]">
  <div className="relative w-full flex-grow">
    <div className="h-[250px] bg-black"></div>
    <div className="container absolute left-1/2 top-36 mx-auto w-full max-w-5xl -translate-x-1/2 transform rounded-md bg-white p-4 shadow-sm sm:px-8 lg:px-16">
      <ProfileImage
        src={user.image}
        className="absolute top-[-60px] mx-auto h-24 w-24 rounded-full border-[6px] border-black sm:top-[-80px] sm:h-32 sm:w-32 sm:border-[10px]"
      />
      <button className="absolute right-4 top-4 rounded-md bg-[#3b49df] p-2 text-white sm:right-6">
        Edit Profile
      </button>
      <h1 className="mt-[20px] text-center text-xl font-bold sm:mt-[-40px] sm:text-2xl">
        {user.name}
      </h1>
      <h2 className="mb-4 mt-4 flex justify-center text-center text-sm sm:mb-10 sm:text-base">
        {user.bio ?? "404 bio not found"}
      </h2>
    </div>

    <div className="flex mt-[140px] mx-auto max-w-5xl space-x-4">
      {/* Left Section (Profile Stats) */}
      <ul className="w-[340px] h-[170px] flex-shrink-0 flex-col space-y-2 rounded-md bg-white p-2 shadow-sm text-gray-600 text-base">
        <li>
          <a
            href="#home"
            className="flex h-10 w-full items-center gap-2 rounded-md px-2 py-[16px] hover:bg-blue-700/5 hover:underline"
          >
            <PencilSquareIcon className="h-6 w-6 text-gray-400" />
            <span>0 posts published</span>
          </a>
        </li>
        <li>
          <a
            href="#home"
            className="flex h-10 w-full items-center gap-2 rounded-md px-2 py-[16px] hover:bg-blue-700/5 hover:underline"
          >
            <ChatBubbleLeftIcon className="h-6 w-6 text-gray-400" />
            <span>0 comments written</span>
          </a>
        </li>
        <li>
          <a
            href="#home"
            className="flex h-10 w-full items-center gap-2 rounded-md px-2 py-[16px] hover:bg-blue-700/5 hover:underline"
          >
            <HashtagIcon className="h-6 w-6 text-gray-400" />
            <span>0 tags followed</span>
          </a>
        </li>
      </ul>

      {/* Right Section (RecentUserPosts) */}
      <div className="flex-grow p-0">
        <RecentUserPosts userId={user.id} />
      </div>
    </div>
  </div>
</div>

  );
};
