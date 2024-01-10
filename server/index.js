import express from "express";
//https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
import cors from "cors";
import authRoutes from "./routes/auth.js";
import tbrRoutes from "./routes/tbr.js";
import ratingsRoutes from "./routes/ratings.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json()); // allows to send json file using client
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(express.static("public"));

app.use("/server/tbr", tbrRoutes);
app.use("/server/auth", authRoutes);
app.use("/server/ratings", ratingsRoutes);

app.listen(8801, () => {
    console.log("connected");
});
