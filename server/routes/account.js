import express from "express";
import { getAccountPreview } from "../controllers/account.js";

const router = express.Router();

router.get("/getAccountPreview", getAccountPreview);

export default router;
