import Link from "next/link";
import { ProfileImage } from "./ProfileImage";

type Tweet = {
  id: string;
  content: string;
  createdAt: Date;
  user: { id: string; image: string | null; name: string | null };
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
    return <h2 className="my-4 text-center text-2xl text-gray-500">No Tweets</h2>;
  }

  const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
  });

  function TweetCard({
    user,
    content,
    createdAt,
  }: Tweet) {
    return (
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w space-y-2 p-4 mb-4">
        <div className="flex items-center gap-4">
          <Link href={`/profiles/${user.id}`}>
            <ProfileImage src={user.image} className="h-8 w-8 rounded-full" />
          </Link>
          <div className="flex flex-col">
            <Link
              href={`/profiles/${user.id}`}
              className="font-bold outline-none hover:underline focus-visible:underline text-gray-900 text-lg"
            >
              {user.name}
            </Link>
            <span className="text-gray-500 text-sm">
              {dateTimeFormatter.format(createdAt)}
            </span>
          </div>
        </div>
        <p className="text-gray-700 text-md py-2">{content}</p>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {tweets.map((tweet) => (
        <TweetCard key={tweet.id} {...tweet} />
      ))}
      {hasMore && !isLoading && (
        <button onClick={fetchNextPage} className="my-4 mx-auto block px-4 py-2 border rounded">
          Load More
        </button>
      )}
    </ul>
  );
}
