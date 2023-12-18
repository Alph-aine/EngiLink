import express from 'express';
import * as general from '../controllers/index.js';

const router = express.Router();

const {
  logout
} = general;

router.route('/logout').get(logout);

export default router;
