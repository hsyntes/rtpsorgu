const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    provider: { type: String },
    name: { type: String },
    image: { type: String },
    image2: { type: String },
    live: { type: Number },
    popular: { type: Number },
    popular_game: { type: Number },
    provider_img: { type: String },
    slug: { type: String },
    rtp: { type: Number },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.models.Game || mongoose.model("Game", Schema);
