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
      <li className="flex gap-4 border-b px-4 py-4">
        <Link href={`/profiles/${user.id}`}>
          <ProfileImage src={user.image} />
        </Link>
        <div className="flex flex-grow flex-col">
          <div className="flex gap-1">
            <Link
              href={`/profiles/${user.id}`}
              className="font-bold outline-none hover:underline focus-visible:underline"
            >
              {user.name}
            </Link>
            <span className="text-gray-500">-</span>
            <span className="text-gray-500">{dateTimeFormatter.format(createdAt)}</span>
          </div>
          <p className="whitespace-pre-wrap">{content}</p>
        </div>
      </li>
    );
  }

  return (
    <ul>
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
