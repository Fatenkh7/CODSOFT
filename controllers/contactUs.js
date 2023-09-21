import ContactUs from "../models/ContactUs.js";


/**
 * @description add email
 * @param {Object} req.body
 */
export const createContactUs = async (req, res) => {
    try {
        const { firstName, lastName, email, message } = req.body;
        const newContactUs = new ContactUs({ firstName, lastName, email, message });
        const savedContactUs = await newContactUs.save();
        res.status(201).json(savedContactUs);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * @description get all emails
 */
export const getContactUs = async (req, res) => {
    try {
        const contactUsEntries = await ContactUs.find();
        res.status(200).json(contactUsEntries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


/**
 * @description get one email by id
 * @param {string} req.params.ID
 */
export const getContactUsById = async (req, res) => {
    try {
        const { id } = req.params;
        const contactUsEntry = await ContactUs.findById(id);
        if (!contactUsEntry) {
            return res.status(404).json({ message: 'ContactUs entry not found' });
        }
        res.status(200).json(contactUsEntry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


/**
 * @description update email by ID
 * @param {String} req.params.ID
 * @param {Object} req.body
 */
export const updateContactUsById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedContactUs = await ContactUs.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedContactUs) {
            return res.status(404).json({ message: 'ContactUs entry not found' });
        }
        res.status(200).json(updatedContactUs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @description delete email by ID
 * @param {String} req.params.ID
 */
export const deleteContactUsById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedContactUs = await ContactUs.findByIdAndRemove(id);
        if (!deletedContactUs) {
            return res.status(404).json({ message: 'ContactUs entry not found' });
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export default {
    deleteContactUsById, updateContactUsById, getContactUsById, getContactUs, createContactUs
};