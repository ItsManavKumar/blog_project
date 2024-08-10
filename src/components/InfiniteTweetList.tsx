import Link from "next/link";
import { ProfileImage } from "./ProfileImage";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import { EllipsisHorizontalIcon, FireIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import TweetCardOptionsButton from "./tweetCardOptionsButton";
import { api } from "~/utils/api";

type Comment = {
  id: string;
  content: string;
  user: { name: string | null; image?: string | null };
};

type Tweet = {
  id: string;
  imageUrl?: string | null;
  header: string;
  content: string;
  createdAt: Date;
  user: { id: string; image: string | null; name: string | null };
  comments?: Comment[];
  tags?: string | null;
};

type InfiniteTweetListProps = {
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean;
  fetchNextPage: () => void;
  tweets: Tweet[];
};

export function InfiniteTweetList({
  tweets,
  isError,
  isLoading,
  fetchNextPage,
  hasMore,
}: InfiniteTweetListProps) {
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <h1>Error...</h1>;

  if (tweets.length === 0) {
    return (
      <h2 className="my-4 text-center text-2xl text-gray-500">No Tweets</h2>
    );
  }

  const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    month: "short",
  });
  const commentDateFormatter = new Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    month: "short",
  });

  

  function TweetCard({
    id,
    user,
    header,
    createdAt,
    tags,
    comments = [],
  }: Tweet) {

    const [userCommentsCount, setUserCommentsCount] = useState(comments.length);


    return (
      <div className="mx-auto  max-w-4xl overflow-hidden rounded-lg  shadow-lg bg-white">
        <div className="p-4">
          <div className="mb-2 flex items-center gap-2">
            <Link href={`/profiles/${user.id}`}>
              <ProfileImage src={user.image} className="h-8 w-8 rounded-full" />
            </Link>
            <div className="flex flex-col">
              <Link
                href={`/profiles/${user.id}`}
                className="text-sm text-gray-700 hover:underline"
              >
                {user.name}
              </Link>
              <span className="text-xs text-gray-500">
                {dateTimeFormatter.format(createdAt)}
              </span>
            </div>
            <TweetCardOptionsButton tweetId={id}/>
          </div>
          <div className="flex flex-col  mx-[40px]">
            <Link href={`/blogPage/${id}`}>
              <p className="text-2xl font-semibold hover:text-[#3b49df] break-words">{header}</p>
            </Link>
           
          </div>

     
          <div className="">
            
            <div className="flex gap-2 flex-row ml-[30px]">
              <Link
                href={`/blogPage/${id}`}
                className="flex h-10 items-center gap-2 rounded-md px-2 hover:bg-blue-700/5 hover:underline"
              >
                <FireIcon className="h-4 w-4 text-red-500" />
                <span>Reactions</span>
              </Link>
              <Link
                href={`/blogPage/${id}`}
                className="flex h-10 items-center gap-2 rounded-md px-2 hover:bg-blue-700/5 hover:underline"
              >
                <ChatBubbleBottomCenterIcon className="h-4 w-4 text-black" />
                <span>{userCommentsCount === 0 ? "Add Comment" : `${userCommentsCount} Comment${userCommentsCount > 1 ? "s" : ""}`}</span>
                <span>{tags}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tweets.map((tweet) => (
        <TweetCard key={tweet.id} {...tweet} />
      ))}
      {hasMore && !isLoading && (
        <button
          onClick={fetchNextPage}
          className="mx-auto my-4 block rounded border px-4 py-2"
        >
          Load More
        </button>
      )}
    </div>
  );
}
