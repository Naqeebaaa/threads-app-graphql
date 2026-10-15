import ThreadService, { type CreateThreadPayload,} from "../../services/threads/threads";

const queries = {
  threads: async (
    _: any,
    { limit, cursor }: { limit?: number; cursor?: string }
  ) => {
    // client kitna bhi maange, 50 se zyada nahi denge
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
    // token se user nahi mila, yani login nahi hai
    if (!context || !context.user) {
      throw new Error("You must be logged in to create a thread");
    }

    // authorId token se aati hai, client se kabhi nahi leni
    return ThreadService.createThread({
      content,
      authorId: context.user.id,
    });
  },
};

export const resolvers = { queries, mutations };