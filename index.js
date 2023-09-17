import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import connectDB from "./config/db.js";
import userRoute from "./routes/user.js"
import categoryRoute from "./routes/category.js"
import blogRoute from "./routes/blog.js"
import commentRoute from "./routes/comment.js"
import likeRoute from "./routes/like.js"

dotenv.config()
const PORT = process.env.PORT || 5000

const app = express();
app.use(express.json());
app.use(cors({
    optionsSuccessStatus: 200,
    origin: '*',
    credentials: true,
    exposedHeaders: ['Authorization'],
}))
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/user", userRoute);
app.use("/category", categoryRoute);
app.use("/blog", blogRoute);
app.use("/comment", commentRoute)
app.use("/like", likeRoute)

app.use("/uploads", express.static("./uploads"));


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