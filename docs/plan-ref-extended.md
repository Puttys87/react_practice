# ref 확장 개발 계획 (Phase 0 사전 결정)

본 문서는 [docs/ref-images-analysis.md](ref-images-analysis.md) 및 재구성된 개발 계획에 따른 **사전 결정 및 계약**을 기록한다.

---

## 1. 라우트 전체 표

| 경로 | 화면 | 비고 |
|------|------|------|
| `/` | Select Assessment | 기존 |
| `/assessment/eq5d5l` | EQ-5D-5L Step 1 (리다이렉트 step/0) | 기존 |
| `/assessment/eq5d5l/step/:stepIndex` | EQ-5D-5L Step 2~5 | 기존 |
| `/assessment/eq5d5l/review` | EQ-5D-5L Review and Submit | **추가** — Step 5 Complete 후 진입, state.answers |
| `/assessment/eq5d5l/complete` | EQ-5D-5L 완료 (Thank you) | 기존 — Review에서 Submit Assessment 후 진입 |
| `/assessment/eqvas` | EQ-VAS 설문 (슬라이더) | **추가** |
| `/assessment/eqvas/review` | EQ-VAS Review and Submit | **추가** — state.score |
| `/assessment/eqvas/complete` | EQ-VAS 완료 | **추가** |

### 동시 선택 정책

- EQ-5D-5L과 EQ-VAS를 **둘 다** 선택한 상태에서 Start 시 **EQ-5D-5L 플로우만** 진입한다.
- 완료 후 Select로 복귀. 사용자가 (EQ-VAS만 남기고) 다시 Start 시 EQ-VAS 플로우로 진입한다.

---

## 2. Slider

- **라이브러리**: `@radix-ui/react-slider` 사용.
- **노출**: `src/shared/ui/primitives/Slider/` 래퍼만 노출. features에서는 Radix 직접 사용 금지.
- **역할**: value / onValueChange, min / max / step, a11y·테마 토큰만 사용.

---

## 3. 타입·상수 계약

### 타입 (domains/assessment/types.ts)

- **EqVasScore**: 0~100 정수. `number` (또는 `number`로 제한은 런타임/유효성 검사에서).
- 기존: `Assessment`, `AssessmentId`, `UserInfo`, `Eq5d5lDimensionId`, `Eq5d5lLevel`, `Eq5d5lAnswers`.

### 상수 (domains/assessment/constants.ts)

- **EQ-5D-5L 리뷰 카드용 차원별 accent**: CSS 변수명만 매핑.
  - mobility → blue, selfCare → green, usualActivities → orange, painDiscomfort → red, anxietyDepression → purple.
  - 실제 색상 값은 theme.css에 `--color-dimension-mobility` 등으로 정의.

---

## 4. Review 공통화

- **제목**: "Review and Submit".
- **안내 2줄**: prop으로 주입 (EQ-5D-5L / EQ-VAS 문구 다름).
- **본문**: children (카드 영역).
- **Footer**: 풀폭 버튼 "Submit Assessment".
- **구현**: 기존 `ScreenLayout` 재사용 또는 `ReviewLayout`(shared/layout) 컴포넌트로 제목·안내·children·Footer 한 번 정의 후, EQ-5D-5L Review·EQ-VAS Review에서 재사용.

---

이 문서 반영 후 Phase 1 → 2 → … → 6 순서로 구현 진행.
