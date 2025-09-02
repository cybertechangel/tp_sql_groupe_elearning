import express from 'express';
import {
  listUsers,
  getUser,
  addUser,
  removeUser,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', listUsers);
router.get('/:id', getUser);
router.post('/', addUser);
router.delete('/:id', removeUser);

export default router;
