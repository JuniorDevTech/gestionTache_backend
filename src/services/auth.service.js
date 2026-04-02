import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";

export const registerService = async ({ username, email, password }) => {
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error("Utilisateur déjà existant");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  return {
    token: generateToken(user._id),
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  };
};

export const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Identifiants invalides");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Identifiants invalides");

  return {
    token: generateToken(user._id),
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  };
};
