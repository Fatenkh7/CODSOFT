import express from "express";
const router = express.Router();
import imageHandel from "../middleware/imageHandel.js";

import { add, deleteBlog, getAll, getById, put } from "../controllers/blog.js";

router.get("/",getAll)
router.get("/:ID",getById)
router.put("/:ID",imageHandel,put)
router.delete("/:ID",imageHandel,deleteBlog)
router.post("/add", imageHandel, add);

export default router;