# Story 2.2: Category Management (Admin)

Status: in-progress

## Story

As an **administrator**,
I want **to create and organize categories in a hierarchy**,
So that **documents can be logically organized for easy browsing (FR9)**.

## Acceptance Criteria

1. **AC1: Category Management UI**
   - Given I am an administrator
   - When I access the Admin Library page
   - Then I see a category management section
   - And I can create a new root category
   - And I can create a child category under any existing category

2. **AC2: Category CRUD**
   - Given I create a category named "Maritime Operations"
   - When I save the category
   - Then the category appears in the category tree
   - And I can create sub-categories under it

3. **AC3: Category Tree Display**
   - Given categories exist
   - When I view the category tree
   - Then categories display in a hierarchical structure
   - And I can expand/collapse category branches

4. **AC4: Authorization**
   - Given I am an operator or manager (not admin)
   - When I try to access category management
   - Then I receive a 403 Forbidden error

## Tasks / Subtasks

- [ ] Task 1: Create Categories API (AC: #2, #4)
  - [ ] 1.1 Create CategoriesModule
  - [ ] 1.2 Create CategoriesService with CRUD operations
  - [ ] 1.3 Create CategoriesController with endpoints
  - [ ] 1.4 Add @Roles('admin') guard to endpoints
  - [ ] 1.5 Test API endpoints

- [ ] Task 2: Create Category DTOs (AC: #2)
  - [ ] 2.1 Create CreateCategoryDto
  - [ ] 2.2 Create UpdateCategoryDto
  - [ ] 2.3 Create CategoryResponseDto
  - [ ] 2.4 Add validation

- [ ] Task 3: Create Frontend Category Components (AC: #1, #3)
  - [ ] 3.1 Create CategoryTree component
  - [ ] 3.2 Create CategoryForm component
  - [ ] 3.3 Create CategoryItem component
  - [ ] 3.4 Add expand/collapse functionality

- [ ] Task 4: Update AdminLibrary Page (AC: #1)
  - [ ] 4.1 Add category management section
  - [ ] 4.2 Integrate CategoryTree component
  - [ ] 4.3 Add create/edit/delete actions

## Dev Notes

### API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/categories | List all categories (tree) |
| GET | /api/v1/categories/:id | Get single category |
| POST | /api/v1/categories | Create category |
| PATCH | /api/v1/categories/:id | Update category |
| DELETE | /api/v1/categories/:id | Delete category |

### References
- [Source: epics.md#Story 2.2]

---

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List

(will be filled during implementation)

### Change Log

| Date | Change | Files |
|------|--------|-------|
| 2026-01-26 | Create story file | 2-2-category-management-admin.md |
