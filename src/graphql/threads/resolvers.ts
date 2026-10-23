
import { prisma } from "../../lib/db";
import ThreadService from "../../services/threads/threads";

const queries = {
  threads: async (
    _: any,
    { limit, cursor }: { limit?: number; cursor?: string }
  ) => {
    // Maximum 50 threads per request
    const take = Math.min(limit ?? 10, 50);
    return ThreadService.getThreads(take, cursor);
  },
};

const mutations = {
  createThread: async (
    _: any,
    { content }: { content: string },
    context: any
  ) => {
    if (!context || !context.user) {
      throw new Error("You must be logged in to create a thread");
    }

    return ThreadService.createThread({
      content,
      authorId: context.user.id,
    });
  },
};

const Thread = {
  author: (parent: { authorId: string }) => {
    return prisma.user.findUnique({
      where: { id: parent.authorId },
    });
  },

  createdAt: (parent: { createdAt: Date }) => {
    return parent.createdAt.toISOString();
  },

  updatedAt: (parent: { updatedAt: Date }) => {
    return parent.updatedAt.toISOString();
  },
};

export const resolvers = { queries, mutations, Thread };
