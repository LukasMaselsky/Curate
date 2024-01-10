import express from "express";
import {
    getRatings,
    createRatingEntry,
    updateRatingEntry,
    getRatingEntry,
} from "../controllers/ratings.js";

const router = express.Router();

router.post("/createRatingEntry", createRatingEntry);
router.get("/getRatings", getRatings);
router.post("/getRatingEntry", getRatingEntry);
router.patch("/updateRatingEntry", updateRatingEntry);

export default router;
