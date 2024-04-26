import { PrismaClient } from "@prisma/client";
import { uploadImage } from "../lib/cloudinary/cloudinary";
import { IThread } from "../type/app";

const prisma = new PrismaClient();

interface UploadResponse {
  imageURLs?: string[];
  threadId: number;
}

export default new (class ThreadService {
  async createThread(
    payload: IThread,
    files: { [fieldname: string]: Express.Multer.File[] }
  ) {
    console.log("FILES LENGHT", files);

    const thread = await prisma.thread.create({
      data: {
        ...payload,
        threadId: payload.threadId ? +payload.threadId : null,
      },
    });

    if (files.image) {
      await prisma.threadImage.createMany({
        data: files.image.map((image) => ({
          image: image.filename,
          threadId: thread.id,
        })),
      });
    }
    console.log(thread);

    return thread;
  }

  async getThreads() {
    return await prisma.thread.findMany({
      orderBy: {
        id: "desc",
      },
      where: {
        threadId: null,
      },
      include: {
        image: {
          select: {
            image: true,
          },
        },
        author: {
          select: {
            id: true,
            username: true,
            fullname: true,
            profile: {
              select: {
                avatar: true,
                cover: true,
              },
            },
          },
        },
        replies: {
          select: {
            id: true,
            userId: true,
            author: {
              select: {
                username: true,
                fullname: true,
              },
            },
            conten: true,
            image: {
              select: {
                image: true,
              },
            },
          },
        },

        _count: {
          select: {
            replies: true,
            like: true,
          },
        },
      },
    });
  }

  async getThreadById(userId: number) {
    return await prisma.thread.findMany({
      where: {
        userId,
        threadId: null,
      },
      include: {
        image: {
          select: {
            image: true,
          },
        },
        author: {
          select: {
            id: true,
            username: true,
            fullname: true,
            profile: {
              select: {
                avatar: true,
                cover: true,
              },
            },
          },
        },
        _count: {
          select: {
            replies: true,
            like: true,
          },
        },
      },
    });
  }

  async getThread(id: number) {
    return await prisma.thread.findFirst({
      where: {
        id,
        threadId: null,
      },
      include: {
        image: {
          select: {
            image: true,
          },
        },
        author: {
          select: {
            id: true,
            username: true,
            fullname: true,
            profile: {
              select: {
                avatar: true,
                cover: true,
              },
            },
          },
        },
        _count: {
          select: {
            replies: true,
            like: true,
          },
        },
      },
    });
  }

  async getReplies(threadId: number) {
    return await prisma.thread.findMany({
      where: {
        threadId,
      },
      include: {
        image: {
          select: {
            image: true,
          },
        },
        author: {
          select: {
            id: true,
            username: true,
            fullname: true,
            profile: {
              select: {
                avatar: true,
                cover: true,
              },
            },
          },
        },
        _count: {
          select: {
            replies: true,
          },
        },
      },
    });
  }

  async deleteThread(idThread: number, userId: number) {
    const exixtedThread = await prisma.thread.findFirst({
      where: {
        id: idThread,
      },
    });

    if (!exixtedThread) {
      throw new Error("Thread not found");
    }
    if (exixtedThread.userId !== userId) {
      throw new Error("You are not the owner of this thread");
    }

    await prisma.thread.delete({
      where: {
        id: idThread,
      },
    });
    await prisma.threadImage.deleteMany({
      where: {
        threadId: idThread,
      },
    });

    return true;
  }
})();
