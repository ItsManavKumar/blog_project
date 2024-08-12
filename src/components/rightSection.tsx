import Link from "next/link";
import React from "react";
import { api } from "~/utils/api";

function RecentUserPosts() {
  const {
    data,
    isLoading,
    isError,
  } = api.tweet.infiniteFeed.useInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading posts</p>;

  const posts = data?.pages.flatMap(page => page.tweets).slice(0,8) ?? [];

  return (
    <div className="flex flex-col overflow-hidden rounded-md border-x border-t border-gray-200 ">
      <div className="border-b border-gray-200 bg-white p-4 text-lg font-semibold">
        <p className="text-md">Active discussions</p>
      </div>
      {posts.map((post) => (
        <div key={post.id} className="border-b border-gray-200 bg-white p-4 text-md ">
          <Link href={`/blogPage/${post.id}`}>
          <p className="text-md text-[#414b5a]">{post.header}</p>
          <p className="text-sm text-[#525252]">{post.comments?.length || 0} comments</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default RecentUserPosts;
