# Project Structure

This document provides an overview of the project structure for the E-commerce Inventory Management Service. It describes the purpose and contents of each major directory and file to help developers and maintainers navigate and understand the codebase efficiently.

---

## Top-Level Structure

```
AI Native assignment/
├── backend/           # Main backend application (NestJS)
├── tasks/             # Task breakdowns and implementation notes
├── business.prd.md    # Business requirements document
├── technical.prd.md   # Technical requirements document
├── README.md          # Project overview and getting started
├── progress.md        # Progress tracking
└── Project-structure.md # (This file)
```

---

## Backend Directory (`backend/`)

The core backend application, built with **NestJS** and **TypeScript**.

```
backend/
├── src/                # Application source code
├── test/               # End-to-end (e2e) tests
├── package.json        # Backend dependencies and scripts
├── README.md           # Backend-specific instructions
├── tsconfig*.json      # TypeScript configuration
├── nest-cli.json       # NestJS CLI config
├── eslint.config.mjs   # Linting configuration
└── ...
```

### Source Code (`backend/src/`)

```
src/
├── main.ts                 # Application entry point
├── app.module.ts           # Root module
├── app.controller.ts       # Health check/root controller
├── app.service.ts          # Root service
├── seed.ts                 # DB seeding script
│
├── entities/               # TypeORM entity definitions
│   ├── category.entity.ts
│   ├── product.entity.ts
│   └── sku.entity.ts
│
├── common/                 # Shared utilities and middleware
│   ├── error-logger.filter.ts  # Global error logging filter
│   ├── logger.ts               # Winston logger setup
│   └── rbac.middleware.ts      # RBAC middleware stub
│
├── category/               # Category module
│   ├── category.controller.ts
│   ├── category.service.ts
│   ├── category.controller.spec.ts
│   ├── category.service.spec.ts
│   └── dto/
│       ├── create-category.dto.ts
│       └── update-category.dto.ts
│
├── product/                # Product module
│   ├── product.controller.ts
│   ├── product.service.ts
│   ├── product.controller.spec.ts
│   ├── product.service.spec.ts
│   └── dto/
│       ├── create-product.dto.ts
│       ├── update-product.dto.ts
│       └── search-product.dto.ts
│
├── sku/                    # SKU module
│   ├── sku.controller.ts
│   ├── sku.service.ts
│   ├── sku.controller.spec.ts
│   ├── sku.service.spec.ts
│   └── dto/
│       ├── create-sku.dto.ts
│       └── update-sku.dto.ts
│
├── category.module.ts      # Category NestJS module
├── product.module.ts       # Product NestJS module
└── sku.module.ts           # SKU NestJS module
```

#### Key Backend Subdirectories
- **entities/**: TypeORM entity definitions for Category, Product, and SKU.
- **common/**: Shared utilities, error logging, and RBAC middleware stub.
- **category/**, **product/**, **sku/**: Feature modules, each with controllers, services, DTOs, and tests.

#### Testing
- **test/**: End-to-end (e2e) tests and Jest config.
- `*.spec.ts`: Unit tests for controllers and services in each module.

---

## Tasks Directory (`tasks/`)

Contains markdown files documenting the implementation plan, progress, and breakdown of major tasks:

- `001_project_setup_and_env_config.md`
- `002_data_model_and_relationships.md`
- `003_rest_api_and_validation.md`
- `004_search_filter_pagination.md`
- `005_api_documentation_and_testing.md`
- `006_error_logging_and_rbac_stub.md`
- `progress.md`: Task progress tracking

---

## Documentation & Requirements

- **business.prd.md**: Business requirements and objectives
- **technical.prd.md**: Technical requirements, architecture, and design notes
- **README.md**: Project overview, setup, and usage instructions
- **backend/README.md**: Backend-specific setup and usage
- **progress.md**: High-level progress tracking

---

## Notes
- See Swagger UI (`/docs`) for API details.
- For more information, refer to the respective markdown files in the root and `tasks/` directories. 