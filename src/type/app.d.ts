export interface IRegister {
  username: string;
  password: string;
  email: string;
  fullname: string;
  profile?: string;
  sampul?: string;
  bio?: string;
}

export interface ILogin {
  username: string;
  password: string;
}
export type AuthMiddlewareData = {
  id: string;
};

export interface IThread {
  id?: number;
  conten?: string;
  userId: number;
  threadId?: number;
  profileUserId: number;
}

export interface IProfile {
  bio?: string;
  avatar?: string;
  cover?: string;
  userId?: number;
}

export interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

import { Multer } from "multer";

interface MulterFile extends Multer.File {}

export { MulterFile };
