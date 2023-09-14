import express from "express";
const router = express.Router();

import userControllers from "../controllers/user.js";

router.get("/", userControllers.getAllUser);
router.get("/:ID", userControllers.getUserByParam);
router.put("/:ID",userControllers.updateUserById);
router.delete("/:ID",userControllers.deleteUserById);
router.post("/add", userControllers.createUser);

export default router;