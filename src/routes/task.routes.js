import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = Router();

// 🔐 Toutes les routes sont protégées
router.use(protect);

// 📌 Récupérer toutes les tâches de l'utilisateur connecté
router.get("/", getTasks);

// ➕ Créer une tâche
router.post("/", createTask);

// ✏ Modifier une tâche (titre, description, status)
router.put("/:id", updateTask);

// 🗑 Supprimer une tâche
router.delete("/:id", deleteTask);

export default router;
