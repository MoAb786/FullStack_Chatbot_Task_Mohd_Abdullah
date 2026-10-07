import { Router } from 'express';
import {
  createEnquiry,
  getEnquiries,
  getEnquiryStats,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
} from '../controllers/enquiry.controller';
import { validate } from '../middleware/validate.middleware';
import { authenticateAdmin } from '../middleware/auth.middleware';
import {
  createEnquirySchema,
  updateEnquirySchema,
  enquiryQuerySchema,
  objectIdParamSchema,
} from '../schemas/enquiry.schema';

const router = Router();

// Public route to submit an enquiry
router.post(
  '/',
  validate(createEnquirySchema, 'body'),
  createEnquiry
);

// Protected Admin routes
router.get(
  '/',
  authenticateAdmin,
  validate(enquiryQuerySchema, 'query'),
  getEnquiries
);

router.get(
  '/stats',
  authenticateAdmin,
  getEnquiryStats
);

router.get(
  '/:id',
  authenticateAdmin,
  validate(objectIdParamSchema, 'params'),
  getEnquiryById
);

router.patch(
  '/:id',
  authenticateAdmin,
  validate(objectIdParamSchema, 'params'),
  validate(updateEnquirySchema, 'body'),
  updateEnquiry
);

router.put(
  '/:id',
  authenticateAdmin,
  validate(objectIdParamSchema, 'params'),
  validate(updateEnquirySchema, 'body'),
  updateEnquiry
);

router.delete(
  '/:id',
  authenticateAdmin,
  validate(objectIdParamSchema, 'params'),
  deleteEnquiry
);

export default router;
