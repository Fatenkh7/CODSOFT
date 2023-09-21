import express from 'express';
const router = express.Router();
import {
    createContactUs,
    getContactUs,
    getContactUsById,
    updateContactUsById,
    deleteContactUsById,
} from '../controllers/contactUs.js';


import auth from "../middleware/auth.js"



router.get('/', auth, getContactUs);
router.post('/add', auth, createContactUs);
router.get('/:id', auth, getContactUsById);
router.put('/:id', auth, updateContactUsById);
router.delete('/:id', auth, deleteContactUsById);

export default router;
