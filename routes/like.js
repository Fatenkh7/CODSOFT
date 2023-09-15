import express from "express"
import { add, deleteById, getAll, getById, put } from "../controllers/like.js"
const router = express.Router()
import auth from "../middleware/auth.js"

router.get("/", auth, getAll)
router.get("/:ID", auth, getById)
router.put("/:ID", auth, put)
router.delete("/:ID", auth, deleteById)
router.post("/add", auth, add)

export default router;