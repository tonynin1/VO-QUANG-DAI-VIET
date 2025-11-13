import { Request, Response } from 'express';
import { ResourceModel, Resource, ResourceFilters } from '../models/resource.model';

export class ResourceController {
  private resourceModel: typeof ResourceModel;

  constructor(resourceModel: typeof ResourceModel) {
    this.resourceModel = resourceModel;
  }

  // Create a new resource
  createResource = (req: Request, res: Response): void => {
    try {
      const { name, description, category, status } = req.body;

      if (!name) {
        res.status(400).json({ error: 'Name is required' });
        return;
      }

      const resource: Resource = {
        name,
        description,
        category,
        status,
      };

      const newResource = this.resourceModel.create(resource);
      res.status(201).json({
        message: 'Resource created successfully',
        data: newResource,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Failed to create resource',
        details: (error as Error).message
      });
    }
  }

  // Get all resources with optional filters
  getAllResources = (req: Request, res: Response): void => {
    try {
      const filters: ResourceFilters = {
        category: req.query.category as string,
        status: req.query.status as string,
        name: req.query.name as string,
      };

      const resources = this.resourceModel.findAll(filters);
      res.status(200).json({
        message: 'Resources retrieved successfully',
        count: resources.length,
        data: resources,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Failed to retrieve resources',
        details: (error as Error).message
      });
    }
  }

  // Get a single resource by ID
  getResourceById = (req: Request, res: Response): void => {
    try {
      const id = parseInt(req.params.id || '');

      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid resource ID' });
        return;
      }

      const resource = this.resourceModel.findById(id);

      if (!resource) {
        res.status(404).json({ error: 'Resource not found' });
        return;
      }

      res.status(200).json({
        message: 'Resource retrieved successfully',
        data: resource,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Failed to retrieve resource',
        details: (error as Error).message
      });
    }
  }

  // Update a resource
  updateResource = (req: Request, res: Response): void => {
    try {
      const id = parseInt(req.params.id || '');

      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid resource ID' });
        return;
      }

      const { name, description, category, status } = req.body;

      const updatedResource = this.resourceModel.update(id, {
        name,
        description,
        category,
        status,
      });

      if (!updatedResource) {
        res.status(404).json({ error: 'Resource not found' });
        return;
      }

      res.status(200).json({
        message: 'Resource updated successfully',
        data: updatedResource,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Failed to update resource',
        details: (error as Error).message
      });
    }
  }

  // Delete a resource
  deleteResource = (req: Request, res: Response): void => {
    try {
      const id = parseInt(req.params.id || '');

      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid resource ID' });
        return;
      }

      const deleted = this.resourceModel.delete(id);

      if (!deleted) {
        res.status(404).json({ error: 'Resource not found' });
        return;
      }

      res.status(200).json({
        message: 'Resource deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        error: 'Failed to delete resource',
        details: (error as Error).message
      });
    }
  }
}
