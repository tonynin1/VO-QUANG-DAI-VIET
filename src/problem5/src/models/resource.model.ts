import db from '../config/database';

export interface Resource {
  id?: number;
  name: string;
  description?: string;
  category?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ResourceFilters {
  category?: string;
  status?: string;
  name?: string;
}

export class ResourceModel {
  // Create a new resource
  static create(resource: Resource): Resource {
    const { name, description, category, status } = resource;
    const stmt = db.prepare(`
      INSERT INTO resources (name, description, category, status)
      VALUES (?, ?, ?, ?)
    `);

    const result = stmt.run(name, description || null, category || null, status || 'active');
    return this.findById(Number(result.lastInsertRowid))!;
  }

  // Get all resources with optional filters
  static findAll(filters?: ResourceFilters): Resource[] {
    let query = 'SELECT * FROM resources WHERE 1=1';
    const params: any[] = [];

    if (filters?.category) {
      query += ' AND category = ?';
      params.push(filters.category);
    }

    if (filters?.status) {
      query += ' AND status = ?';
      params.push(filters.status);
    }

    if (filters?.name) {
      query += ' AND name LIKE ?';
      params.push(`%${filters.name}%`);
    }

    query += ' ORDER BY created_at DESC';

    const stmt = db.prepare(query);
    return stmt.all(...params) as Resource[];
  }

  // Get a single resource by ID
  static findById(id: number): Resource | undefined {
    const stmt = db.prepare('SELECT * FROM resources WHERE id = ?');
    return stmt.get(id) as Resource | undefined;
  }

  // Update a resource
  static update(id: number, resource: Partial<Resource>): Resource | null {
    const { name, description, category, status } = resource;

    const stmt = db.prepare(`
      UPDATE resources
      SET name = COALESCE(?, name),
          description = COALESCE(?, description),
          category = COALESCE(?, category),
          status = COALESCE(?, status),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    stmt.run(name || null, description || null, category || null, status || null, id);
    return this.findById(id) || null;
  }

  // Delete a resource
  static delete(id: number): boolean {
    const stmt = db.prepare('DELETE FROM resources WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }
}
