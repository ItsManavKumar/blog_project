import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { ProfileImage } from "~/components/ProfileImage";
import { useState, FormEvent } from "react";
import CommentList from "~/components/Comment";
import Icons from "./icons";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import RightComponent from "./rightComponent";

export default function Blogs() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();

  const {
    data: tweet,
    isLoading,
    isError,
  } = api.tweet.getTweetById.useQuery(id as string);

  const [newComment, setNewComment] = useState("");
  const queryClient = useQueryClient();

  const createComment = api.tweet.createComment.useMutation({
    onSuccess: async () => {
      setNewComment("");
      await queryClient.invalidateQueries(); //refresh page after adding new comment
    },
  });

 

  const handleAddComment = (e: FormEvent) => {
    e.preventDefault();
    if (!session || !session.user) {
      alert("You must be logged in to add a comment.");
      return;
    }
    createComment.mutate({ tweetId: id as string, content: newComment });
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError || !tweet) return <h1>Error loading post...</h1>;

  const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
  });

  return (
    <>
    <div className="flex">
      <div className="h-max min-h-screen flex-grow justify-center bg-[#f5f5f5] pt-14">
        <div className="flex gap-4 lg:container lg:mx-auto w-full">
          <div
            id="left"
            className="sidebar-hidden mt-14 flex-col items-center py-4 text-gray-700 sm:block"
          >
            <Icons />
          </div>

          <div
            className="mx-2 w-9/12 min-w-[450px] flex-grow rounded-b-md py-4 px-4"
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
                <Link href={`/profiles/${tweet.user.id}`}>
                  <ProfileImage
                    src={tweet.user.image}
                    className="h-8 w-8 rounded-full"
                  />
                </Link>
                <div className="flex flex-col">
                  <Link href={`/profiles/${tweet.user.id}`}>
                    <p className="text-sm text-gray-500 hover:underline">
                      {tweet.user.name}
                    </p>
                  </Link>
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
                  placeholder="Add to this discussion"
                  className="resize-none rounded-md border p-2 text-base"
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
            className="mx-2 hidden w-96 lg:min-w-[400px] py-4 lg:block "
          >
            <RightComponent/>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
