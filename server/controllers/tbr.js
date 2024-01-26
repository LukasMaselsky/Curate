import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getTBR = (req, res) => {
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        //const q = "SELECT * FROM tbr WHERE `user_id` = ?";
        const q = "SELECT * FROM tbr WHERE user_id = ($1)";

        db.query(q, [userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json(data.rows);
        });
    });
};

export const getTBREntry = (req, res) => {
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        //const q = "SELECT 1 FROM `tbr` WHERE `user_id` = ? AND `book_id` = ? LIMIT 1";
        const q =
            "SELECT 1 FROM tbr WHERE user_id = ($1) AND book_id = ($2) LIMIT 1";

        const values = [userInfo.id, req.body.bookId];

        db.query(q, [...values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json(data.rows);
        });
    });
};

export const createTBREntry = (req, res) => {
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        //const q = "INSERT INTO tbr(`user_id`, `book_id`, `cover_id`) VALUES (?)";
        const q =
            "INSERT INTO tbr(user_id, book_id, cover_id) VALUES ($1, $2, $3)";

        const values = [userInfo.id, req.body.bookId, req.body.coverId];

        db.query(q, [...values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("Added to tbr");
        });
    });
};

export const deleteTBREntry = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const bookId = req.params.bookId;
        //const q = "DELETE FROM tbr WHERE `book_id` = ? AND `user_id` = ?";
        const q = "DELETE FROM tbr WHERE book_id = ($1) AND user_id = ($2)";

        db.query(q, [bookId, userInfo.id], (err, data) => {
            if (err)
                return res
                    .status(403)
                    .json("You can delete from your own tbr!");

            return res.json("Entry deleted from tbr!");
        });
    });
};
