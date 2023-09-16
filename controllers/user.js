import UserModel from "../models/User.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();


/**
 * @description user sign up
 * @param {Object} req.body
 */
export async function add(req, res) {
    try {
        const {
            firstName,
            lastName,
            userName,
            email,
            phone,
            password,
        } = req.body;

        let hashedPassword = password;

        if (password) {
            // Hash the password if provided
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const newUser = new UserModel({
            firstName,
            lastName,
            userName,
            email,
            phone,
            password: hashedPassword,
        });

        await newUser.save();

        // Generate a JWT token
        const token = jwt.sign({ _id: newUser._id }, process.env.TOKEN_SECRET);

        // Set the token in the Authorization header
        res.setHeader('Authorization', `Bearer ${token}`);

        res.status(201).json({
            success: true,
            message: "User added successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(410).json({
            error: true,
            message: "There is a problem with saving the data",
            data: error,
        });
    }
};

/**
 * @description update user information by id
 * @param {String} req.params.id
 * @param {Object} req.body
 */
export async function put(req, res) {
    try {

        let updatedUser = await UserModel.findByIdAndUpdate(
            req.params.ID,
            { $set: req.body },
            {
                runValidators: true,
            }
        );

        if (!updatedUser) {
            return res.status(404).send({
                error: true,
                message: "User not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "User data updated",
            data: updatedUser,
        });
    } catch (error) {
        res.status(500).send({
            error: true,
            message: "There was a problem updating the data",
            data: error,
        });
    }
};

/**
 * @description delete user by id
 * @param {String} req.params.id
 */
export async function deleteById(req, res) {
    try {
        await UserModel.findByIdAndDelete({ _id: req.params.ID }).then(
            function (response) {
                res
                    .status(200)
                    .send({ success: true, message: "User deleted successfully" });
            },
            function (reject) {
                res.status(412).send({
                    error: true,
                    message: "There was a problem deleting this user",
                    data: reject,
                });
            }
        );
    } catch (error) {
        res.status(412).send({
            error: true,
            message: "There was a problem delete the user",
            data: error,
        });
    }
};

/**
 * @description get all users
 */
export async function getAll(req, res) {
    try {
        await UserModel.find({}).then(
            function (response) {
                res.status(200).send({
                    success: true,
                    message: "Users data retrieved Successfully",
                    data: response,
                });
            },
            function (reject) {
                res.status(412).send({
                    error: true,
                    message: "There was a problem getting the users data",
                    data: reject,
                });
            }
        );
    } catch (error) {
        res.status(412).send({
            error: true,
            message: "There was a problem getting the users data",
            data: error,
        });
    }
};

/**
 * @description get one user by id
 * @param {string} req.params.ID
 */
export async function getById(req, res) {
    try {
        UserModel.find({ _id: req.params.ID }).then(
            function (response) {
                res.status(200).send({
                    success: true,
                    message: "User data retrieved Successfully",
                    data: response,
                });
            },
            function (reject) {
                res.status(412).send({
                    error: true,
                    message: "There was a problem getting the user data",
                    data: reject,
                });
            }
        );
    } catch (error) {
        res.status(412).send({
            error: true,
            message: "There was a problem getting the users data",
        });
    }
};

/**
 * @description user sign in
 * @param {Object} req.body
 */

export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        // Find the user by email
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: true, message: "User not found" });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: true, message: "Invalid password" });
        }

        // Generate a JWT token
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

        // Set the token in the Authorization header
        res.setHeader('Authorization', `Bearer ${token}`);

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userName: user.userName
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: true,
            message: "Login failed",
            data: error,
        });
    }
};

export default {
    add,
    put,
    deleteById,
    getAll,
    getById,
    loginUser
};
