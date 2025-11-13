import { Router } from 'express';
import { ResourceController } from '../controllers/resource.controller';
import { ResourceModel } from '../models/resource.model';

const router = Router();
const resourceController = new ResourceController(ResourceModel);

// Create a new resource
router.post('/', resourceController.createResource);

// Get all resources (with optional filters via query params)
router.get('/', resourceController.getAllResources);

// Get a single resource by ID
router.get('/:id', resourceController.getResourceById);

// Update a resource
router.put('/:id', resourceController.updateResource);

// Delete a resource
router.delete('/:id', resourceController.deleteResource);

export default router;
