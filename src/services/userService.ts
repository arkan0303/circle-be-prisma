import prisma from "../db";
import { ILogin, IRegister } from "../type/app";
import { registerValidation } from "../lib/validations/register";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export default new (class UserService {
  async getUsers() {
    return await prisma.user.findMany({
      include: {
        profile: true,
        follower: true,
        following: true,
      },
    });
  }

  async getUserNotId(id: number) {
    return await prisma.user.findMany({
      where: {
        NOT: {
          id: id,
        },
      },
      include: {
        profile: true,
        follower: true,
        following: true,
      },
    });
  }

  async register(data: IRegister) {
    const { error, value } = registerValidation(data);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const isExits = await prisma.user.findFirst({
      where: {
        OR: [
          {
            username: value.username,
          },
          {
            email: value.email,
          },
        ],
      },
    });
    if (isExits) {
      throw new Error("username or email already exists");
    }
    const hashedPassword = await bcrypt.hash(value.password, 10);

    value.password = hashedPassword;
    const user = await prisma.user.create({
      data: {
        ...value,
      },
    });

    const profile = await prisma.profile.create({
      data: {
        userId: user.id,
      },
    });

    return { user, profile };
  }

  async login(
    username: string,
    password: string
  ): Promise<{
    token: string;
    userProfile: {
      id: number;
      userId: number;
      avatar: string | null;
      cover: string | null;
      bio: string | null;
    } | null;
  }> {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            username,
          },
          {
            email: username,
          },
        ],
      },
    });

    const profile = await prisma.profile.findFirst({
      where: {
        userId: user?.id,
      },
    });

    const follow = await prisma.follow.findFirst({
      where: {
        followerId: user?.id,
        followingId: user?.id,
      },
    });

    if (!user) {
      throw new Error("user not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("password not match");
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY!, {
      expiresIn: "1h",
    });

    return { token, userProfile: profile };
  }

  async check(username: any) {
    return await prisma.user.findFirst({
      where: {
        username: username.user,
      },
      include: {
        profile: true,
        _count: {
          select: {
            follower: true,
            following: true,
          },
        },
      },
    });
  }
})();
