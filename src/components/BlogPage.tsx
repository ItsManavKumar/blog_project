import { api } from "~/utils/api";
import { InfiniteTweetList } from "./InfiniteTweetList";

function CurrentBlog() {
    const {
      data,
      fetchNextPage,
      hasNextPage,
      isLoading,
      isError,
    } = api.tweet.infiniteFeed.useInfiniteQuery(
      {},
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );
  
    return (
      <InfiniteTweetList
        tweets={data?.pages.flatMap((page) => page.tweets) ?? []}
        fetchNextPage={fetchNextPage}
        hasMore={hasNextPage ?? false}
        isLoading={isLoading}
        isError={isError}
      />
    );
  }





export default function BlogPage{

}