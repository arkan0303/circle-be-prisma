import prisma from "../db";

export default new (class LikeService {
  async createLike(payload: { threadId: number; userId: number }) {
    const existedThread = await prisma.thread.findFirst({
      where: {
        id: payload.threadId,
      },
    });
    if (!existedThread) {
      throw new Error("Thread not found");
    }

    const existedLike = await prisma.like.findFirst({
      where: {
        threadId: payload.threadId,
        userId: payload.userId,
      },
    });

    if (existedLike) {
      return await prisma.like.deleteMany({
        where: {
          threadId: payload.threadId,
          userId: payload.userId,
        },
      });
    }

    return await prisma.like.create({
      data: {
        ...payload,
      },
    });
  }

  async getAllLikes(threadId: number) {
    return await prisma.like.findMany({
      where: {
        threadId,
      },
      include: {
        user: {
          select: {
            username: true,
            profile: true,
          },
        },
      },
    });
  }
  async getLikes(threadId: number, userId: number) {
    const likes = await prisma.like.findFirst({
      where: {
        threadId,
        userId,
      },
    });
    return likes;
  }
})();
