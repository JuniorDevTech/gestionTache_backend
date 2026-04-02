import { loginService, registerService } from "../services/auth.service.js";

const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!usernameRegex.test(username)) {
      res.status(400);
      throw new Error(
        "Nom d'utilisateur invalide (3-20 caractères, lettres, chiffres, _)",
      );
    }

    if (!emailRegex.test(email)) {
      res.status(400);
      throw new Error("Email invalide");
    }

    if (!passwordRegex.test(password)) {
      res.status(400);
      throw new Error(
        "Mot de passe trop faible (8 caractères, majuscule, minuscule, chiffre)",
      );
    }

    const data = await registerService(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Tous les champs sont obligatoires");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400);
      throw new Error("Adresse email invalide");
    }

    if (password.length < 6) {
      res.status(400);
      throw new Error("Mot de passe trop court (min 6 caractères)");
    }

    const data = await loginService(req.body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
