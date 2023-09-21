import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js"
import {
    getAll,
    editCategory,
    deleteById,
    getByCatName,
    getById,
    add,
} from "../controllers/category.js";


router.get("/", auth, getAll);
router.get("/:ID", auth, getById);
router.get("/:CATEGORY", auth, getByCatName);
router.put("/:CATEGORY", auth, editCategory);
router.delete("/:ID", auth, deleteById);
router.post("/add", add);

export default router;