# React Training

Vite 기반 React + TypeScript 프로젝트. DDD 폴더 구조, Radix UI 기반 디자인 시스템, 의료·의사결정 도메인에 맞는 절제된 UI를 목표로 합니다.

## 요구 사항

- Node.js 18+
- npm / pnpm / yarn

## 설치 및 실행

```bash
npm install
npm run dev
```

개발 서버는 **http://localhost:44010** 에서 실행됩니다.

## 폴더 구조 (DDD)

```
src/
├── app/           # 앱 진입점, 라우팅, 레이아웃
│   ├── main.tsx
│   └── App.tsx
├── domains/       # 도메인 모델, 비즈니스 로직 (도메인별 하위 폴더)
├── features/     # 기능 단위 (유스케이스, 기능 전용 컴포넌트)
├── shared/       # 공유 레이어
│   ├── ui/
│   │   └── primitives/   # Radix UI wrapper (Button, Dialog 등)
│   ├── styles/          # 테마, 글로벌 CSS
│   └── test/            # 테스트 설정
```

### 레이어별 역할

| 레이어 | 역할 |
|--------|------|
| **app** | 진입점, 라우팅, 전역 레이아웃. 도메인/기능을 조합해 화면 구성 |
| **domains** | 도메인 모델, 엔티티, 비즈니스 규칙. UI와 무관한 순수 로직 |
| **features** | 사용자 시나리오 단위 기능. 도메인 + shared UI로 구현 |
| **shared** | UI 프리미티브, 스타일, 유틸. 여러 기능에서 재사용 |

## 디자인 시스템

- **Radix UI**: headless 프리미티브로 사용
- **shared/ui/primitives**: Radix 컴포넌트를 감싼 wrapper만 노출
- **원칙**: 앱/기능 코드에서는 `@radix-ui/*`를 직접 import하지 않고, `@shared/ui/primitives`만 사용

### 테마

- CSS Variables 기반
- **light / dark** 테마 지원 (`data-theme="light"` | `"dark"`)
- 토큰: color, spacing, radius, typography (`src/shared/styles/theme.css`)
- 의료·의사결정 도메인에 맞게 절제되고 신뢰감 있는 톤 유지

## 포트 구성 (44010 ~ 44020)

| 포트 | 용도 |
|------|------|
| **44010** | 개발 서버 (Vite dev) |
| **44011** | 프리뷰 서버 (Vite preview) |
| **44012** | Storybook |
| 44013~44020 | 예: Mock API 등 확장용 |

`vite.config.ts`에 포트가 명시되어 있습니다.

## 테스트

### Unit / Integration (Vitest + Testing Library)

```bash
npm run test        # watch
npm run test:run    # 1회 실행
npm run test:coverage
```

- 설정: `vite.config.ts` 내 `test` 블록, `src/shared/test/setup.ts`
- 예제: `src/app/App.test.tsx`, `src/shared/ui/primitives/Button/Button.test.tsx`

### E2E (Playwright)

```bash
npx playwright install   # 최초 1회 (브라우저 설치)
npm run e2e
npm run e2e:ui           # UI 모드
```

- 설정: `playwright.config.ts`
- 기본 시나리오: `e2e/app.spec.ts`
- E2E 실행 시 개발 서버(44010)를 자동으로 띄웁니다.

## 스크립트 요약

| 명령 | 설명 |
|------|------|
| `npm run dev` | 개발 서버 (44010) |
| `npm run build` | 프로덕션 빌드 |
| `npm run preview` | 빌드 결과물 미리보기 (44011) |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm run test` | Vitest (watch) |
| `npm run e2e` | Playwright E2E |
| `npm run storybook` | Storybook (44012) |
| `npm run build-storybook` | Storybook 정적 빌드 |

## 문서 체계

- **docs/**  
  계획·분석 문서(`docs/*.md`)와 기술 의사결정 기록(`docs/work-logs/`)을 구분하여 둔다.
- **work-log**  
  설계 결정, 트레이드오프, 변경 위험을 기록한다.  
  [docs/work-logs/eq5d5l-eqvas-implementation.md](docs/work-logs/eq5d5l-eqvas-implementation.md)
- **extension_note**  
  변경 가능성, 확장 압력, 패턴화 필요성을 정리한다.  
  [docs/work-logs/extension_note.md](docs/work-logs/extension_note.md)
- **계획·분석 문서**

| 문서 | 용도 |
|------|------|
| [docs/plan-ref-extended.md](docs/plan-ref-extended.md) | Phase 0 사전 결정(라우트·Slider·타입·Review 공통화) |
| [docs/plan-ref-screens.md](docs/plan-ref-screens.md) | ref 이미지 기반 화면·플로우 계획 |
| [docs/ref-images-analysis.md](docs/ref-images-analysis.md) | ref 이미지 5종 화면·플로우 분석 |
| [docs/review-full-process.md](docs/review-full-process.md) | 전 과정 검토 보고서 |

## Path Alias

- `@app/*` → `src/app/*`
- `@domains/*` → `src/domains/*`
- `@features/*` → `src/features/*`
- `@shared/*` → `src/shared/*`

TSConfig와 Vite `resolve.alias`에 동일하게 설정되어 있습니다.
