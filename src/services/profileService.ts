import prisma from "../db";
import { IProfile } from "../type/app";

class ProfileService {
  async updateProfile(userId: number, payload: IProfile) {
    return await prisma.profile.update({
      where: {
        userId,
      },
      data: {
        ...payload,
      },
    });
  }

  async getProfile(userId: number) {
    return await prisma.profile.findFirst({
      where: {
        id: userId,
      },
      include: {
        user: {
          select: {
            username: true,
            fullname: true,
            email: true,

            thread: {
              select: {
                id: true,
                conten: true,
                createdAt: true,
                image: {
                  select: {
                    image: true,
                  },
                },
                _count: {
                  select: {
                    replies: true,
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
              },
            },
            _count: {
              select: {
                follower: true,
                following: true,
                like: true,
              },
            },
          },
        },
      },
    });
  }
  async getProfileById(id: number) {
    return await prisma.profile.findFirst({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            username: true,
            fullname: true,
            email: true,

            thread: {
              select: {
                id: true,
                conten: true,
                createdAt: true,
                image: {
                  select: {
                    image: true,
                  },
                },
                _count: {
                  select: {
                    replies: true,
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
              },
            },
            _count: {
              select: {
                follower: true,
                following: true,
                like: true,
              },
            },
          },
        },
      },
    });
  }
}

export default new ProfileService();
