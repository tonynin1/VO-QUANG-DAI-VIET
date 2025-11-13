# CRUD API with Express, TypeScript, and SQLite

A production-ready RESTful API built with Express.js, TypeScript, and SQLite for managing resources with full CRUD operations.

## Features

- **Full CRUD Operations**: Create, Read, Update, and Delete resources
- **TypeScript**: Full type safety and modern JavaScript features
- **SQLite Database**: Lightweight, file-based database with data persistence
- **Filtering**: Query resources with filters (category, status, name)
- **Docker Support**: Multi-stage Docker build for production deployment
- **Health Check**: Built-in health check endpoint for monitoring
- **Error Handling**: Comprehensive error handling and validation
- **Production-Ready**: Dependency injection pattern for better testability

## Prerequisites

- Node.js >= 18.x
- npm >= 9.x
- Docker (optional, for containerized deployment)

## Project Structure

```
problem5/
├── src/
│   ├── config/
│   │   └── database.ts          # Database configuration and initialization
│   ├── models/
│   │   └── resource.model.ts    # Resource model and database operations
│   ├── controllers/
│   │   └── resource.controller.ts # Business logic and request handling
│   ├── routes/
│   │   └── resource.routes.ts   # API route definitions
│   ├── app.ts                   # Express app configuration
│   └── server.ts                # Server entry point
├── dist/                         # Compiled JavaScript (after build)
├── data/                         # Database storage directory
├── Dockerfile                    # Multi-stage Docker build
├── docker-compose.yml            # Docker Compose configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies and scripts
└── .env                          # Environment variables
```

## Installation

### Local Development Setup

1. **Clone the repository and navigate to the project directory:**
   ```bash
   cd src/problem5
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the root directory (already created):
   ```env
   PORT=3000
   NODE_ENV=development
   ```

4. **Run in development mode:**
   ```bash
   npm run dev
   ```

   Or with auto-reload on file changes:
   ```bash
   npm run watch
   ```

5. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## Docker Deployment

### Using Docker Compose (Recommended)

1. **Build and start the container:**
   ```bash
   docker-compose up -d
   ```

2. **View logs:**
   ```bash
   docker-compose logs -f
   ```

3. **Stop the container:**
   ```bash
   docker-compose down
   ```

### Using Docker directly

1. **Build the image:**
   ```bash
   docker build -t crud-api .
   ```

2. **Run the container:**
   ```bash
   docker run -d -p 3000:3000 -v $(pwd)/data:/app/data --name crud-api crud-api
   ```

3. **Stop and remove:**
   ```bash
   docker stop crud-api
   docker rm crud-api
   ```

## API Endpoints

### Base URL
```
http://localhost:3000
```

### Health Check
```http
GET /health
```
Returns server health status.

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Resources API

#### 1. Create a Resource
```http
POST /api/resources
Content-Type: application/json

{
  "name": "Resource Name",
  "description": "Resource description",
  "category": "category-name",
  "status": "active"
}
```

**Response (201 Created):**
```json
{
  "message": "Resource created successfully",
  "data": {
    "id": 1,
    "name": "Resource Name",
    "description": "Resource description",
    "category": "category-name",
    "status": "active",
    "created_at": "2024-01-15 10:30:00",
    "updated_at": "2024-01-15 10:30:00"
  }
}
```

#### 2. Get All Resources
```http
GET /api/resources
```

**Optional Query Parameters:**
- `category` - Filter by category
- `status` - Filter by status
- `name` - Search by name (partial match)

**Examples:**
```http
GET /api/resources?category=electronics
GET /api/resources?status=active
GET /api/resources?name=laptop
GET /api/resources?category=electronics&status=active
```

**Response (200 OK):**
```json
{
  "message": "Resources retrieved successfully",
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "Resource 1",
      "description": "Description 1",
      "category": "electronics",
      "status": "active",
      "created_at": "2024-01-15 10:30:00",
      "updated_at": "2024-01-15 10:30:00"
    },
    {
      "id": 2,
      "name": "Resource 2",
      "description": "Description 2",
      "category": "electronics",
      "status": "active",
      "created_at": "2024-01-15 10:31:00",
      "updated_at": "2024-01-15 10:31:00"
    }
  ]
}
```

#### 3. Get Resource by ID
```http
GET /api/resources/:id
```

**Response (200 OK):**
```json
{
  "message": "Resource retrieved successfully",
  "data": {
    "id": 1,
    "name": "Resource Name",
    "description": "Resource description",
    "category": "category-name",
    "status": "active",
    "created_at": "2024-01-15 10:30:00",
    "updated_at": "2024-01-15 10:30:00"
  }
}
```

#### 4. Update a Resource
```http
PUT /api/resources/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "description": "Updated description",
  "category": "new-category",
  "status": "inactive"
}
```

**Note:** All fields are optional. Only provided fields will be updated.

**Response (200 OK):**
```json
{
  "message": "Resource updated successfully",
  "data": {
    "id": 1,
    "name": "Updated Name",
    "description": "Updated description",
    "category": "new-category",
    "status": "inactive",
    "created_at": "2024-01-15 10:30:00",
    "updated_at": "2024-01-15 11:00:00"
  }
}
```

#### 5. Delete a Resource
```http
DELETE /api/resources/:id
```

**Response (200 OK):**
```json
{
  "message": "Resource deleted successfully"
}
```

### Error Responses

#### 400 Bad Request
```json
{
  "error": "Name is required"
}
```

#### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

#### 500 Internal Server Error
```json
{
  "error": "Failed to create resource",
  "details": "Error message details"
}
```

## Database

The application uses SQLite as the database. The database file is created automatically in the `data/` directory.

### Schema

**resources** table:
- `id` (INTEGER PRIMARY KEY AUTOINCREMENT)
- `name` (TEXT NOT NULL)
- `description` (TEXT)
- `category` (TEXT)
- `status` (TEXT DEFAULT 'active')
- `created_at` (DATETIME DEFAULT CURRENT_TIMESTAMP)
- `updated_at` (DATETIME DEFAULT CURRENT_TIMESTAMP)

## Testing the API

### Using cURL

**Create a resource:**
```bash
curl -X POST http://localhost:3000/api/resources \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","description":"Dell XPS 15","category":"electronics","status":"active"}'
```

**Get all resources:**
```bash
curl http://localhost:3000/api/resources
```

**Get resource by ID:**
```bash
curl http://localhost:3000/api/resources/1
```

**Update a resource:**
```bash
curl -X PUT http://localhost:3000/api/resources/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Laptop","status":"inactive"}'
```

**Delete a resource:**
```bash
curl -X DELETE http://localhost:3000/api/resources/1
```

### Using Postman or Thunder Client

Import the following collection or create requests manually using the endpoints above.

## Production Best Practices

This project implements several production-grade patterns:

1. **Dependency Injection**: Controllers use constructor injection for better testability
2. **Multi-stage Docker Build**: Optimized image size and security
3. **Health Checks**: Built-in health check endpoint for load balancers
4. **Error Handling**: Comprehensive error handling with proper HTTP status codes
5. **Type Safety**: Full TypeScript implementation with strict mode
6. **Data Persistence**: Volume mounting for database persistence in Docker
7. **Environment Variables**: Configuration through environment variables
8. **Logging**: Request logging and error logging

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Server port |
| `NODE_ENV` | `development` | Environment (development/production) |
| `DB_PATH` | `./data` | Database directory path |

## Available Scripts

- `npm run dev` - Run in development mode with ts-node
- `npm run watch` - Run with auto-reload on file changes
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run compiled JavaScript in production mode

## Troubleshooting

### Database locked error
If you encounter a "database is locked" error, ensure only one instance of the application is running.

### Port already in use
Change the `PORT` in `.env` file to use a different port.

### Docker permission issues
On Linux, you might need to run Docker commands with `sudo` or add your user to the docker group.

## License

ISC

## Author

Problem 5 - CRUD API Backend Challenge
