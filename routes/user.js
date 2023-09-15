import express from "express";
const router = express.Router();

import userControllers from "../controllers/user.js";
import auth from "../middleware/auth.js"

router.get("/", auth, userControllers.getAllUser);
router.get("/:ID", auth, userControllers.getUserByParam);
router.put("/:ID", auth, userControllers.updateUserById);
router.delete("/:ID", auth, userControllers.deleteUserById);
router.post("/add", auth, userControllers.createUser);
router.post("/login", userControllers.loginUser);

export default router;