import { getUserByEmail } from "../dao/user";
import { prisma } from "../dao/utils";
import { assertNonEmpty, HandledError, reqWrapper } from "../helpers/utils";
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

const loginUser = reqWrapper(async (req: any, res: any) => {
  const { email, password } = req.body || {};
  if (!email || !password) throw new HandledError("Username or password is missing");

  const user = await getUserByEmail(email);

  if (!user) throw new HandledError("User not found. Please sign up");
  if(user.password !== password) throw new HandledError("Wrong Password. Please check the password and try again");

  const token = jwt.sign(user, "secretSalt");

  return res.sendResponse({
    token,
    user
  });
});

const signupUser = reqWrapper(async (req, res) => {
  const { name, email, password, phoneNumber } = req.body || {};
  assertNonEmpty({ name, email, password, phoneNumber });

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new HandledError("User already exist with this email");
  }

  const user = await prisma.user.create({ data: { name, email, password, phoneNumber }});

  return res.sendResponse({ data: user });
});

router.post("/login", loginUser);
router.post("/sign-up", signupUser);

export = router;
