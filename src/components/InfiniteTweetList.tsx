import Link from "next/link";
import { ProfileImage } from "./ProfileImage";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import { FireIcon } from "@heroicons/react/24/solid";

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
    dateStyle: "short",
  });
  const commentDateFormatter = new Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    month: "short",
  });

  function TweetCard({
    id,
    user,
    imageUrl,
    header,
    content,
    createdAt,
    comments = [],
  }: Tweet) {
    // const [newComment, setNewComment] = useState("");

    // const createComment = api.tweet.createComment.useMutation({
    //   onSuccess: () => {
    //     setNewComment("");
    //   },
    // });

    // const handleAddComment = (e: FormEvent) => {
    //   e.preventDefault();
    //   createComment.mutate({ tweetId: id, content: newComment });
    //   console.log("Tweet ID:", id);
    //   console.log("Comment Content:", newComment);
    // };

    return (
      <div className="mx-auto  max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Tweet Image"
            className="h-[300px] w-full object-cover"
            width={800}
            height={300}
          />
        )}
        <div className="p-4">
          <div className="mb-2 flex items-center gap-2">
            <Link href={`/profiles/${user.id}`}>
              <ProfileImage src={user.image} className="h-8 w-8 rounded-full" />
            </Link>
            <div className="flex flex-col">
              <Link
                href={`/profiles/${user.id}`}
                className="text-sm text-gray-500 hover:underline"
              >
                {user.name}
              </Link>
              <span className="text-xs text-gray-500">
                {dateTimeFormatter.format(createdAt)}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <Link href={`/blogPage/${id}`}>
              <p className="text-xl font-bold hover:text-blue-700">{header}</p>
            </Link>
            <p className="text-md py-2 text-gray-700">{content}</p>
          </div>

          {/* comment component below*/}
          <div className="mt-4">
            <div>
              <ul className="space-y-2">
                {comments.map((comment) => (
                  <li key={comment.id} className="pt-2">
                    <div className="flex gap-2">
                      {comment.user.image && (
                        <ProfileImage
                          src={comment.user.image}
                          className="h-6 w-6 rounded-full"
                        />
                      )}

                      <div className="flex-grow space-y-2 rounded-md bg-[#f5f5f5] p-4">
                        <p className="text-md font-semibold text-gray-800">
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
            </div>
            <div className="flex gap-2 flex-row mt-4">
              <Link
                href={`/blogPage/${id}`}
                className="flex h-10 items-center gap-2 rounded-md px-2 hover:bg-blue-700/5 hover:underline"
              >
                <FireIcon className="h-6 w-6 text-red-500" />
                <span>Reactions</span>
              </Link>
              <Link
                href={`/blogPage/${id}`}
                className="flex h-10 items-center gap-2 rounded-md px-2 hover:bg-blue-700/5 hover:underline"
              >
                <ChatBubbleBottomCenterIcon className="h-6 w-6 text-black" />
                <span>Add Comment</span>
              </Link>
            </div>

            {/* <form onSubmit={handleAddComment} className="mt-4 flex flex-col">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="resize-none rounded-md border p-2"
                rows={3}
                required
              />
              
              <button
                type="submit"
                className="mt-2 rounded bg-blue-500 px-4 py-2 text-white"
              >
                Add Comment
              </button>
            </form> */}
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
