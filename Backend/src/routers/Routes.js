import express from 'express';
import { createNote, unlockNote, checkNote, getSummary } from '../controllers/Controller.js';

const router = express.Router();

router.post('/', createNote);
router.get('/summarize/:noteId', getSummary);
router.get('/:noteId', checkNote);
router.post('/:noteId/unlock', unlockNote);

export default router;