import express from 'express';
import {
    createContactUs,
    getContactUs,
    getContactUsById,
    updateContactUsById,
    deleteContactUsById,
} from '../controllers/contactUs.js';

const router = express.Router();
import auth from "../middleware/auth.js"


router.post('/', createContactUs);
router.get('/', auth, getContactUs);
router.get('/:id', auth, getContactUsById);
router.put('/:id', auth, updateContactUsById);
router.delete('/:id', auth, deleteContactUsById);

export default router;
