import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  heroTitle: String,
  heroSubtitle: String,
  heroImage: String,
  storyTitle: String,
  storyContent: String,
  storyImage: String,
  values: [
    {
      icon: String, // Award, Users, Globe, Heart
      title: String,
      description: String,
    },
  ],
  stats: [
    {
      value: String,
      label: String,
    },
  ],
});

export default mongoose.model("About", aboutSchema);
