import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getRatings = (req, res) => {
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "SELECT * FROM ratings WHERE `user_id` = ?";

        db.query(q, [userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json(data);
        });
    });
};

export const getRatingEntry = (req, res) => {
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q =
            "SELECT * FROM `ratings` WHERE `user_id` = ? AND `book_id` = ?";

        const values = [userInfo.id, req.body.bookId];

        db.query(q, [...values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json(data);
        });
    });
};

export const createRatingEntry = (req, res) => {
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q =
            "INSERT INTO ratings(`user_id`, `book_id`, `rating`, `cover_id`) VALUES (?)";

        const values = [
            userInfo.id,
            req.body.bookId,
            req.body.rating,
            req.body.coverId,
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("Added to tbr");
        });
    });
};

export const updateRatingEntry = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q =
            "UPDATE ratings SET `rating` = ? WHERE `user_id` = ? AND `book_id` = ?";

        db.query(
            q,
            [req.body.rating, userInfo.id, req.body.bookId],
            (err, data) => {
                if (err) return res.status(403).json(err);

                return res.json("Entry updated");
            }
        );
    });
};
