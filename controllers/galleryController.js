import galleryModel from "../models/galleryModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Cloudinary config (use env vars in Render dashboard)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// add gallery item
const addGallery = async (req, res) => {
  try {
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "gallery",
    });

    const gallery = new galleryModel({
      title: req.body.title,
      images: result.secure_url,
    });
    await gallery.save();
    // Remove temp file
    fs.unlinkSync(req.file.path);
    res.json({ success: true, message: "Gallery Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// all gallery list
const listGallery = async (req, res) => {
  try {
    const galleries = await galleryModel.find({});
    res.json({ success: true, data: galleries });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

// delete gallery list
const removeGallery = async (req, res) => {
  try {
    const gallery = await galleryModel.findById(req.body.id);
    if (!gallery) {
      return res.json({ success: false, message: "Gallery not found" });
    }
    // Extract Cloudinary public_id from URL
    const publicId = gallery.images.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`gallery/${publicId}`);

    await galleryModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Gallery Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addGallery, listGallery, removeGallery };
