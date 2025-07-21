# Product Requirements Document (PRD)

## Product Overview

The E-commerce Inventory Management Service is a backend system designed to enable administrators to efficiently manage product categories, products, and SKUs for an e-commerce business. The service provides robust RESTful APIs for CRUD operations, search, filtering, and inventory tracking, with a focus on simplicity, reliability, and extensibility. The system is built using NestJS and PostgreSQL, and is intended for internal use by admin users only.

## Target Market

- **Primary Users:** Internal administrators of e-commerce businesses who need to manage inventory, product listings, and stock levels.
- **Business Type:** Small to medium-sized e-commerce companies, online retailers, and businesses seeking a standalone inventory management backend.
- **Usage Context:** Used by staff responsible for catalog management, inventory control, and product data maintenance. Not intended for end customers or storefront integration in this version.

## Functional Requirements

| Requirement ID | Description | User Story | Expected Behaviour/Outcome |
|---------------|-------------|------------|---------------------------|
| FR-1 | Category CRUD | As an admin, I want to create, read, update, and delete categories so that I can organize products effectively. | Admin can perform all CRUD operations on categories. |
| FR-2 | List Categories | As an admin, I want to list all categories so that I can view available product groups. | API returns a list of all categories. |
| FR-3 | Unique Category Name | As an admin, I want category names to be unique so that there is no confusion in product grouping. | System prevents creation of duplicate category names. |
| FR-4 | Prevent Deletion of Category with Products | As an admin, I want to be prevented from deleting a category that contains products so that I do not orphan products. | System blocks deletion and returns an error if products exist in the category. |
| FR-5 | Product CRUD | As an admin, I want to create, read, update, and delete products so that I can manage the product catalog. | Admin can perform all CRUD operations on products. |
| FR-6 | List/Search/Filter/Paginate Products | As an admin, I want to list, search, filter, and paginate products so that I can efficiently manage large catalogs. | API supports partial, case-insensitive search by name, filter by category, and pagination (page & pageSize; default 10, max 100). |
| FR-7 | Product-Category Relationship | As an admin, I want each product to belong to a category so that products are organized. | System enforces that every product has a valid category_id. |
| FR-8 | Unique Product Name within Category | As an admin, I want product names to be unique within a category so that products are easily identifiable. | System prevents duplicate product names within the same category. |
| FR-9 | Product Timestamps | As an admin, I want to know when a product was created or updated so that I can track changes. | System stores and returns created_at and updated_at timestamps for products. |
| FR-10 | Cascade Delete SKUs | As an admin, I want SKUs to be deleted when a product is deleted so that there are no orphaned SKUs. | Deleting a product automatically deletes all its SKUs. |
| FR-11 | SKU CRUD | As an admin, I want to add, update, and delete SKUs for a product so that I can manage product variants. | Admin can perform all CRUD operations on SKUs for a product. |
| FR-12 | SKU-Product Relationship | As an admin, I want each SKU to belong to a valid product so that inventory is tracked correctly. | System enforces that every SKU has a valid product_id. |
| FR-13 | SKU Code Validation | As an admin, I want SKU codes to be alphanumeric, max 32 characters, and globally unique so that each SKU is easily tracked. | System validates SKU code format and uniqueness. |
| FR-14 | Track Price and Stock | As an admin, I want to track price and stock quantity for each SKU so that inventory and pricing are accurate. | System stores price (float, USD) and stock_quantity (>=0) for each SKU. |
| FR-15 | List SKUs for Product | As an admin, I want to view all SKUs for a product so that I can manage product variants. | API returns all SKUs for a given product. |
| FR-16 | API Design & Error Handling | As an admin, I want consistent API responses and documentation so that integration and troubleshooting are easy. | RESTful JSON APIs, error format `{ "error": "ErrorType", "message": "Descriptive message" }`, correct HTTP status codes, OpenAPI docs at `/docs` and `/openapi.json`, CORS, and .env config. |

## Non-Functional Requirements

| Requirement ID | Description | Acceptance Criteria |
|---------------|-------------|---------------------|
| NFR-1 | Performance | System can handle typical admin operations for small to medium-sized catalogs without significant delay. |
| NFR-2 | Reliability | System provides robust error handling and data validation; no data corruption or orphaned records. |
| NFR-3 | Security | No authentication required, but basic CORS restrictions are in place; no rate limiting needed. |
| NFR-4 | Maintainability | Codebase follows best practices for NestJS and PostgreSQL; uses environment variables for configuration. |
| NFR-5 | Extensibility | System is designed to allow for future enhancements (e.g., user roles, analytics, storefront integration). |
| NFR-6 | Documentation | Comprehensive API documentation is auto-generated and accessible at specified endpoints. |

## Success Metrics

- **Functional Coverage:** 100% of specified CRUD, search, filter, and pagination features are implemented and tested.
- **Data Integrity:** No data corruption or orphaned records in the database; all constraints enforced.
- **Error Handling:** All error responses conform to the specified format and use correct HTTP status codes.
- **API Usability:** API documentation is complete and accessible at the specified endpoints.
- **Admin Satisfaction:** Internal admin users can manage categories, products, and SKUs without encountering critical bugs or blockers.
- **Deployment Readiness:** System can be configured via `.env` and run locally with minimal setup. 