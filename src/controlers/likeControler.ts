import { Request, Response } from "express";
import likeService from "../services/likeService";

export default new (class LikeControler {
  async createLike(req: Request, res: Response) {
    try {
      const { threadId } = req.body;
      const userId = res.locals.user;

      const like = await likeService.createLike({
        threadId,
        userId,
      });

      res.json({
        status: true,
        message: "success",
        data: like,
      });
    } catch (error) {
      const err = error as unknown as Error;
      console.log(err);

      res.status(500).json({
        status: false,
        message: err.message,
      });
    }
  }

  async getAllLikes(req: Request, res: Response) {
    try {
      const { threadId } = req.params;
      const likes = await likeService.getAllLikes(+threadId);
      res.json({
        status: true,
        message: "success",
        data: likes,
      });
    } catch (error) {
      const err = error as unknown as Error;
      console.log(err);
    }
  }

  async getLikes(req: Request, res: Response) {
    try {
      const { threadId } = req.params;
      const userId = res.locals.user;
      const likes = await likeService.getLikes(+threadId, +userId);
      res.json({
        status: true,
        message: "success",
        data: likes,
      });
    } catch (error) {
      const err = error as unknown as Error;
      console.log(err);
    }
  }
})();
