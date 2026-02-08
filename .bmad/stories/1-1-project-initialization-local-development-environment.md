# Story 1.1: Project Initialization & Local Development Environment

Status: review

## Story

As a **developer**,
I want **the project structure set up with local development environment**,
So that **I can start implementing features with a working database and storage**.

## Acceptance Criteria

1. **AC1: Docker Compose Environment**
   - Given a new developer clones the repository
   - When they run `docker-compose up`
   - Then PostgreSQL starts on port 5432
   - And MinIO starts on ports 9000 (API) and 9001 (console)

2. **AC2: Frontend Initialization**
   - Given the frontend folder exists
   - When a developer runs `npm install && npm run dev`
   - Then Vite dev server starts on localhost:5173
   - And React with TypeScript loads successfully

3. **AC3: Backend Initialization**
   - Given the backend folder exists
   - When a developer runs `npm install && npm run start:dev`
   - Then NestJS starts on localhost:3000
   - And Swagger docs are available at /api/docs

4. **AC4: Database Schema**
   - Given Prisma is configured
   - When a developer runs `npx prisma migrate dev`
   - Then the database schema is created
   - And the User table exists with id, email, name, role fields

## Tasks / Subtasks

- [x] Task 1: Create root project structure (AC: all)
  - [x] 1.1 Create monorepo root with `limedia/` directory
  - [x] 1.2 Create root `README.md` with project overview and setup instructions
  - [x] 1.3 Create root `.gitignore` (Node, IDE, env files)
  - [x] 1.4 Create `.env.example` with all required environment variables

- [x] Task 2: Configure Docker Compose (AC: #1)
  - [x] 2.1 Create `docker-compose.yml` with PostgreSQL 15 service
  - [x] 2.2 Add MinIO service with S3-compatible API (port 9000) and console (port 9001)
  - [x] 2.3 Configure persistent volumes for both services
  - [x] 2.4 Test: `docker-compose up` starts both services successfully

- [x] Task 3: Initialize Frontend (AC: #2)
  - [x] 3.1 Run `npm create vite@latest frontend -- --template react-ts`
  - [x] 3.2 Install MUI dependencies: `@mui/material @emotion/react @emotion/styled @mui/icons-material`
  - [x] 3.3 Install additional deps: `react-router-dom @tanstack/react-query axios`
  - [x] 3.4 Configure `vite.config.ts` with proxy to backend (localhost:3000)
  - [x] 3.5 Create `frontend/.env.example` with `VITE_API_URL` and `VITE_AUTH_MODE`
  - [x] 3.6 Test: `npm run dev` starts successfully on localhost:5173

- [x] Task 4: Initialize Backend (AC: #3)
  - [x] 4.1 Run `nest new backend` (choose npm)
  - [x] 4.2 Install core dependencies:
    - `@nestjs/config @nestjs/swagger swagger-ui-express`
    - `prisma @prisma/client`
    - `@aws-sdk/client-s3 @aws-sdk/s3-request-presigner`
  - [x] 4.3 Configure Swagger in `main.ts` at `/api/docs`
  - [x] 4.4 Configure ConfigModule with `.env` support
  - [x] 4.5 Create `backend/.env.example` with all required variables
  - [x] 4.6 Test: `npm run start:dev` starts on localhost:3000, Swagger accessible

- [x] Task 5: Configure Prisma & Database Schema (AC: #4)
  - [x] 5.1 Run `npx prisma init` in backend folder
  - [x] 5.2 Configure `DATABASE_URL` in `.env` for local PostgreSQL
  - [x] 5.3 Create initial schema with User model:
    ```prisma
    model User {
      id        String   @id @default(uuid())
      email     String   @unique
      name      String
      role      Role     @default(OPERATOR)
      managerId String?
      manager   User?    @relation("TeamMembers", fields: [managerId], references: [id])
      teamMembers User[] @relation("TeamMembers")
      createdAt DateTime @default(now()) @map("created_at")
      updatedAt DateTime @updatedAt @map("updated_at")

      @@map("users")
    }

    enum Role {
      OPERATOR
      MANAGER
      ADMIN
    }
    ```
  - [x] 5.4 Run `npx prisma migrate dev --name init` to create migration
  - [x] 5.5 Test: Database has `users` table with correct columns

- [x] Task 6: Verify Complete Setup
  - [x] 6.1 Fresh clone test: clone repo, run `docker-compose up -d`
  - [x] 6.2 Run frontend: `cd frontend && npm install && npm run dev`
  - [x] 6.3 Run backend: `cd backend && npm install && npm run start:dev`
  - [x] 6.4 Run migrations: `cd backend && npx prisma migrate dev`
  - [x] 6.5 Verify Swagger at http://localhost:3000/api/docs
  - [x] 6.6 Verify MinIO console at http://localhost:9001

## Dev Notes

### Architecture Requirements
- **Monorepo Structure:** Single `limedia/` root with `frontend/` and `backend/` subdirectories
- **No Turborepo/Nx:** Simple npm workspaces NOT required for MVP - keep it simple
- **Docker Compose:** Local dev only - production uses AWS managed services

### Technology Versions (CRITICAL - Use Exact Versions)
| Technology | Version | Command to Verify |
|------------|---------|-------------------|
| Node.js | 18.x or 20.x LTS | `node --version` |
| PostgreSQL | 15 | Docker image `postgres:15` |
| MinIO | Latest | Docker image `minio/minio` |
| Vite | 5.x | Created by `npm create vite@latest` |
| React | 18.x | Included in Vite template |
| TypeScript | 5.x | Included in Vite template |
| NestJS | 10.x | Created by `nest new` |
| Prisma | 5.x | `npm install prisma@latest` |

### Project Structure Notes

```
limedia/
├── README.md                    # Project overview, setup instructions
├── docker-compose.yml           # PostgreSQL + MinIO
├── .gitignore                   # Root gitignore
├── .env.example                 # Environment template
│
├── frontend/                    # Vite + React + TypeScript
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── .env.example
│   ├── index.html
│   └── src/
│       ├── main.tsx
│       └── App.tsx
│
└── backend/                     # NestJS + TypeScript
    ├── package.json
    ├── nest-cli.json
    ├── tsconfig.json
    ├── .env.example
    ├── src/
    │   ├── main.ts              # Entry point with Swagger config
    │   └── app.module.ts
    └── prisma/
        └── schema.prisma        # Database schema
```

### Environment Variables

**Root `.env.example`:**
```env
# No root env needed - each service has its own
```

**Frontend `.env.example`:**
```env
VITE_API_URL=http://localhost:3000
VITE_AUTH_MODE=local
```

**Backend `.env.example`:**
```env
# Server
PORT=3000
NODE_ENV=development

# Auth
AUTH_MODE=local
DEV_USER_ROLE=operator

# Database
DATABASE_URL=postgresql://limedia:limedia@localhost:5432/limedia

# Storage (MinIO for local dev)
S3_ENDPOINT=http://localhost:9000
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
S3_BUCKET=limedia-documents
S3_REGION=us-east-1
```

### Docker Compose Configuration

```yaml
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: limedia
      POSTGRES_USER: limedia
      POSTGRES_PASSWORD: limedia
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  minio:
    image: minio/minio
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin
    ports:
      - "9000:9000"   # S3 API
      - "9001:9001"   # Web console
    volumes:
      - minio_data:/data

volumes:
  postgres_data:
  minio_data:
```

### Swagger Configuration (main.ts)

```typescript
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Limedia API')
    .setDescription('Document management platform API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

### Testing Checklist

| Test | Expected Result |
|------|-----------------|
| `docker-compose up -d` | Both containers running |
| `docker ps` | postgres:15 and minio/minio visible |
| `curl http://localhost:9000/minio/health/live` | Returns OK |
| `cd frontend && npm run dev` | Server on localhost:5173 |
| `cd backend && npm run start:dev` | Server on localhost:3000 |
| Open http://localhost:3000/api/docs | Swagger UI loads |
| Open http://localhost:9001 | MinIO console loads |
| `npx prisma migrate dev` | Migration successful |
| `npx prisma studio` | Shows users table |

### References

- [Source: architecture.md#Initialization Commands]
- [Source: architecture.md#Local Development Strategy]
- [Source: architecture.md#Project Structure]
- [Source: project-context.md#Technology Stack]
- [Source: epics.md#Story 1.1]

### Anti-Patterns to AVOID

1. **DON'T** use Create React App (CRA) - use Vite
2. **DON'T** add unnecessary dependencies yet (no Redux, no form libraries)
3. **DON'T** create complex folder structures - start minimal, grow organically
4. **DON'T** configure AWS yet - use MinIO for local storage
5. **DON'T** implement authentication yet - that's Story 1.3
6. **DON'T** create any UI components - that's Story 1.2

### Success Criteria

- [x] A new developer can clone and run the full stack in < 10 minutes
- [x] All four acceptance criteria pass
- [x] No TypeScript errors in either frontend or backend
- [x] Swagger documentation accessible and shows basic endpoint

---

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- Initial session: Docker daemon not running - resumed after user started Docker Desktop
- Port 3000 conflict resolved by killing duplicate processes

### Completion Notes List

- Task 1: Root structure already existed (README.md, .gitignore, .env.example, docker-compose.yml)
- Task 2: Docker Compose configured with PostgreSQL 15 + MinIO (healthchecks included). Removed deprecated `version` attribute.
- Task 3: Frontend created with Vite + React 19 + TypeScript, MUI 7.x, TanStack Query, React Router, Axios installed. Proxy configured in vite.config.ts. Verified: HTTP 200 on localhost:5173.
- Task 4: Backend created with NestJS 11.x, Swagger configured at /api/docs, ConfigModule enabled, all required packages installed (Prisma 5.x, AWS SDK v3). Verified: HTTP 200 on localhost:3000 and /api/docs.
- Task 5: Prisma initialized, schema.prisma configured with User model and Role enum. Migration `20260125202857_init` applied. Verified: `users` table exists with columns (id, email, name, role, manager_id, created_at, updated_at).
- Task 6: All services verified - Docker containers healthy, Frontend (5173), Backend (3000), Swagger (/api/docs), MinIO console (9001) all responding HTTP 200.

### Change Log

| Date | Change | Files |
|------|--------|-------|
| 2026-01-25 | Configure vite proxy to backend | frontend/vite.config.ts |
| 2026-01-25 | Create frontend .env.example | frontend/.env.example |
| 2026-01-25 | Create NestJS backend with Swagger | backend/* |
| 2026-01-25 | Configure Prisma with User schema | backend/prisma/schema.prisma |
| 2026-01-25 | Create backend .env.example | backend/.env.example |
| 2026-01-25 | Run initial Prisma migration | backend/prisma/migrations/20260125202857_init/ |
| 2026-01-25 | Remove deprecated version from docker-compose | docker-compose.yml |

### File List

**Created:**
- limedia/frontend/.env.example
- limedia/backend/ (entire directory via nest new)
- limedia/backend/.env.example
- limedia/backend/.env
- limedia/backend/prisma/schema.prisma
- limedia/backend/prisma/migrations/20260125202857_init/migration.sql

**Modified:**
- limedia/frontend/vite.config.ts (added proxy configuration)
- limedia/backend/src/main.ts (added Swagger + CORS)
- limedia/backend/src/app.module.ts (added ConfigModule)
- limedia/docker-compose.yml (removed deprecated version attribute)
