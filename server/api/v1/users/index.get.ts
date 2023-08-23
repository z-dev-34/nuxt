import { users } from "../../../models/index";

export default defineEventHandler(async (event) => {
  console.log("GET /api/users");
  try {
    console.log("Find users");
    const usersData = await users.find();
    return usersData
  } catch (err) {
    console.dir(err);
    event.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});