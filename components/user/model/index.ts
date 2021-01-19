import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  name: string;
  email: string;
  username: string;
  password: string;
}
export interface IUserBaseDocument extends IUser, Document {
  facebookId: string;
  img: string;
  bio: string;
  lastConnection: string;
}

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      maxlength: 40,
      minlength: 5,
      index: true,
      unique: true,
    },
    facebookId: {
      type: String,
      default: "",
      index: true,
    },
    password: {
      type: String,
      minlength: 8,
      maxlength: 30,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      unique: true,
      type: String,
      required: true,
    },
    img: {
      type: String,
      default: "https://lyts-10.s3-sa-east-1.amazonaws.com/profile_default.jpg",
    },
    bio: {
      type: String,
      default: "",
    },
    lastConnection: {
      type: String,
    },
  },
  { toJSON: { virtuals: true }, id: false, timestamps: true }
);

UserSchema.virtual("posts", {
  ref: "post",
  localField: "_id",
  foreignField: "user",
});
UserSchema.virtual("follows", {
  ref: "follow",
  localField: "_id",
  foreignField: "user",
});

UserSchema.virtual("numSeguiendo", {
  ref: "follow",
  localField: "_id",
  foreignField: "user",
  count: true,
});
UserSchema.virtual("numSeguidores", {
  ref: "follow",
  localField: "_id",
  foreignField: "follow",
  count: true,
});

// UserSchema.pre<IUserBaseDocument>("save", function (next) {
//   // Se genera una contraseña en casa de que no tenga porque los usuarios
//   // registrados por facebook no tiene una contraseña
//   bcrypt.hash(this.password || Date.now().toString(), 2).then((hash) => {
//     this.password = hash;
//     next();
//   });
// });

// UserSchema.pre("findOne", async function () {
//   this.populate("posts")
//     .populate("numSeguiendo")
//     .populate("numSeguidores")
//     .populate({
//       path: "follows",
//       select: "follow -_id -user",
//       populate: {
//         path: "follow",
//         select: "userName img lastConnection",
//       },
//     });
// });
export default mongoose.model<IUserBaseDocument>("User", UserSchema);
