import { prisma } from "../../lib/db";

export interface CreateThreadPayload {
  content: string;
  authorId: string;
}

class ThreadService {
  // database mein ek thread save karta hai
  public static createThread(payload: CreateThreadPayload) {
    return prisma.thread.create({
      data: {
        content: payload.content,
        authorId: payload.authorId,
      },
    });
  }
  
// naye threads pehle; cursor di ho to us id ke baad se shuru
public static getThreads(limit: number, cursor?: string) {
  return prisma.thread.findMany({
    take: limit,
    // skip: 1 cursor wali row ko chhor deta hai, warna wahi dobara aati
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
  });
}

}


export default ThreadService;