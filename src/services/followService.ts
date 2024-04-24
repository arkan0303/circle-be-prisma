import prisma from "../db";

export default new (class FollowService {
  async createFollow(followerId: number, followingId: number) {
    const existedFollow = await prisma.follow.findFirst({
      where: {
        followerId,
        followingId,
      },
    });

    if (existedFollow) {
      return await prisma.follow.deleteMany({
        where: {
          followingId,
        },
      });

      return "unfollow success";
    }

    const follow = await prisma.follow.create({
      data: {
        followerId,
        followingId,
      },
    });

    if (!follow) {
      throw new Error("follow failed");
    }

    return "follow success";
  }

  async getFollowingUsers(userId: number) {
    try {
      const followingUsers = await prisma.follow.findMany({
        where: {
          followerId: userId,
        },
        include: {
          following: true,
        },
      });
      return followingUsers.map((follow) => follow.following);
    } catch (error) {
      throw new Error("Failed to get following users");
    }
  }

  async getFollowers(userId: number) {
    try {
      const followingUsers = await prisma.follow.findMany({
        where: {
          followingId: userId,
        },
        include: {
          follower: true,
        },
      });
      return followingUsers.map((follow) => follow.follower);
    } catch (error) {
      throw new Error("Failed to get following users");
    }
  }

  async getFollowerUsers(userId: number) {
    try {
      const followingUsers = await prisma.follow.findMany({
        where: {
          followingId: userId,
        },
        include: {
          follower: {
            include: {
              profile: {
                select: {
                  avatar: true,
                  bio: true,
                },
              },
            },
          },
        },
      });
      return followingUsers.map((follow) => follow.follower);
    } catch (error) {
      throw new Error("Failed to get following users");
    }
  }
})();
