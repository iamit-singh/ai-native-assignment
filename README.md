# E-commerce Inventory Management Service

A production-grade backend system for managing product categories, products, and SKUs for e-commerce businesses. Built with **NestJS** and **PostgreSQL**, it provides robust RESTful APIs for CRUD operations, search, filtering, inventory tracking, and more. Designed for internal admin use, with a focus on reliability, extensibility, and maintainability.

---

## Features

- **Category, Product, SKU CRUD**: Full create, read, update (PATCH), and delete support
- **Search, Filter, Pagination**: Efficient product search (partial, case-insensitive), filter by category, strict pagination (default 10, max 100)
- **Data Integrity**: Unique constraints, foreign keys, cascade deletes, orphan prevention
- **Validation**: DTO validation, SKU code format, price/stock rules
- **Error Handling**: Consistent error format, correct HTTP status codes, global exception filter
- **API Versioning**: All endpoints under `/api/v1/`
- **OpenAPI/Swagger Docs**: Auto-generated, accessible at `/docs` and `/openapi.json`
- **File-based Error Logging**: Winston logger with daily rotation
- **RBAC Middleware Stub**: Ready for future role-based access control
- **Environment Config**: Uses `.env` for DB and config
- **Unit & E2E Testing**: High coverage with Jest
- **Seed Script**: Populate DB with sample data for local testing

---

## Technology Stack

- **Backend**: [NestJS](https://nestjs.com/) (TypeScript)
- **Database**: PostgreSQL (13+)
- **ORM**: TypeORM
- **Testing**: Jest
- **Logging**: Winston

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm
- PostgreSQL (v13+)

### Setup
1. **Clone the repository**
2. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```
3. **Configure environment**
   - Copy `.env.example` to `.env` and set DB connection and other variables
4. **Set up the database**
   - Ensure PostgreSQL is running and the target database exists
5. **Run migrations (if any)**
   - (Handled by TypeORM on app start if configured)
6. **Start the server**
   ```bash
   npm run start:dev
   # or for production
   npm run start:prod
   ```
7. **Seed sample data**
   ```bash
   npm run seed
   ```

### Testing
- **Unit tests**: `npm run test`
- **E2E tests**: `npm run test:e2e`
- **Coverage**: `npm run test:cov`

---

## API Documentation
- **Swagger UI**: [http://localhost:3000/docs](http://localhost:3000/docs)
- **OpenAPI JSON**: [http://localhost:3000/openapi.json](http://localhost:3000/openapi.json)
- **Base Path**: `/api/v1/`

### Main Endpoints
- `/api/v1/categories` — CRUD for categories
- `/api/v1/products` — CRUD, search, filter, paginate products
- `/api/v1/skus` — CRUD for SKUs

See Swagger UI for full details and request/response schemas.

---

## Architecture & Data Model

- **Category**: Unique, case-insensitive name. No subcategories. Cannot delete if products exist.
- **Product**: Belongs to a category. Unique name within category. Cascade delete SKUs on product delete.
- **SKU**: Belongs to a product. Globally unique, alphanumeric code (max 32 chars). Tracks price (float) and stock (integer ≥ 0).
- **Timestamps**: All entities have `created_at` and `updated_at`.
- **Validation**: Enforced at DB and application level.
- **Error Logging**: All errors logged to file with daily rotation.
- **RBAC**: Middleware stub present for future role-based access control.

---

## Code Quality & Testing
- **Production-grade code**: Linting, best practices, modular structure
- **Validation & Error Handling**: Consistent, robust, and user-friendly
- **Testing**: High unit and e2e coverage (Jest)
- **Logging**: File-based error logs (Winston)

---

## References & Further Reading
- [business.prd.md](./business.prd.md) — Business requirements
- [technical.prd.md](./technical.prd.md) — Technical requirements
- [tasks/](./tasks/) — Task breakdowns and implementation notes

---

## License
This project is for internal use and demonstration purposes only. 