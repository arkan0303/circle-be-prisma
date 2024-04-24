import { Request, Response } from "express";
import followService from "../services/followService";

export default new (class FollowControler {
  async createFollow(req: Request, res: Response) {
    try {
      const { followingId } = req.body;
      const followerId = res.locals.user;
      console.log(followerId);

      console.log(followingId);
      const follow = await followService.createFollow(followerId, followingId);
      res.json({
        status: true,
        message: "success",
        data: follow,
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(500).json({
        status: false,
        message: err.message,
      });
    }
  }

  async getFollowers(req: Request, res: Response) {
    try {
      const followingId = res.locals.user;
      const followers = await followService.getFollowers(followingId);
      res.json({
        status: true,
        message: "success",
        data: followers,
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(500).json({
        status: false,
        message: err.message,
      });
    }
  }

  async getFollowingUsers(req: Request, res: Response) {
    try {
      const followerId = res.locals.user;
      const followingUsers = await followService.getFollowingUsers(followerId);
      res.json({
        status: true,
        message: "success",
        data: followingUsers,
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(500).json({
        status: false,
        message: err.message,
      });
    }
  }
  async getFollowerUsers(req: Request, res: Response) {
    try {
      const followingId = res.locals.user;
      const followerUsers = await followService.getFollowerUsers(followingId);
      res.json({
        status: true,
        message: "success",
        data: followerUsers,
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(500).json({
        status: false,
        message: err.message,
      });
    }
  }
})();
