import express from "express";
import {
    getTBR,
    createTBREntry,
    deleteTBREntry,
    getTBREntry,
} from "../controllers/tbr.js";

const router = express.Router();

router.post("/createTBREntry", createTBREntry);
router.get("/getTBR", getTBR);
router.post("/getTBREntry", getTBREntry);
router.delete("/deleteTBREntry/:bookId", deleteTBREntry);

export default router;
