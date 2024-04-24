import userService from "../services/userService";
import { Request, Response } from "express";

export default new (class userControler {
  async getUsers(req: Request, res: Response) {
    try {
      const users = await userService.getUsers();
      res.json({
        status: true,
        data: { users },
        message: "Get users success",
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(500).json({
        status: false,
        message: err.message,
      });
    }
  }

  async getUserNotId(req: Request, res: Response) {
    try {
      const id = res.locals.user;
      const users = await userService.getUserNotId(id);
      res.json({
        status: true,
        data: { users },
        message: "Get user success",
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(500).json({
        status: false,
        message: err.message,
      });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const { body } = req;
      const result = await userService.register(body);
      console.log(result);

      res.json({
        status: true,
        data: { result },
        message: "Register success",
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(500).json({
        status: false,
        message: err.message,
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const token = await userService.login(username, password);
      res.json({
        status: true,
        data: { token },
        message: "Login success",
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(500).json({
        status: false,
        message: err.message,
      });
    }
  }

  async check(req: Request, res: Response) {
    try {
      const { username } = req.body;
      const result = await userService.check(username);
      res.json({
        status: true,
        data: { result },
        message: "Check success",
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
