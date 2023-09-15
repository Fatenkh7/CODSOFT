import commentModel from "../models/Comment.js"


/**
 * @description get all comments
 */
export async function getAll(req, res, next) {
    try {
        const data = await commentModel.find();
        console.log(data);
        res.status(200).send({ success: true, data });
    } catch (error) {
        res.status(500).send(error);
    }
}


/**
 * @description get one comment by id
 * @param {string} req.params.ID
 */
export async function getById(req, res) {
    const { ID } = req.params;

    try {
        const data = await commentModel.findById({ _id: ID });

        if (!data) {
            return res.status(404).json({ success: false, message: 'Comment not found' });
        }

        return res.status(200).json({ success: true, data });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

/**
 * @description add comment
 * @param {Object} req.body
 */
export async function add(req, res) {
    const { comment, idUser, idBlog } = req.body;

    try {
        const newComment = new commentModel({ comment, idUser, idBlog });
        const savedComment = await newComment.save()

        return res.status(200).json({ success: true, data: savedComment });
    } catch (err) {
        return res.status(403).json({ success: false, message: err.message });
    }
}


/**
 * @description update comment by ID
 * @param {String} req.params.ID
 * @param {Object} req.body
 */
export async function put(req, res) {
    const { ID } = req.params;
    const { comment, idUser, idBlog } = req.body;

    try {
        const updateComment = await commentModel.findByIdAndUpdate(ID, {
            comment,
            idUser,
            idBlog,
        }, {
            new: true,
            runValidators: true,
        });
        if (!updateComment) {
            return res.status(404).send({
                error: true,
                message: "Comment not found",
            });
        }
        return res.status(200).json({ success: true, data: updateComment });
    } catch (err) {
        return res.status(403).json({ success: false, message: err.message });
    }
}


/**
 * @description delete comment by ID
 * @param {String} req.params.ID
 */
export async function deleteById(req, res) {
    const { ID } = req.params;
    try {
        const deletedComment = await commentModel.findByIdAndDelete(ID);
        if (!deletedComment) {
            return res.status(404).send({
                error: true,
                message: "Comment not found",
            });
        }
        return res.status(204).json({ success: true });
    } catch (err) {
        return res.status(403).json({ success: false, message: err.message });
    }
};

export default { getAll, getById, add, put, deleteById }