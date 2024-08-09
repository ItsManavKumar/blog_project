import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const getUserDetails = createTRPCRouter({
  getBio: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input: { userId }, ctx }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: userId },
        select: { 
            name: true,
            image: true,
            bio: true,
         },
      });
      return user?.bio ?? "Bio not found";
    }),

  updateBio: protectedProcedure
    .input(z.object({
      bio: z.string().optional(),
    }))
    .mutation(async ({ input: { bio }, ctx }) => {
      const userId = ctx.session?.user.id;
      if (!userId) {
        throw new Error("Unauthorized");
      }

      await ctx.db.user.update({
        where: { id: userId },
        data: { bio },
      });

      return { success: true };
    }),
});
