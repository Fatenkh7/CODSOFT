import likeModel from "../models/Like.js"


export async function getAll(req, res, next) {
    try {
        const data = await likeModel.find();
        console.log(data);
        res.status(200).send({ success: true, data });
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getById(req, res) {
    const { ID } = req.params;

    try {
        const data = await likeModel.findById({ _id: ID });

        if (!data) {
            return res.status(404).json({ success: false, message: 'Like not found' });
        }

        return res.status(200).json({ success: true, data });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export async function add(req, res) {
    const { like, idUser, idBlog } = req.body;

    try {
        const newLike = new likeModel({ like, idUser, idBlog });
        const savedLike = await newLike.save()

        return res.status(200).json({ success: true, data: savedLike });
    } catch (err) {
        return res.status(403).json({ success: false, message: err.message });
    }
}

export async function put(req, res) {
    const { ID } = req.params;
    const { like, idUser, idBlog } = req.body;

    try {
        const updateLike = await likeModel.findByIdAndUpdate(ID, {
            like,
            idUser,
            idBlog,
        }, {
            new: true,
            runValidators: true,
        });
        if (!updateLike) {
            return res.status(404).send({
                error: true,
                message: "Like not found",
            });
        }
        return res.status(200).json({ success: true, data: updateLike });
    } catch (err) {
        return res.status(403).json({ success: false, message: err.message });
    }
}

export async function deleteById(req, res) {
    const { ID } = req.params;
    try {
        const removeLike = await likeModel.findByIdAndDelete(ID);
        if (!removeLike) {
            return res.status(404).send({
                error: true,
                message: "like not found",
            });
        }
        return res.status(204).json({ success: true });
    } catch (err) {
        return res.status(403).json({ success: false, message: err.message });
    }
};

export default { getAll, getById, add, put, deleteById }