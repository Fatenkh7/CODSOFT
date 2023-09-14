import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import connectDB from "./config/db.js";
import userRoute from "./routes/user.js"

dotenv.config()
const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.get("/", (req, res) => {
    res.send("API is running...");
});
app.use("/user", userRoute);
// error handler
app.use(function (err, req, res, next) {
    console.log(err)
    res.status(err.status || 500).send({
        success: false,
        message: err.message,
    });
});
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(
                `Server is running in ${process.env.NODE_ENV} on port ${PORT}!!!`
            );
        });
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });