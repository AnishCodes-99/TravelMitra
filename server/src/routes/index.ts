import { Router } from 'express';
import healthRoutes from './healthRoutes.js';
import flightRoutes from './flightRoutes.js';
import hotelRoutes from './hotelRoutes.js';
import packageRoutes from './packageRoutes.js';
import authRoutes from './authRoutes.js';

const router = Router();

router.use(healthRoutes);
router.use('/flights', flightRoutes);
router.use('/hotels', hotelRoutes);
router.use('/packages', packageRoutes);
router.use('/auth', authRoutes);

export default router;
