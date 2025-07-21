# Technical Product Requirements Document (Technical PRD)

## Technology Stack & Architecture

- **Backend Framework:** NestJS (latest stable)
- **Database:** PostgreSQL (version 13 or higher)
- **ORM:** TypeORM
- **Service Type:** Single, standalone backend service (not part of a monorepo or microservices architecture)
- **Deployment Environment:** Local development only (no production/cloud deployment required)

## Technical Requirements

| Requirement ID | Component         | Description                                                                 | Technical Implementation                                                                                                    | Acceptance Criteria                                                                                 |
|---------------|------------------|-----------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| TR-1          | API Versioning    | All endpoints must be versioned                                             | Prefix all routes with `/api/v1/` using NestJS global prefix configuration                                                  | All endpoints accessible only via `/api/v1/` prefix                                                |
| TR-2          | Category Model    | Categories are a flat list with unique, case-insensitive names              | TypeORM entity with unique index on lower(name); no parent/child fields                                                    | Cannot create duplicate (case-insensitive) category names; no subcategories                        |
| TR-3          | Product Model     | Products belong to one category; unique name within category (case-insensitive) | TypeORM entity with foreign key to category; unique index on lower(name) + category_id                                     | Cannot create duplicate product names within a category (case-insensitive); must have category_id   |
| TR-4          | SKU Model         | SKUs belong to a product; globally unique, case-insensitive alphanumeric code | TypeORM entity with foreign key to product; unique index on lower(sku_code); regex validation on sku_code                  | Cannot create duplicate SKU codes (case-insensitive); only valid codes accepted                   |
| TR-5          | Timestamps        | All entities must track creation and update times                            | Use TypeORM decorators for `created_at` and `updated_at` fields                                                            | All entities return correct timestamps in API responses                                            |
| TR-6          | Hard Deletes      | Entities are hard deleted (not soft deleted)                                 | Use TypeORM's default delete behavior; no soft-delete columns                                                              | Deleted records are removed from DB                                                                |
| TR-7          | Cascade Deletes   | Deleting a product deletes all its SKUs                                      | TypeORM cascade delete on product->SKU relation                                                                            | Deleting a product removes all its SKUs                                                            |
| TR-8          | Prevent Orphans   | Cannot delete a category if it contains products                             | Add DB constraint or service-level check before delete                                                                     | Attempting to delete such a category returns an error                                              |
| TR-9          | Product Search    | Products can be searched, filtered, and paginated                            | Implement search (partial, case-insensitive by name), filter by category, strict pagination (default 10, max 100)          | API returns correct results; pageSize limits enforced                                              |
| TR-10         | PATCH Support     | Support partial updates for all resources                                    | Implement PATCH endpoints using NestJS and DTOs                                                                            | PATCH updates only specified fields; PUT not required                                              |
| TR-11         | Error Handling    | Consistent error format and status codes                                     | Global NestJS exception filter; error response `{ "error": "ErrorType", "message": "..." }`                           | All errors follow format and use correct HTTP status codes                                         |
| TR-12         | OpenAPI/Swagger   | Auto-generated API documentation                                             | Use NestJS Swagger module; expose at `/docs` and `/openapi.json`                                                           | API docs accessible and up-to-date                                                                 |
| TR-13         | CORS              | Allow all origins                                                            | Enable CORS with `*` in NestJS config                                                                                      | No CORS errors from any origin                                                                     |
| TR-14         | RBAC Middleware   | Stubs for future role-based access control                                   | Add placeholder NestJS middleware for RBAC                                                                                 | Middleware present but not enforced                                                                |
| TR-15         | .env Config       | Use environment variables for config                                         | Use dotenv; read DB connection, CORS origins, pagination defaults (optional)                                                | App runs with config from .env                                                                     |
| TR-16         | Unit Testing      | High coverage unit tests with Jest                                           | Write Jest tests for all modules/services                                                                                  | High coverage reported; tests pass                                                                 |
| TR-17         | Seed Script       | Provide sample data for local testing                                        | Implement a script to seed DB with sample categories, products, SKUs                                                        | Script runs and populates DB for local dev                                                         |
| TR-18         | File Logging      | Log errors to a file                                                         | Use a logger (e.g., Winston) to write errors to a log file                                                                 | Errors are written to a file; log file present after errors occur                                 |

## Data Model & Relationships

- **Category**
  - Flat list (no subcategories or nesting)
  - Unique, case-insensitive name
  - Hard deletes only
  - Timestamps: `created_at`, `updated_at`

- **Product**
  - Belongs to one category (foreign key: `category_id`)
  - Unique, case-insensitive name within a category
  - Hard deletes only
  - Timestamps: `created_at`, `updated_at`

- **SKU**
  - Belongs to one product (foreign key: `product_id`)
  - Attributes: `sku_code`, `price`, `stock_quantity`
  - `sku_code`: Alphanumeric only, max 32 chars, regex: `^[a-zA-Z0-9]{1,32}$`, globally unique (case-insensitive)
  - `price`: Float (e.g., 19.99)
  - `stock_quantity`: Integer, >= 0
  - Hard deletes only
  - Timestamps: `created_at`, `updated_at`

## API Design & Validation

- **Base Path:** All routes prefixed with `/api/v1/`
- **RESTful Endpoints:** CRUD for categories, products, SKUs
- **Search/Filter:**
  - Only for products
  - Search: Partial, case-insensitive by name
  - Filter: By category
  - Pagination: Strictly enforce default (10) and max (100) pageSize
- **Partial Updates:** Support PATCH for all updatable resources; PUT not required
- **Error Handling:**
  - Standard HTTP status codes
  - Error response format: `{ "error": "ErrorType", "message": "Descriptive message" }`
- **OpenAPI/Swagger:** Auto-generate API docs using NestJS Swagger module
- **CORS:** Allow all origins (`*`)

## Security & Access

- **Authentication:** None required for now
- **RBAC:** Add middleware stubs to enable future role-based access control (RBAC)

## Data Integrity & Constraints

- **Category Name:** Unique, case-insensitive
- **Product Name:** Unique within category, case-insensitive
- **SKU Code:** Unique globally, case-insensitive, regex: `^[a-zA-Z0-9]{1,32}$`
- **Price:** Float
- **Stock Quantity:** Integer >= 0
- **Cascade Deletes:**
  - Deleting a product deletes all its SKUs
  - Prevent deletion of category if products exist

## Extensibility & Maintainability

- **.env Configuration:**
  - Database connection string
  - CORS origins
  - Pagination defaults (optional)
- **Code Practices:**
  - Follow NestJS and TypeORM best practices
  - Modular, maintainable code structure

## Documentation & Testing

- **API Documentation:**
  - Swagger/OpenAPI at `/docs` and `/openapi.json`
- **Testing:**
  - Unit tests required (Jest)
  - High coverage expected
- **Sample Data:**
  - Provide a simple seed script for local testing

## Miscellaneous

- **Localization:** Not required
- **Timestamps:** All entities must have `created_at` and `updated_at`
- **Error Logging:** Use file-based logging (write errors to a log file) 