import { getUserByEmail, getUserById } from "../dao/user";
import { HandledError, reqWrapper } from "./utils";
const jwt = require("jsonwebtoken");
const fs = require("fs");
const csv = require("csv-parser");

export const authorizeRequest = () => reqWrapper( async (req: any, res: any, next: any) => {
  const { token } = req.headers;
  if (!token) throw new HandledError("Unauthorized Request. Token is missing");

  let user;
  try {
    user = jwt.verify(token, "secretSalt");
  } catch (error) {
    throw new HandledError("Unauthorized. Wrong token");
  }
  
  const dashboardUser = await getUserById(user.id);

  if (!dashboardUser) {
    throw new HandledError(`No user found`);
  }
  req.user = dashboardUser;
  next();
});
