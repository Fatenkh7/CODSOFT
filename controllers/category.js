import categoryModel from "../models/Category.js";


/**
 * @description add category
 * @param {Object} req.body
 */

export async function add(req, res) {
    const { name, description } = req.body;

    // Create a new category object
    const newCategory = new categoryModel({
        name: name,
        description: description
    });
    if (!newCategory.validateSync()) {
        try {
            const savedCategory = await newCategory.save();
            return res.status(200).json({ data: savedCategory });
        } catch (err) {
            if (err.code === 11000 && err.keyPattern && err.keyPattern.name === 1) {
                return res.status(400).json({ message: 'Category name must be unique' });
            } else {
                return res.status(500).json({ message: err.message });
            }
        }
    } else {
        return res.status(400).json({ message: 'Validation error', errors: newCategory.errors });
    }
}


/**
 * @description get all categories
 */
export async function getAll(req, res, next) {
    try {
        await categoryModel.find({}).then(
            function (response) {
                res.status(200).send({
                    success: true,
                    message: "Categories data retrieved Successfully",
                    data: response,
                });
            },
            function (reject) {
                res.status(412).send({
                    error: true,
                    message: "There was a problem getting the categories data",
                    data: reject,
                });
            }
        );
    } catch (error) {
        res.status(412).send({
            error: true,
            message: "There was a problem getting the categories data",
            data: error,
        });
    }
}

/**
 * @description get one category by id
 * @param {string} req.params.ID
 */
export async function getById(req, res) {
    const { ID } = req.params;

    try {
        const response = await categoryModel.findById({ _id: ID });

        if (!response) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        return res.status(200).json({ success: true, response });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

/**
 * @description get one category by the name
 * @param {string} req.params.CATEGORY
 */
export async function getByCatName(req, res) {
    const { CATEGORY } = req.params;

    try {
        const response = await categoryModel.findOne({ name: CATEGORY });

        if (!response) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        return res.status(200).json({ success: true, response });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}


/**
 * @description update category by name
 * @param {String} req.params.CATEGORY
 * @param {Object} req.body
 */
export async function editCategory(req, res) {
    const { CATEGORY } = req.params;

    try {
        const updatedCategory = await categoryModel.findOneAndUpdate(
            { name: CATEGORY },
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({
                error: true,
                message: "Category not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category data updated",
            data: updatedCategory,
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "There was a problem updating the data",
            data: error.message,
        });
    }
}


/**
 * @description delete category by ID
 * @param {String} req.params.ID
 */
export async function deleteById(req, res) {
    const { ID } = req.params;
    try {
        const deleteCategory = await categoryModel.findByIdAndDelete(ID);
        if (!deleteCategory) {
            return res.status(404).send({
                error: true,
                message: "Category not found",
            });
        }
        return res.status(204).json({ success: true });
    } catch (err) {
        return res.status(403).json({ success: false, message: err.message });
    }
};

export default { getAll, add, editCategory, getByCatName, deleteById };
