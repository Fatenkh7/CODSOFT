import mongoose from "mongoose";
const { Schema, model } = mongoose;
// import mongoosePaginate from "mongoose-paginate-v2";

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
            ref: "User",
            required: true,
        },
        idCategory: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
    },
    {
        collection: "Blog",
        timestamps: true
    }
);

/**
 * @description Data model for Blog post
 */
// BlogSchema.plugin(mongoosePaginate);
const Blog = model("Blog", BlogSchema);
// Blog.paginate().then({});
export default Blog;