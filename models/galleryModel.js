import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  images: { type: String, required: true },
});

const galleryModel =
  mongoose.models.Gallery || mongoose.model("Gallery", gallerySchema);

export default galleryModel;
