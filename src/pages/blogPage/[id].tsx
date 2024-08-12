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
  const [postComment, setToggleComment] = useState(false);
  
  const queryClient = useQueryClient();

  const createComment = api.tweet.createComment.useMutation({
    onSuccess: async () => {
      setNewComment("");
      await queryClient.invalidateQueries(); // Refresh page after adding new comment
    },
  });

  const toggleComment = () => {
    setToggleComment(true);
  };

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
    <div className="flex min-h-screen gap-4 bg-[#f5f5f5] px-4 py-8 pt-[74px] lg:flex-row lg:px-16 justify-center">
      <div
        id="left"
        className="sidebar-hidden ml-8 flex justify-end py-4 pt-10 text-gray-700"
      >
        <Icons tweetId={tweet.id} />
      </div>

      <div
  id="middle"
  className="h-full w-full flex-grow rounded-md border border-gray-200 bg-white shadow-sm lg:max-w-[850px] overflow-hidden"
>
        <div className="border-b">
          {tweet.imageUrl && (
            <img
              src={tweet.imageUrl}
              alt="Tweet Image"
              className="h-[400px] w-full rounded-t-md object-cover"
              width={800}
              height={300}
            />
          )}
          <div className="space-y-8 px-16 py-16">
            <div className="mb-2 flex items-center gap-2">
              <Link href={`/profiles/${tweet.user.id}`}>
                <ProfileImage
                  src={tweet.user.image}
                  className="h-[40px] w-[40px] rounded-full"
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
            <div className="flex flex-col space-y-8">
              <h1 className="break-words text-5xl font-bold">{tweet.header}</h1>
              <div
                className="white-space-pre py-2 text-xl text-[#171717] break-words"
                dangerouslySetInnerHTML={{ __html: tweet.content }}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 px-16 py-8">
          <h3 className="text-2xl font-semibold text-[#525252]">
            Top Comments
          </h3>

          <form
            onSubmit={handleAddComment}
            className="flex flex-col space-y-4 pt-8"
          >
            <div className="flex items-start gap-2">
              {session?.user && (
                <Link href={`/profiles/${session.user.id}`}>
                  <ProfileImage
                    src={session.user.image ?? ""}
                    className="h-8 w-8 rounded-full"
                  />
                </Link>
              )}
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onClick={toggleComment}
                placeholder="Add to this discussion"
                className="w-full resize-none rounded-md border p-2 text-base text-gray-800 outline-[#3b49df] placeholder:text-gray-500"
                rows={3}
                required
              />
            </div>
            {postComment && (
              <button
                type="submit"
                className="mb-4 ml-10 mr-auto mt-2 rounded-md bg-[#3b49df] px-4 py-2 text-white"
              >
                Submit
              </button>
            )}
          </form>
          <CommentList comments={tweet.comments || []} />
        </div>
      </div>

      <div id="right" className="hidden min-w-[250px] lg:block lg:w-[380px]">
        <RightComponent />
      </div>
    </div>
  );
}
