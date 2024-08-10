import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import { type inferAsyncReturnType } from "@trpc/server";
import { type createTRPCContext } from "~/server/api/trpc";
import { type Tweet } from "@prisma/client"; // Ensure this import is correct

export const tweetRouter = createTRPCRouter({
  infiniteFeed: publicProcedure
    .input(
      z.object({
        onlyFollowing: z.boolean().optional(),
        limit: z.number().optional(),
        cursor: z.object({ id: z.string(), createdAt: z.date() }).optional(),
      }),
    )
    .query(async ({ input: { limit = 10, cursor }, ctx }) => {
      return await getInfiniteTweets({
        limit,
        ctx,
        cursor,
        whereClause: {},
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        header: z.string().min(1),
        content: z.string().min(1),
        imageUrl: z.string().url().optional(),
        tags: z.string().optional(),
      }),
    )
    .mutation(async ({ input: { imageUrl, header, content, tags }, ctx }) => {
      if (!ctx.session?.user) {
        throw new Error("User is not authenticated");
      }
      return ctx.db.tweet.create({
        data: {
          imageUrl,
          header,
          content,
          userId: ctx.session.user.id,
          tags,
        },
      });
    }),

  createComment: protectedProcedure
    .input(
      z.object({
        tweetId: z.string(),
        content: z.string().min(1),
      }),
    )
    .mutation(async ({ input: { tweetId, content }, ctx }) => {
      if (!ctx.session?.user) {
        throw new Error("User is not authenticated");
      }
      await ctx.db.comment.create({
        data: {
          content,
          tweetId,
          userId: ctx.session.user.id,
        },
      });
    }),

  getComments: publicProcedure
    .input(z.object({ tweetId: z.string() }))
    .query(async ({ input: { tweetId }, ctx }) => {
      return await ctx.db.comment.findMany({
        where: { tweetId },
        include: { user: { select: { name: true, image: true } } },
        orderBy: { createdAt: "desc" },
      });
    }),

    getTweetById: publicProcedure
    .input(z.string())
    .query(async ({ input: tweetId, ctx }) => {
      return await ctx.db.tweet.findUnique({
        where: { id: tweetId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
              bio: true,
            },
          },
          comments: {
            include: {
              user: true,
            },
            orderBy: { createdAt: "desc" },
          },
           // Include tags directly here
        },
      });
    }),
    
    getCommentsByUser: publicProcedure
  .input(z.object({ userId: z.string() }))
  .query(async ({ input: { userId }, ctx }) => {
    return await ctx.db.comment.findMany({
      where: { userId },
      include: { user: { select: { name: true, image: true } } },
      orderBy: { createdAt: "desc" },
    });
  }),
  // Add other procedures here
  deleteTweet: protectedProcedure
    .input(z.string()) // tweetId
    .mutation(async ({ input: tweetId, ctx }) => {
      if (!ctx.session?.user) {
        throw new Error("User is not authenticated");
      }

      // Check if the tweet exists and if the user is the owner of the tweet
      const tweet = await ctx.db.tweet.findUnique({
        where: { id: tweetId },
        select: { userId: true },
      });

      if (!tweet) {
        throw new Error("Tweet not found");
      }

      if (tweet.userId !== ctx.session.user.id) {
        throw new Error("You are not authorized to delete this tweet");
      }

      await ctx.db.tweet.delete({
        where: { id: tweetId },
      });

      return { success: true };
    }),

});

async function getInfiniteTweets({
  whereClause,
  ctx,
  limit,
  cursor,
}: {
  whereClause?: Partial<Tweet>;
  limit: number;
  cursor: { id: string; createdAt: Date } | undefined;
  ctx: inferAsyncReturnType<typeof createTRPCContext>;
}) {
  const currentUserId = ctx.session?.user.id;

  const data = await ctx.db.tweet.findMany({
    take: limit + 1,
    cursor: cursor ? { createdAt_id: cursor } : undefined,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    where: whereClause,
    select: {
      id: true,
      imageUrl: true,
      header: true,
      content: true,
      createdAt: true,
      tags: true,
      _count: { select: { likes: true } },
      likes: {
        where: { userId: currentUserId },
      },
      user: {
        select: { name: true, id: true, image: true, bio: true },
      },
      comments: {
        where: { userId: currentUserId },
        select: {
          id: true,
          content: true,
          user: { select: { name: true, image: true } },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  let nextCursor: { id: string; createdAt: Date } | undefined;
  if (data.length > limit) {
    const nextItem = data.pop();
    if (nextItem != null) {
      nextCursor = { id: nextItem.id, createdAt: nextItem.createdAt };
    }
  }

  return {
    tweets: data.map((tweet) => ({
      id: tweet.id,
      header: tweet.header,
      content: tweet.content,
      imageUrl: tweet.imageUrl,
      createdAt: tweet.createdAt,
      likeCount: tweet._count.likes,
      user: tweet.user,
      tags: tweet.tags,
      likedByMe: tweet.likes.length > 0,
      comments: tweet.comments, // Include comments here
    })),
    nextCursor,
  };
}
