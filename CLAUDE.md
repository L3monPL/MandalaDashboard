# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development server (proxies /api/* to localhost:3000)
npm start

# Production build → dist/mandala-dashboard/
npm run build

# Build in watch mode
npm run watch

# Run tests (Karma + Jasmine)
npm test

# Run a single test file (example)
npx ng test --include='**/rest.service.spec.ts'
```

## Architecture

**Stack**: Angular 15 · TypeScript · Angular Material (Indigo-Pink) · SCSS · RxJS

The app is a portfolio/admin dashboard. Public visitors browse realizations (projects); an authenticated admin can create/delete them via a dashboard.

### Routing

```
/                       → HomePageComponent        (eager)
/login                  → LoginPageComponent        (lazy)
/dashboard              → DashboardPageComponent    (lazy)
/polityka-prywatnosci   → PrivacyPolicyPageComponent (lazy)
```

### Services

| Service | Role |
|---|---|
| `RestService` | All HTTP calls — defines every API endpoint |
| `RealizationService` | Realization state shared between components |
| `UserDataService` | Global user session (token, login state) |
| `PopupManagementService` | Triggers success/error popup modals |
| `MainManagementService` | Cross-component UI coordination |

`AuthInterceptor` (`src/app/auth/`) attaches `localStorage['auth_app_token']` as a Bearer token to every outgoing request.

### API Surface (`/api/*` → proxied to `localhost:3000` in dev)

```
GET    /api/users/auth
POST   /api/users/login
GET    /api/realizations
GET    /api/realizations/paginator?page=N
GET    /api/realizations/image/:id
POST   /api/realizations/private/create
POST   /api/realizations/private/:id/image/:position
DELETE /api/realizations/private/:id
POST   /api/message
```

### Component generation defaults

`angular.json` is configured to skip spec generation and use SCSS for new components:

```bash
ng generate component components/my-component
```

### Production deployment

Docker multi-stage build (Node 16 → Nginx Alpine). `nginx.conf` serves the SPA and falls back all routes to `index.html`.
