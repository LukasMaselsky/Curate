import express from "express";
import { getRatingsPreview, getTBRPreview } from "../controllers/account.js";

const router = express.Router();

router.get("/getTBRPreview", getTBRPreview);
router.get("/getRatingsPreview", getRatingsPreview);

export default router;
