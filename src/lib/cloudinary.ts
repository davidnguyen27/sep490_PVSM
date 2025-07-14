import { ENV } from "@/config/env.config";
import axios from "axios";

export async function uploadImage(file: File) {
  const url = `https://api.cloudinary.com/v1_1/${ENV.CLOUD_NAME}/image/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", ENV.UPLOAD_PRESET);

  const response = await axios.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.secure_url;
}
