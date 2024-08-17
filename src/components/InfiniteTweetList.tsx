import Link from "next/link";
import { ProfileImage } from "./ProfileImage";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import { EllipsisHorizontalIcon, FireIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import TweetCardOptionsButton from "./tweetCardOptionsButton";


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
  likedByMe: boolean;
  likes?: string | null;
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
    likedByMe,
  }: Tweet) {
    const [userCommentsCount, setUserCommentsCount] = useState(comments.length);

    // const addReactionMutation = api.tweet.addReaction.useMutation();

    // const toggleReaction = async () => {
    //   try {
    //     await addReactionMutation.mutateAsync({ tweetId: id });

    //   } catch (error) {
    //     console.error("Failed to toggle reaction", error);
    //   }
    // };

    return (
      <div className="mx-auto max-w-4xl overflow-hidden rounded-md border border:bg-gray-600 bg-white">
        <div className="p-4">
          <div className=" flex items-center gap-2">
            <Link href={`/profiles/${user.id}`}>
              <ProfileImage src={user.image} className="h-8 w-8 rounded-full" />
            </Link>
            <div className="flex flex-col">
              <Link
                href={`/profiles/${user.id}`}
                className="lg:text-sm text-xl text-gray-700 hover:underline"
              >
                {user.name}
              </Link>
              <span className="lg:text-xs text-md text-gray-500 text-md">
                {dateTimeFormatter.format(createdAt)}
              </span>
            </div>
            <TweetCardOptionsButton tweetId={id} />
          </div>
          <div className="mx-[40px] mt-3 flex flex-col">
            <Link href={`/blogPage/${id}`}>
              <p className="break-words lg:text-2xl text-3xl font-semibold hover:text-[#3b49df]">
                {header}
              </p>
            </Link>
          </div>
          <div className="mb-2 mt-2 px-12 lg:text-sm text-lg text-[#414b5a]">
  {tags?.split(",").map((tag, index) => (
    <span key={index} className="mr-3">
      {tag}
    </span>
  ))}
</div>


          <div className="">
            <div className="ml-[30px] flex flex-row gap-2 ">
              <button
                // onClick={() => toggleReaction()}
                className={`flex h-10 items-center gap-2 rounded-md px-2 ${likedByMe ? "bg-blue-700 text-white" : "hover:bg-[#f5f5f5]"}`}
              >
                <FireIcon className="h-4 w-4" />
                <span>{likedByMe ? "Liked" : "Like"}</span>
              </button>
              <Link
                href={`/blogPage/${id}`}
                className="flex h-10 items-center gap-2 rounded-md px-2 hover:bg-[#f5f5f5] "
              >
                <ChatBubbleBottomCenterIcon className="h-4 w-4 text-black" />
                <span>
                  {userCommentsCount === 0
                    ? "Add Comment"
                    : `${userCommentsCount} Comment${userCommentsCount > 1 ? "s" : ""}`}
                </span>
              </Link>
            </div>

            <div className="mx-1 mt-4 mb-4">
              <div>
                <ul className="space-y-2">
                  {comments.slice(0, 2).map((comment) => (
                    <li key={comment.id} className="pt-2">
                      <div className="flex gap-2">
                        {comment.user.image && (
                          <ProfileImage
                            src={comment.user.image}
                            className="h-6 w-6 rounded-full"
                          />
                        )}

                        <div className="flex-grow space-y-2 rounded-md bg-[#f5f5f5] p-4">
                          <p className="text-md text-gray-800">
                            {comment.user.name}
                            <span className="mx-2 text-xs text-gray-500">
                              {commentDateFormatter.format(new Date())}
                            </span>
                          </p>

                          <p className="text-gray-800">{comment.content}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                {comments.length > 1 && (
                  <Link href={`/blogPage/${id}`}>
                  <div className="text-sm ml-[30px] mt-8 mb-3 text-gray-500">See all {comments.length} commments</div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-[7px]">
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
