import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CommentSchema = new Schema(
    {
        comment: {
            type: String,
            required: [true, "The Comment field of the comments table cann't be empty"],
            trim: true,
            maxLength: [255, "The comment is too long!"],

        },
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
        collection: "Comment",
        timestamps: true
    }
);

/**
 * @description Data model for Comments post
 */
const Comment = model("Comment", CommentSchema);
export default Comment;