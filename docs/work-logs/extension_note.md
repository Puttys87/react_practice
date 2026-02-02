# 확장·변경 노트

향후 변경 가능성, 확장 압력, 패턴화 필요성을 근거와 함께 정리한다. 단정(확정된 사실)과 추측(가능성)을 구분하여 표기한다.

---

## 1. 변경 가능성

### 1.1 EQ-VAS 슬라이더 초기값

현재 구현은 "초기값 없음"을 채택하였다. 사용자가 슬라이더를 한 번이라도 움직여야 Submit이 활성화된다. 근거는 ref 분석에서 "선택 필수"로 해석한 것이다. 다만 ref 이미지에 66이 표시된 것은 예시일 뿐이며, 요구사항 문서에 "기본값 50" 등이 명시되면 정책 변경이 필요하다. 변경 시 `useEqVas`의 `initialValue` 및 `canSubmit` 조건을 함께 수정해야 한다.

### 1.2 review·complete 직접 URL 진입

`/assessment/eq5d5l/review`, `/assessment/eqvas/review`, `/assessment/eqvas/complete` 등에 `location.state` 없이 직접 진입하면 answers·score가 비어 있다. 현재는 빈 요약 표시 또는 Submit 비활성으로 처리하고 있으며, 리다이렉트는 구현하지 않았다. MVP 범위 내 허용으로 두었으나, 보안·UX 요구가 있으면 "state 없을 때 `/`로 리다이렉트"와 같은 정책을 도입할 수 있다. 이때 라우트 컴포넌트 또는 각 Review·Complete 화면에서 처리 위치를 결정해야 한다.

### 1.3 다국어·접근성 확장

문구와 라벨은 현재 소스 코드에 하드코딩되어 있다. 다국어(i18n) 도입 시 문구·토큰 위치를 리소스로 분리하는 변경이 필요하다. 접근성 확장 시 `aria-label`, `role`, 키보드 포커스 등은 primitives와 ScreenLayout·ReviewLayout 단에서 일괄 점검하는 것이 효율적이다. 이는 추측이며, 실제 요구가 들어오면 적용 범위를 재검토해야 한다.

---

## 2. 확장 압력

### 2.1 새 설문 타입 추가

EQ-5D-5L·EQ-VAS 외 설문이 추가되면 다음이 영향을 받는다. 라우트 테이블(`docs/plan-ref-extended.md` 및 `src/app/routes.tsx`)에 경로와 컴포넌트가 늘어난다. Select Assessment의 `handleStart`는 현재 `eq5d5l` 우선, 그다음 `eqvas` 분기이므로, 세 번째 이상 설문이 들어오면 "동시 선택 시 진입 순서"를 다시 정의해야 한다. Review 레이아웃은 `ReviewLayout`을 재사용할 수 있으나, 설문별 안내 문구와 카드 구성이 다르므로 각 설문 feature에서 children만 주입하는 패턴을 유지하면 된다. 이는 현재 EQ-5D-5L Review·EQ-VAS Review가 이미 그렇게 구현되어 있어서, 동일 패턴 확장으로 볼 수 있다.

### 2.2 API·서버 연동

답변과 점수는 현재 라우트 `location.state`로만 전달한다. 전역 상태(Redux 등)나 서버 세션을 쓰지 않으므로, 새로고침 시 데이터가 사라진다. API 연동 시 "제출 전 임시 저장" 또는 "진행 중 답변 복원"이 요구되면 state 대신 서버 세션·저장소 도입이 필요하다. 그때 라우트에서 state를 읽는 부분과 각 Review·Complete 화면의 props 전달 경로가 변경 대상이 된다. 단정: 현재는 클라이언트 state만 사용한다. 추측: 백엔드가 생기면 제출 API와 연동하면서 state 유지 방식이 재검토될 가능성이 크다.

---

## 3. 패턴화 필요성

### 3.1 설문별 Review 패턴

Review 화면은 `ReviewLayout` 하나로 EQ-5D-5L과 EQ-VAS에서 공통 사용 중이다. 제목·안내 2줄·children(카드)·Footer "Submit Assessment" 구조가 동일하다. 설문이 더 늘어나면 "설문별 Review"가 반복되므로, 이 패턴을 문서로 명시해 두는 것이 유리하다. 예: "새 설문에 Review 단계가 있으면 `ReviewLayout`을 사용하고, introLines과 children만 설문에 맞게 구현한다." 코드 수준에서는 이미 패턴이 적용되어 있으며, 신규 개발자용 문서(docs/work-logs 또는 별도 가이드)에 위와 같은 규칙을 적어 두면 일관성이 유지된다.

### 3.2 Primitives wrapper

Slider·RadioGroup·Button·Card 등은 `src/shared/ui/primitives`에서 Radix(또는 래퍼)만 노출하고, features에서는 직접 `@radix-ui/*`를 쓰지 않도록 하고 있다. 이 원칙은 README와 계획 문서에 이미 있다. 새 UI 컴포넌트를 도입할 때도 "primitives에 wrapper를 두고, 기능 레이어에서는 wrapper만 import한다"는 패턴을 유지할 필요가 있다. 확장 압력이 있는 부분은 "어떤 primitive를 추가할지"이지, 패턴 자체가 깨질 가능성은 낮다.
