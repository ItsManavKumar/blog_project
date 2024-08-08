import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { ProfileImage } from "~/components/ProfileImage";
import { useState, FormEvent } from "react";
import CommentList from "~/components/Comment";
import Icons from "./icons";
import { Button } from "~/components/Button";


export default function Blogs() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: tweet,
    isLoading,
    isError,
  } = api.tweet.getTweetById.useQuery(id as string);

  const [newComment, setNewComment] = useState("");

  const createComment = api.tweet.createComment.useMutation({
    onSuccess: () => {
      setNewComment("");
    },
  });

  const handleAddComment = (e: FormEvent) => {
    e.preventDefault();
    createComment.mutate({ tweetId: id as string, content: newComment });
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError || !tweet) return <h1>Error loading post...</h1>;

  const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
  });

  return (
    <>
      <div className="h-screen flex-grow bg-[#f5f5f5] pt-14">
        <div className="flex gap-4 lg:container lg:mx-auto">
          <div
            id="left"
            className="sidebar-hidden mt-14 flex-col items-center py-4 text-gray-700 sm:block"
          >
            <Icons />
          </div>

          <div
            className="mx-2 w-9/12 min-w-[450px] flex-grow rounded-b-md py-4"
            id="middle"
          >
            {tweet.imageUrl && (
              <img
                src={tweet.imageUrl}
                alt="Tweet Image"
                className="h-[300px] w-full rounded-t-md object-cover"
                width={800}
                height={300}
              />
            )}
            <div className="rounded-md bg-white p-10">
              <div className="mb-2 flex items-center gap-2">
                <ProfileImage
                  src={tweet.user.image}
                  className="h-8 w-8 rounded-full"
                />
                <div className="flex flex-col">
                  <p className="text-sm text-gray-500">{tweet.user.name}</p>
                  <span className="text-xs text-gray-500">
                    {dateTimeFormatter.format(new Date(tweet.createdAt))}
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-5xl font-bold">{tweet.header}</p>
                <p className="py-2 text-xl text-gray-700">{tweet.content}</p>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Top Comments</h3>
                <CommentList comments={tweet.comments || []} />
              </div>
              <form onSubmit={handleAddComment} className="mt-4 flex flex-col">
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
              </form>
            </div>
          </div>

          <div
  id="right"
  className="mx-2 hidden w-96 min-w-[400px] py-4 lg:block"
>
  <div className="flex flex-col overflow-hidden rounded-md border-x border-t relative border-b border-gray-200 bg-white text-lg font-semibold">
    <div className="bg-black flex h-[35px]"></div>
    <div className=" flex items-center gap-2 relative">
      <ProfileImage
        src={tweet.user.image}
        className="h-12 w-12 rounded-full absolute -top-6 left-4 border-4 border-white"
      />
      <div className="text-md font-bold ml-4">
        {tweet.user.name}
      </div>
    </div>
    <Button className="rounded-md mx-4 mb-4 bg-[#3b49df]">
            Follow
      </Button>
  </div>
</div>


        </div>
      </div>
    </>
  );
}
