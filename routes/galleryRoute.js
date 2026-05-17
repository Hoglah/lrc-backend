import express from "express";
import {
  addGallery,
  listGallery,
  removeGallery,
} from "../controllers/galleryController.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" }); // temporary local folder

const galleryRouter = express.Router();

// Routes
galleryRouter.post("/add", upload.single("images"), addGallery);
galleryRouter.get("/list", listGallery);
galleryRouter.post("/remove", removeGallery);

export default galleryRouter;
