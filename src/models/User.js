import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    token: { type: String, required: true },
    books: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        genres: { type: [String], required: true },
        img: { type: String, required: true },
        pdf: { type: String },
        rate: { type: String, required: true },
        authors: { type: [String], required: true },
        link: { type: String },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const user = mongoose.model("Users", userSchema);

export default user;
