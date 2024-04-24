import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiOptions,
} from "cloudinary";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (
  imageBuffer: Buffer,
  folder: string
): Promise<{ public_id: string; secure_url: string }> => {
  return new Promise((resolve, reject) => {
    const options: UploadApiOptions = {
      resource_type: "image",
      allowed_formats: ["jpg", "png"],
      folder,
    };

    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error: any, result?: UploadApiResponse) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          if (error) {
            console.log(error);
            reject(error);
          } else if (result) {
            resolve({
              public_id: result.public_id,
              secure_url: result.secure_url,
            });
          } else {
            reject(new Error("Upload result is undefined"));
          }
        }
      }
    );

    uploadStream.end(imageBuffer);
  });
};

export { uploadImage };
