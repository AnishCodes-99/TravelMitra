import { Router } from 'express';
import { searchPackages } from '../controllers/packageController.js';

const router = Router();

router.get('/search', searchPackages);

export default router;
