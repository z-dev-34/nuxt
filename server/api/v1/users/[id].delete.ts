import { users } from "../../../models/index";
export default defineEventHandler(async (event) => {
  const userId = event.context.params?.id;
  console.log(`DELETE /api/users/${userId}`);
  try {
    console.log("Find user");
    const userData = await users.findByIdAndDelete({
      "_id": userId,
    });
    if (userData) {
      console.log("User found");
      event.res.statusCode = 202;
      return {
        code: "USER_DELETE",
        message: `User with id ${userId} has been deleted.`,
      };
    } else {
      console.log("User not found");
      event.res.statusCode = 404;
      return {
        code: "USER_NOT_FOUND",
        message: `User with id ${userId} doesn't exists.`,
      };
    }
  } catch (err) {
    console.dir(err);
    event.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});