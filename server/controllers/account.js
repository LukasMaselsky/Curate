import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getAccountPreview = (req, res) => {
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q =
            "(SELECT * FROM ratings WHERE `user_id` = ? LIMIT 5) UNION (SELECT * FROM tbr WHERE `user_id` = ? LIMIT 5)";

        db.query(q, [userInfo.id, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json(data);
        });
    });
};
