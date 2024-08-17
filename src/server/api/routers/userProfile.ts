import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const userProfileRouter = createTRPCRouter({
  getUserDetails: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input: { userId }, ctx }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: userId },
        select: { 
          name: true,
          image: true,
          bio: true,
          email: true,      // Include other fields if needed
          location: true,   // Include other fields if needed
        },
      });
      return user ?? { name: "Name not found", image: null, bio: "Bio not found", email: "Email not found", location: "Location not found" };
    }),

  updateProfile: protectedProcedure
    .input(z.object({
      name: z.string().optional(),
      email: z.string().email().optional(),
      bio: z.string().optional(),
      location: z.string().optional(),
      image: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session?.user.id;
      if (!userId) {
        throw new Error("Unauthorized");
      }

      await ctx.db.user.update({
        where: { id: userId },
        data: {
          name: input.name,
          email: input.email,
          bio: input.bio,
          location: input.location,
          image: input.image,
        },
      });

      return { success: true };
    }),
});
