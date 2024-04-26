import { Request, Response } from "express";
import threadService from "../services/threadService";

export default new (class threadController {
  async createThread(req: Request, res: Response): Promise<void> {
    try {
      const { body } = req;
      body.userId = res.locals.user;
      const thread = await threadService.createThread(
        body,
        req.files as { [fieldname: string]: Express.Multer.File[] }
      );
      res.json({
        status: true,
        message: "success",
        data: thread,
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

  async getThreads(req: Request, res: Response): Promise<void> {
    try {
      const threads = await threadService.getThreads();
      res.json({
        status: true,
        message: "success",
        data: threads,
      });
    } catch (error) {
      const errorr = error as unknown as Error;
      res.status(500).json({ status: false, message: errorr.message });
    }
  }
  async getThread(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const thread = await threadService.getThread(+id);
      res.json({
        status: true,
        message: "success",
        data: thread,
      });
    } catch (error) {
      const errorr = error as unknown as Error;
      res.status(500).json({ status: false, message: errorr.message });
    }
  }

  async getThreadById(req: Request, res: Response): Promise<void> {
    try {
      const userId = res.locals.user;
      const thread = await threadService.getThreadById(userId);
      res.json({
        status: true,
        message: "success",
        data: thread,
      });
    } catch (error) {
      const errorr = error as unknown as Error;
      res.status(500).json({ status: false, message: errorr.message });
    }
  }

  async getThreadUser(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;

      const thread = await threadService.getThreadById(+userId);
      res.json({
        status: true,
        message: "success",
        data: thread,
      });
    } catch (error) {
      const errorr = error as unknown as Error;
      res.status(500).json({ status: false, message: errorr.message });
    }
  }

  async getReplies(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const replies = await threadService.getReplies(+id);
      res.json({
        status: true,
        message: "success",
        data: replies,
      });
    } catch (error) {
      const errorr = error as unknown as Error;
      res.status(500).json({ status: false, message: errorr.message });
    }
  }
})();
