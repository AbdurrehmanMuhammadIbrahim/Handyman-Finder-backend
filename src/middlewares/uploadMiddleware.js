import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "handymen-documents",
    resource_type: "auto", // 📄 handles pdf, docx, etc.
    allowed_formats: ["jpg", "jpeg", "png", "pdf", "doc", "docx"],
    public_id: `${Date.now()}-${file.originalname}`,
  }),
});

const upload = multer({ storage });
export default upload;
