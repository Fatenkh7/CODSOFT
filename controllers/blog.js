import blogModel from "../models/Blog.js"
import * as fs from 'fs';



/**
 * @description get all Blogs
 */
export async function getAll(req, res, next) {
    try {
        const data = await blogModel.find();
        console.log(data);
        res.status(200).send({ success: true, data });
    } catch (error) {
        res.status(500).send(error);
    }
}


/**
 * @description get one blog by id
 * @param {string} req.params.ID
 */
export async function getById(req, res) {
    const { ID } = req.params;

    try {
        const data = await blogModel.findById({ _id: ID });

        if (!data) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        return res.status(200).json({ success: true, data });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}


/**
 * @description add blog
 * @param {Object} req.body
 */
export async function add(req, res) {
    try {
        const newBlog = new blogModel({
            image: req.imagePath,
            description: req.body.description,
            idUser: req.body.idUser,
            title: req.body.title,
            idCategory: req.body.idCategory,
        });

        const savedBlog = await newBlog.save();

        res.status(200).json({
            status: 200,
            message: "Blog saved successfully",
            response: savedBlog,
        });
    } catch (err) {
        return res.status(403).json({
            status: 403,
            message: err.message,
        });
    }
}



/**
 * @description update blog by ID
 * @param {String} req.params.ID
 * @param {Object} req.body
 */
export async function put(req, res) {
    try {
        const imageId = req.params.ID;
        const { title, description, idUser, idCategory } = req.body;
        const imagePath = req.imagePath;

        // Find the blog post in the database based on the ID
        const updatedBlog = await blogModel.findById(imageId);

        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Get the previous image file path
        const previousImageFilePath = updatedBlog.image;

        // Check if the previous image file exists
        if (fs.existsSync(previousImageFilePath)) {
            // Delete the previous image
            fs.unlinkSync(previousImageFilePath);
        } else {
            console.log("Previous image file does not exist:", previousImageFilePath);
        }

        // Update the blog post fields
        updatedBlog.title = title;
        updatedBlog.description = description;
        updatedBlog.idCategory = idCategory;
        updatedBlog.image = imagePath;

        // Save the updated blog post to the database
        await updatedBlog.save();

        res.status(200).json({
            message: "Blog updated successfully",
            updatedBlog,
        });
    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).json({ error: error.message });
    }
}


/**
 * @description delete blog by ID
 * @param {String} req.params.ID
 */
export async function deleteBlog(req, res, next) {
    let { ID } = req.params;
    blogModel
        .findOneAndDelete({ _id: ID })
        .then((response) => {
            if (!response) {
                res.status(404).send({ status: 404, message: "Not Found" });
            } else {
                fs.unlinkSync(response.image);
                res.status(204).send({ status: 204, message: "Deleted successfully" });
            }
        })
        .catch((error) => {
            res.status(500).send({ status: 500, message: error.message });
        });
}


export default {
    add, put, deleteBlog, getAll, getById
};