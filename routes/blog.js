import express from "express";
const router = express.Router();
import imageHandel from "../middleware/imageHandel.js";
import auth from "../middleware/auth.js"
import { add, deleteBlog, getAll, getById, put } from "../controllers/blog.js";

router.get("/", auth, getAll)
router.get("/:ID", auth, getById)
router.put("/:ID", auth, imageHandel, put)
router.delete("/:ID", auth, imageHandel, deleteBlog)
router.post("/add", auth, imageHandel, add);

export default router;