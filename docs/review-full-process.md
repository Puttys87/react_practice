# 전 과정 검토 보고서

ref 이미지 기반 화면 개발부터 보완까지 전체 과정을 검토한 결과입니다.

---

## 1. 과정 타임라인

| 단계 | 내용 | 산출물 |
|------|------|--------|
| 계획 수립 | ref(select_assessment.png, EQ-5D-5L_mobility.png) + SKILL 기준으로 개발 계획 수립 | docs/plan-ref-screens.md |
| 재구성 | 6가지 기준으로 점수화 후 Phase 0~6 재구성 | 계획서 Part A~E |
| 다이어그램 검토 | Activity/Sequence 다이어그램으로 사용자 의도·갭 검토 | 완료 화면·Back·0선택·EQ-VAS 처리 보완 제안 |
| 구현 | Phase 0~6 순차 구현 | domains, primitives, layout, features, app, E2E, Storybook |
| 1차 검토 | 누락 테스트·CSS 하드코딩·EQ-VAS·react-query 검토 | 검토 요약 |
| 보완 | 테스트 5종 추가, CSS 토큰, EQ-VAS 안내, react-query 도입 | 본 문서 반영 |

---

## 2. 계획 대비 구현 충족도

### 2.1 docs 및 Phase 0

| 항목 | 계획 | 구현 | 비고 |
|------|------|------|------|
| 계획서 저장 | docs/ | docs/plan-ref-screens.md | OK |
| 라우팅 결정 | react-router-dom, 경로 정의 | /, /assessment/eq5d5l, step/:stepIndex, complete | OK |
| Storybook 포트 | 44012 | README·package script | OK |
| 데이터 계약 | 타입·API 시그니처 | types.ts, getAssessments, getCurrentUser | OK |

### 2.2 도메인·데이터 (Phase 1)

| 항목 | 계획 | 구현 | 비고 |
|------|------|------|------|
| 타입 분리 | types.ts | Assessment, AssessmentId, UserInfo, Eq5d5lDimensionId, Eq5d5lLevel, Eq5d5lAnswers | OK (계획의 Eq5d5lDimension → DimensionId로 명명) |
| 상수 분리 | constants.ts | EQ5D5L_DIMENSION_ORDER, LABELS, LEVEL_PHRASES, TOTAL_STEPS | OK |
| Mock 데이터 분리 | data/ | domains/assessment/data/mockAssessment.ts | OK |
| API 인터페이스 | 목업/실API 교체 가능 | api.ts: getAssessments, getCurrentUser | OK |
| 검증 | 단위 테스트 | api.test.ts | OK |

### 2.3 Primitives·레이아웃 (Phase 2)

| 항목 | 계획 | 구현 | 비고 |
|------|------|------|------|
| RadioGroup | Radix wrapper, a11y | shared/ui/primitives/RadioGroup | OK |
| Card | 토큰 기반, default/selected | shared/ui/primitives/Card | OK |
| Button fullWidth | variant 확장 | Button fullWidth | OK |
| ScreenLayout | Header/Content/Footer | shared/layout/ScreenLayout | OK |
| 테마 토큰 | primary-muted 등 | theme.css + size/shadow 토큰 | OK (보완 시 토큰 확장) |

### 2.4 Select Assessment (Phase 3)

| 항목 | 계획 | 구현 | 비고 |
|------|------|------|------|
| useSelectAssessment | 선택 ID, 토글, Start, canStart | EQ-5D-5L 선택 시에만 canStart | OK (보완 반영) |
| AssessmentCard | 카드·선택 체크·클릭 토글 | AssessmentCard.tsx | OK |
| SelectAssessmentScreen | 레이아웃·사용자 카드·평가 리스트·CTA | useQuery 연동, 로딩, EQ-VAS 안내 | OK |
| 데이터 소스 | API/목업 분리 | getAssessments, getCurrentUser (react-query) | OK |

### 2.5 EQ-5D-5L (Phase 4)

| 항목 | 계획 | 구현 | 비고 |
|------|------|------|------|
| useEq5d5lStep | stepIndex, answers, setAnswer, goNext, isLastStep | useEq5d5lStep.ts | OK |
| Eq5d5lProgress | Step X of 5, 진행 바 | Eq5d5lProgress.tsx | OK |
| Eq5d5lStepScreen | 한 스텝·RadioGroup·Next/완료 | onNext(nextIndex, nextAnswers) | OK |
| 완료 화면 | 완료/결과 | Eq5d5lCompleteScreen, state로 answers | OK |
| Back | Step 1 → Select, Step 2~4 → 이전 | handleBack, location.state 유지 | OK |

### 2.6 라우팅·E2E (Phase 5)

| 항목 | 계획 | 구현 | 비고 |
|------|------|------|------|
| 라우터 | react-router-dom | App.tsx BrowserRouter, routes.tsx | OK |
| / → Select | 진입 | Route path="/" | OK |
| /assessment/eq5d5l | Step 1 | Navigate to step/0 | OK |
| step/:stepIndex | Step 2~5 | Eq5d5lStepRoute, state.answers | OK |
| complete | 완료 화면 | Eq5d5lCompleteRoute | OK |
| Start → eq5d5l | navigate | handleStart, selectedIds.includes('eq5d5l') | OK |
| E2E | Select·Step 플로우 | e2e/app.spec.ts (Select, Step 1→2) | OK |

### 2.7 Storybook (Phase 6)

| 항목 | 계획 | 구현 | 비고 |
|------|------|------|------|
| 설정 | 포트 44012, 테마 | .storybook/main.ts, preview.ts, alias | OK |
| 스토리 | RadioGroup, Card, ScreenLayout, AssessmentCard, Eq5d5lProgress, SelectAssessment, Eq5d5lStep | 7개 + Eq5d5lCompleteScreen | OK |

---

## 3. SKILL 준수 점검

| SKILL 규칙 | 준수 | 비고 |
|------------|------|------|
| Design System·README 준수 | 예 | theme.css, primitives만 사용 |
| 모델 type 단위 분리 | 예 | domains/assessment/types.ts |
| 상수 의미별 개별 파일 | 예 | constants.ts |
| Mock 데이터 UI/로직 분리 | 예 | data/mockAssessment.ts, api.ts |
| 실데이터/목업 동일 인터페이스 | 예 | getAssessments, getCurrentUser |
| 외부 데이터 호출 → react-query | 예 | useQuery (보완 반영) |
| CSS Variables·토큰만 사용 | 예 | theme 토큰, 보완 시 size/shadow 토큰 추가 |
| Radix 직접 사용 금지 | 예 | features는 @shared/ui/primitives만 사용 |
| 비즈니스 로직 Custom Hook | 예 | useSelectAssessment, useEq5d5lStep |
| 공통 레이아웃 분리 | 예 | ScreenLayout |
| 단위·통합·e2e 테스트 | 예 | 훅·화면·api·E2E (보완 시 5종 테스트 추가) |
| 개발 컴포넌트 Storybook 추가 | 예 | 8개 스토리 |
| 계획서 docs/ 저장 | 예 | docs/plan-ref-screens.md |

---

## 4. 보완 반영 사항

| 보완 항목 | 내용 |
|-----------|------|
| 누락 테스트 | AssessmentCard, ScreenLayout, Eq5d5lCompleteScreen, RadioGroup, Card 단위/통합 테스트 추가 |
| useSelectAssessment | EQ-VAS만 선택 시 canStart false 테스트 추가 |
| CSS 토큰 | progress-bar-height, radio-outer/inner, avatar, content-max, shadow-dialog, dialog-max 등 theme에 추가 후 CSS에서 var() 사용 |
| EQ-VAS만 선택 | canStart = selectedIds.includes('eq5d5l'), 선택 시 안내 문구 표시 |
| react-query | QueryClientProvider, useQuery(assessments/currentUser), 로딩 UI |
| 테스트 보정 | SelectAssessmentScreen·App 테스트에 QueryClientProvider·비동기 대기 반영 |

---

## 5. 남은 이슈·선택 개선

| 구분 | 내용 | 우선순위 |
|------|------|----------|
| SelectAssessmentScreen 에러 UI | useQuery isError 시 메시지/재시도 미구현 | 낮음 (목업 환경에서는 드묾) |
| E2E 대기 | useQuery 로딩 후 버튼 노출까지 Playwright 기본 대기로 충분하나, 느린 환경 시 timeout 조정 가능 | 낮음 |
| 직접 URL 접근 | /assessment/eq5d5l/step/1 직접 접근 시 state 없어 answers 비움 (새로고침 동일) | MVP 허용 |

---

## 6. 산출물 목록 (최종)

```
docs/
  plan-ref-screens.md      # 계획 + Phase 0 결정
  review-full-process.md   # 본 검토 보고서

src/
  app/                     # 진입·라우팅
  domains/assessment/      # 타입·상수·목업·api
  features/
    select-assessment/    # 훅·화면·카드·테스트·스토리
    eq5d5l/               # 훅·진행·스텝·완료·테스트·스토리
  shared/
    layout/               # ScreenLayout
    styles/               # theme, global
    ui/primitives/        # Button, Dialog, RadioGroup, Card

e2e/
  app.spec.ts             # Select, EQ-5D-5L Step 플로우

.storybook/               # main, preview
```

---

## 7. 결론

- **계획 대비**: Phase 0~6 산출물·라우팅·완료 화면·Back·EQ-VAS·0선택 처리까지 계획과 다이어그램 검토 내용이 구현·보완에 반영됨.
- **SKILL**: Design System, DDD, 데이터 분리, react-query, 테스트, Storybook, 계획서 저장 등 요구사항을 충족함.
- **품질**: 단위·통합·E2E 테스트와 Storybook으로 검증 가능한 상태이며, 에러 UI·직접 URL 등은 선택적으로 보강 가능함.

전 과정이 계획 → 재구성 → 검토 → 구현 → 보완 순으로 일관되게 진행되었고, 현재 기준으로 목표 범위는 충족된 상태입니다.
