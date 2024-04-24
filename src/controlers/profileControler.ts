import { Request, Response } from "express";
import profileService from "../services/profileService";

export default new (class ProfileController {
  async updateProfile(req: Request, res: Response) {
    try {
      const userId = res.locals.user;
      const { body } = req;
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      let cover = "";
      let avatar = "";

      if (files && files.cover && files.cover[0]) {
        cover = files.cover[0].filename;
      }

      if (files && files.avatar && files.avatar[0]) {
        avatar = files.avatar[0].filename;
      }

      if (cover) {
        body.cover = cover;
      }

      if (avatar) {
        body.avatar = avatar;
      }

      await profileService.updateProfile(userId, body);
      console.log(body);

      res.json({
        status: true,
        message: "success",
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

  async getProfile(req: Request, res: Response) {
    try {
      const userId = res.locals.user;

      const profile = await profileService.getProfile(userId);

      res.json({
        status: true,
        message: "success",
        data: profile,
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

  async getProfileById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const profile = await profileService.getProfileById(+id);
      if (!profile) {
        return res.status(404).json({ message: "Profil tidak ditemukan" });
      }

      res.json({
        status: true,
        message: "success",
        data: profile,
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
})();
