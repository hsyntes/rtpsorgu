const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    content_title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
    },

    content_description: {
      type: String,
      trim: true,
    },

    content_headings: [
      {
        sub_title: {
          type: String,
          trim: true,
        },

        paragraph: {
          type: String,
          trim: true,
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
    versionKey: false,
  }
);

const Content = mongoose.models.Content || mongoose.model("Content", Schema);

module.exports = Content;
