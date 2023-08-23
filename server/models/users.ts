import mongoose  from "mongoose";
import bcrypt from "mongoose-bcrypt";
import { IUser } from "../types";
const schema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: { type: String, bcrypt: true },
    name: String,
  },
  { timestamps: true, strict: true, strictQuery: true }
);
schema.plugin(bcrypt);
export const users =  mongoose.model("User", schema, "user");

export async function getUserByEmail(email: string) {
  console.log(email)
  return  await users.findOne({
    "email": email,
  });
}