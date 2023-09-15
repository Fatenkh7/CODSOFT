import express from "express"
import { add, deleteById, getAll, getById, put } from "../controllers/like.js"
const router = express.Router()


router.get("/", getAll)
router.get("/:ID", getById)
router.put("/:ID", put)
router.delete("/:ID", deleteById)
router.post("/add", add)

export default router;