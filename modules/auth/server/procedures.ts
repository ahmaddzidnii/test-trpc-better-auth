import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { prisma } from "@/lib/prisma";
import { protectedProcedure, createTRPCRouter } from "@/trpc/init";

export const authRouter = createTRPCRouter({
  logout: protectedProcedure.mutation(async ({ ctx }) => {
    if (!ctx.sessionToken) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
      });
    }

    await prisma.session.deleteMany({
      where: {
        token: ctx.sessionToken,
      },
    });
  }),

  revokeSessionByToken: protectedProcedure
    .input(
      z.object({
        token: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.sessionToken) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }

      await prisma.session.deleteMany({
        where: {
          token: input.token,
        },
      });
    }),
});
