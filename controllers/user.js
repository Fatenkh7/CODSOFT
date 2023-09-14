import UserModel from "../models/User.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
/**
 * @description user sign up
 * @param {Object} req.body
 */
const createUser = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            userName,
            email,
            phone,
            password,
        } = req.body;
        let newUser;
        if (req.body.password) {
            let hashed = await bcrypt.hashSync(req.body.password, 10);
            newUser = new UserModel({
                firstName,
                lastName,
                userName,
                email,
                phone,
                password: hashed,
            });
        } else {
            newUser = new UserModel({
                firstName,
                lastName,
                userName,
                email,
                phone,
                password,
            });
        }
        await newUser.save();
        res.status(201).send({ success: true, message: "User added successfully" });
    } catch (error) {
        console.log(error);
        res.status(410).send({
            error: true,
            message: "There is a problem with Saving the data",
            data: error,
        });
    }
};

/**
 * @description update user information by id
 * @param {String} req.params.id
 * @param {Object} req.body
 */
const updateUserById = async (req, res) => {
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
const deleteUserById = async (req, res) => {
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
const getAllUser = async (req, res) => {
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
const getUserByParam = async (req, res) => {
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

export default {
    createUser,
    updateUserById,
    deleteUserById,
    getAllUser,
    getUserByParam,
};