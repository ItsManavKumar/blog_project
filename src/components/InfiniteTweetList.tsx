import Link from "next/link";
import Image from "next/image";
import { ProfileImage } from "./ProfileImage";

type Tweet = {
  id: string;
  imageUrl?: string | null; // Optional imageUrl
  header: string; // Added header
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
    imageUrl,
    header,
    content,
    createdAt,
  }: Tweet) {
    return (
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto my-4">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Tweet Image"
            className="w-full h-[300px] object-cover"
            width={800}
            height={300}
          />
        )}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Link href={`/profiles/${user.id}`}>
              <ProfileImage src={user.image} className="h-8 w-8 rounded-full" />
            </Link>
            <div className="flex flex-col">
              <Link
                href={`/profiles/${user.id}`}
                className="text-gray-500 text-sm hover:underline"
              >
                {user.name}
              </Link>
              <span className="text-gray-500 text-xs">
                {dateTimeFormatter.format(createdAt)}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <Link href={`../BlogPage`}><p className="text-xl font-bold">{header}</p></Link>
            <p className="text-gray-700 text-md py-2">{content}</p>
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
          className="my-4 mx-auto block px-4 py-2 border rounded"
        >
          Load More
        </button>
      )}
    </div>
  );
}
