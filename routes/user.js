import express from "express";
const router = express.Router();
import { add, deleteById, getAll, getById, loginUser, put } from "../controllers/user.js"
import auth from "../middleware/auth.js"

router.get("/", auth, getAll);
router.get("/:ID", auth, getById);
router.put("/:ID", auth, put);
router.delete("/:ID", auth, deleteById);
router.post("/add", add);
router.post("/login", loginUser);

export default router;