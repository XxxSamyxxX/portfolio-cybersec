# Plan: CI/CD Pipeline Complet pour portfolio-cybersec

Pipeline GitHub Actions en 6 stages obligatoires avant merge sur `main`. Inclut linting, tests unitaires/intégration, tests E2E avec Playwright (multi-browser), et analyse SonarCloud.

## Configuration
- **Coverage minimum**: 80%
- **E2E browsers**: Chromium, Firefox, WebKit (+ Mobile Chrome/Safari)
- **SonarCloud**: Rapport uniquement (ne bloque pas le merge)

## Steps ✅ IMPLEMENTED

1. ✅ **Dépendances de test installées** dans `package.json`:
   - Vitest + @vitest/coverage-v8
   - @testing-library/react + jest-dom + user-event
   - Playwright
   - MSW (Mock Service Worker)
   - Scripts: `test`, `test:watch`, `test:coverage`, `test:e2e`, `type-check`

2. ✅ **Configuration Vitest** (`vitest.config.ts`):
   - Environment: jsdom
   - Coverage: v8 provider, lcov reporter
   - Thresholds: 80% (statements, branches, functions, lines)

3. ✅ **Tests unitaires** (`src/__tests__/unit/`):
   - `imageUtils.test.ts` - 11 tests
   - `queries.test.tsx` - 4 tests (hooks React Query)
   - `Stats.test.tsx` - 4 tests
   - `SEOHead.test.tsx` - 5 tests

4. ✅ **Tests d'intégration** (`src/__tests__/integration/`):
   - `Projects.test.tsx` - 4 tests
   - `WriteupsList.test.tsx` - 4 tests
   - MSW handlers pour Supabase mocking

5. ✅ **Tests E2E Playwright** (`e2e/`):
   - `homepage.spec.ts` - Navigation, scroll, sections
   - `projects.spec.ts` - List, detail, filters
   - `articles.spec.ts` - Tabs, lazy loading, markdown
   - `responsive.spec.ts` - Mobile, tablet, desktop

6. ✅ **GitHub Actions workflow** (`.github/workflows/ci.yml`):
   ```
   Stage 1: 📦 Install (npm ci + cache)
   Stage 2: 🔍 Quality (lint + type-check)
   Stage 3: 🧪 Unit & Integration Tests (coverage)
   Stage 4: 🌐 E2E Tests (chromium, firefox, webkit)
   Stage 5: 🏗️ Build Production
   Stage 6: 📊 SonarCloud Analysis (report only)
   ```

7. ✅ **SonarCloud** (`sonar-project.properties`):
   - Project key: `XxxSamyxxX_portfolio-cybersec`
   - Coverage path: `coverage/lcov.info`
   - Mode: Report only (no blocking)

## Test Results: 32 tests passing ✅

## Secrets GitHub requis
| Secret | Description |
|--------|-------------|
| `VITE_SUPABASE_URL` | URL du projet Supabase |
| `VITE_SUPABASE_ANON_KEY` | Clé publique Supabase |
| `SONAR_TOKEN` | Token SonarCloud |

## Branch Protection Rules (à configurer manuellement)
- ✅ Require status checks: `quality`, `test`, `e2e`, `build`
- ✅ Require PR review before merge
- ✅ Block direct push to `main`
