# Story 2.1: Document & Category Database Schema

Status: review

## Story

As a **developer**,
I want **the database schema for documents, categories, and keywords**,
So that **all document management features have a proper data foundation**.

## Acceptance Criteria

1. **AC1: Documents Table**
   - Given Prisma schema is configured
   - When migrations are run
   - Then the `documents` table exists with columns: id, title, file_path, file_type, file_size, created_at, updated_at

2. **AC2: Categories Table**
   - Given Prisma schema is configured
   - When migrations are run
   - Then the `categories` table exists with columns: id, name, parent_id (self-reference), created_at
   - And nested categories up to 3 levels are supported

3. **AC3: Keywords Table**
   - Given Prisma schema is configured
   - When migrations are run
   - Then the `keywords` table exists with columns: id, name, created_at

4. **AC4: Join Tables**
   - Given many-to-many relationships are needed
   - When migrations are run
   - Then document_categories join table exists
   - And document_keywords join table exists

## Tasks / Subtasks

- [x] Task 1: Update Prisma Schema (AC: #1, #2, #3, #4)
  - [x] 1.1 Add Document model with all fields
  - [x] 1.2 Add Category model with self-reference for hierarchy
  - [x] 1.3 Add Keyword model
  - [x] 1.4 Add many-to-many relations
  - [x] 1.5 Add indexes for performance

- [x] Task 2: Create and Run Migration (AC: #1, #2, #3, #4)
  - [x] 2.1 Generate Prisma migration
  - [x] 2.2 Run migration on database
  - [x] 2.3 Verify tables created correctly

- [x] Task 3: Create Prisma Service (AC: #1, #2, #3, #4)
  - [x] 3.1 Create PrismaService
  - [x] 3.2 Create PrismaModule (global)
  - [x] 3.3 Import in AppModule

- [x] Task 4: Seed Sample Data
  - [x] 4.1 Create seed script with sample users
  - [x] 4.2 Create seed script with sample categories (3 levels)
  - [x] 4.3 Create seed script with sample keywords
  - [x] 4.4 Create seed script with sample documents
  - [x] 4.5 Create seed script with reading assignments
  - [x] 4.6 Test seed script

## Dev Notes

### Database Schema
```
Document
  - id: UUID (PK)
  - title: String
  - filePath: String
  - fileType: FileType (PDF, DOCX, XLSX)
  - fileSize: Int (bytes)
  - createdAt: DateTime
  - updatedAt: DateTime
  - categories: Category[] (many-to-many)
  - keywords: Keyword[] (many-to-many)

Category
  - id: UUID (PK)
  - name: String
  - parentId: UUID? (FK to self)
  - parent: Category?
  - children: Category[]
  - createdAt: DateTime
  - documents: Document[] (many-to-many)

Keyword
  - id: UUID (PK)
  - name: String (unique)
  - createdAt: DateTime
  - documents: Document[] (many-to-many)

ReadingAssignment
  - id: UUID (PK)
  - userId: UUID (FK)
  - documentId: UUID (FK)
  - assignedBy: UUID (FK)
  - assignedAt: DateTime

ReadingProgress
  - id: UUID (PK)
  - userId: UUID (FK)
  - documentId: UUID (FK)
  - status: ReadingStatus (TO_READ, VISITED, READ)
  - firstViewedAt: DateTime?
  - completedAt: DateTime?
```

### References
- [Source: architecture.md#Database Schema]
- [Source: epics.md#Story 2.1]

---

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List

- Task 1: Updated Prisma schema with Document, Category, Keyword, ReadingAssignment, ReadingProgress models. Added FileType and ReadingStatus enums. Added indexes for performance.
- Task 2: Migration `add_documents_categories_keywords` created and applied successfully.
- Task 3: Created PrismaService and PrismaModule. Imported in AppModule as global module.
- Task 4: Created comprehensive seed script with sample users (admin, manager, 2 operators), categories (3 levels), 12 keywords, 3 documents, and reading assignments.

### Change Log

| Date | Change | Files |
|------|--------|-------|
| 2026-01-26 | Update Prisma schema | backend/prisma/schema.prisma |
| 2026-01-26 | Create migration | backend/prisma/migrations/20260126172121_add_documents_categories_keywords/ |
| 2026-01-26 | Create PrismaService | backend/src/prisma/prisma.service.ts |
| 2026-01-26 | Create PrismaModule | backend/src/prisma/prisma.module.ts |
| 2026-01-26 | Create prisma exports | backend/src/prisma/index.ts |
| 2026-01-26 | Update AppModule | backend/src/app.module.ts |
| 2026-01-26 | Create seed script | backend/prisma/seed.ts |
| 2026-01-26 | Update package.json | backend/package.json |

### File List

**Created:**
- backend/src/prisma/prisma.service.ts
- backend/src/prisma/prisma.module.ts
- backend/src/prisma/index.ts
- backend/prisma/seed.ts
- backend/prisma/migrations/20260126172121_add_documents_categories_keywords/migration.sql

**Modified:**
- backend/prisma/schema.prisma (added Document, Category, Keyword, ReadingAssignment, ReadingProgress models)
- backend/src/app.module.ts (imported PrismaModule)
- backend/package.json (added db:seed, db:migrate, db:studio scripts and prisma seed config)
