import mongoose from "mongoose";
const { Schema, model } = mongoose;

const LikeSchema = new Schema(
    {
        idUser: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        idBlog: {
            type: Schema.Types.ObjectId,
            ref: "Blog"
        },
    },
    {
        collection: "Like",
        timestamps: true
    }
);

/**
 * @description Data model for likes post
 */
const Like = model("Like", LikeSchema);
export default Like;