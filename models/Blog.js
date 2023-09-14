import mongoose from "mongoose";
const { Schema, model } = mongoose;

const BlogSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "The Title cann't be empty"],
            trim: true,
        },
        description: {
            type: String,
            maxLength: [300, "the description is too long!"],
            trim: true,
        },
        image: {
            type: String,
            required: [true, "Please enter the image"],
        },
        idUser: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        idCategory: {
            type: Schema.Types.ObjectId,
            ref: "Category"
        },
        // LikesCount: {
        //     type: Number,
        // },
        // commentsCount: {
        //     type: Number
        // }
    },
    {
        collection: "Blog",
        timestamps: true
    }
);

/**
 * @description Data model for Blog post
 */
const Blog = model("Blog", BlogSchema);
export default Blog;