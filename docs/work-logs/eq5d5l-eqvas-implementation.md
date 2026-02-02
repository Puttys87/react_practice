# EQ-5D-5L Review·EQ-VAS 설문·Select 연동 구현 (Phase 0~6)

ref 이미지 기반으로 EQ-5D-5L Review and Submit, EQ-VAS 설문·리뷰·완료, Select Assessment 연동을 구현한 과정에서의 기술적 의사결정을 기록한다. 작업 배경, 설계 결정, 트레이드오프, 변경 위험를 구분하여 서술한다. 단정(확정된 사실·결정)과 추측(가능성·가정)을 구분하고, 기술적 판단에는 근거를 명시한다.

---

## 1. 작업 배경

ref 폴더의 이미지(select_assessment, EQ-5D-5L_mobility, EQ-5D-5L_review_and_submit, EQ-VAS, EQ-VAS_review_and_submit)와 분석 문서(docs/ref-images-analysis.md)에 따라, 다음이 필요하였다. EQ-5D-5L은 Step 5 완료 후 "Review and Submit" 단계를 거친 뒤 최종 완료 화면으로 가야 하며, EQ-VAS는 단일 스텝 슬라이더 설문 후 Review·완료 플로우가 있어야 한다. Select Assessment에서는 EQ-5D-5L과 EQ-VAS 중 하나 이상 선택 시 Start가 활성화되고, 동시 선택 시 어느 설문을 먼저 진행할지 정책이 필요하였다. 이 배경은 재구성된 개발 계획(Phase 0~6)에서 사전 결정으로 정리되었고, docs/plan-ref-extended.md에 라우트·Slider·타입·Review 공통화가 기록되어 있다.

---

## 2. 설계 결정

### 2.1 라우트 구조

EQ-5D-5L에 `/assessment/eq5d5l/review`를 추가하였다. Step 5에서 "Complete" 클릭 시 기존처럼 바로 complete가 아니라 review로 이동하도록 하였다. 이유는 ref에서 "Review and Submit"이 제출 전 최종 확인 단계로 명확히 구분되어 있기 때문이다. EQ-VAS는 `/assessment/eqvas`, `/assessment/eqvas/review`, `/assessment/eqvas/complete` 세 경로를 두었다. 설문·리뷰·완료가 각각 한 화면씩 대응되며, EQ-5D-5L과 동일한 플로우 패턴을 유지할 수 있다. 이 구조는 plan-ref-extended.md의 라우트 표와 일치하도록 확정하였다.

### 2.2 동시 선택 시 eq5d5l 우선

Select에서 EQ-5D-5L과 EQ-VAS를 둘 다 선택한 상태에서 Start를 누르면 EQ-5D-5L 플로우만 진입하도록 하였다. 근거는 재구성 계획에서 "동시 선택 정책"으로 EQ-5D-5L을 먼저 진행하기로 한 사전 결정이다. 한 번에 두 설문을 연속 진행하지 않고, EQ-5D-5L 완료 후 Select로 돌아온 뒤 사용자가 다시 Start를 누르면 그때 EQ-VAS로 이동한다. handleStart는 `selectedIds.includes('eq5d5l')`이면 `/assessment/eq5d5l`, 아니면 `eqvas`일 때 `/assessment/eqvas`로 분기하도록 구현하였다.

### 2.3 Review 공통 레이아웃 (ReviewLayout)

"Review and Submit" 제목, 안내 2줄(prop), children(카드 영역), Footer "Submit Assessment"를 공통으로 쓰기 위해 `ReviewLayout` 컴포넌트를 두었다. EQ-5D-5L Review와 EQ-VAS Review에서 introLines과 children만 다르게 주입하여 재사용한다. 근거는 plan-ref-extended.md의 "Review 공통화" 항목과, 두 화면이 동일한 레이아웃 패턴을 갖는다는 ref 분석 결과이다. 기존 `ScreenLayout`을 활용하여 제목·뒤로가기·footer 영역을 일관되게 유지하였다.

### 2.4 Slider (Radix wrapper)

EQ-VAS 점수 입력에 0~100 슬라이더가 필요하므로 `@radix-ui/react-slider`를 사용하기로 하였다. 앱·기능 레이어에서는 Radix를 직접 쓰지 않고 `src/shared/ui/primitives/Slider` 래퍼만 사용하도록 하였다. 이는 README와 계획에 있던 "primitives wrapper만 노출" 원칙을 따른 것이다. value, onValueChange, min, max, step, a11y·테마 토큰만 노출하고, 구현 세부는 래퍼 내부에 두었다.

### 2.5 EqVasScore·차원 accent 토큰

EQ-VAS 점수는 0~100 정수이므로 도메인 타입 `EqVasScore`를 number로 두었다. EQ-5D-5L 리뷰 카드에서는 차원별 색상을 구분하기 위해 CSS 변수명을 상수로 매핑하였다(mobility→blue, selfCare→green 등). 실제 색상 값은 theme.css에 `--color-dimension-mobility` 등으로 정의하고, 카드 컴포넌트는 상수로 참조하는 변수명만 사용한다. 이렇게 하면 테마 변경 시 한 곳만 수정하면 되며, 도메인 상수는 "어떤 토큰을 쓸지"만 알고 값은 스타일 레이어에 맡긴다.

### 2.6 useEqVas 초기값 없음

EQ-VAS 슬라이더는 "사용자가 반드시 한 번이라도 값을 선택해야 Submit 가능"하도록 하였다. 즉 초기값을 두지 않고, value가 undefined일 때는 canSubmit을 false로 두었다. 근거는 ref 분석에서 "선택 필수"로 해석한 것과, Phase 4 계획에서 "초기값 없음(canSubmit = value !== undefined)"을 선택한 것이다. Slider에 표시할 숫자는 value ?? 0으로 넘기되, 내부 상태는 사용자가 슬라이더를 움직이기 전까지 undefined로 두어 "선택하지 않음"과 "0을 선택함"을 구분하였다.

---

## 3. 트레이드오프

### 3.1 Review·Complete로의 state 전달

답변(answers)과 EQ-VAS 점수(score)는 React Router의 `location.state`로만 전달하였다. 전역 상태(Redux, Context 등)나 세션 스토리지를 쓰지 않았다. 이유는 MVP 범위에서 클라이언트 내 플로우만으로 충분하고, 상태 관리 복잡도를 낮추기 위함이다. 대신 새로고침이나 직접 URL 입력 시 state가 비어 있어 빈 요약 또는 Submit 비활성이 발생할 수 있다. 이 트레이드오프는 extension_note.md의 "변경 가능성"에서 다루며, API·서버 연동 시 state 대신 서버 세션 도입을 검토할 수 있다고 기록하였다.

### 3.2 EQ-VAS 초기값 없음 vs 기본값

"초기값 없음"을 선택한 것은 위 2.6과 같다. "기본값 50" 등을 두면 사용자가 슬라이더를 건드리지 않아도 Submit이 가능해져 입력 생략이 늘어날 수 있다. 의료·QoL 설문에서는 "의도적인 선택"을 유도하는 쪽을 우선한 것이다. 다만 요구사항이 "기본값 50으로 두고 수정 가능"으로 바뀌면 useEqVas에 initialValue와 canSubmit 조건을 바꾸면 된다.

### 3.3 useCallback 의존성에 answers 포함

Eq5d5lStepRoute·Eq5d5lReviewRoute에서 answers를 location.state에서 꺼낸 뒤, handleBack·handleSubmit 등 useCallback의 의존성 배열에 answers를 넣었다. answers가 매 렌더마다 새 객체 참조가 될 수 있어(예: `?? {}`), 초기에는 useMemo로 answers를 고정하고 그 결과를 useCallback 의존성에 넣어 불필요한 콜백 재생성을 줄였다. 트레이드오프는 "라우트 컴포넌트에서 useMemo 한 번 더 사용"으로 가독성을 조금 희생하고, 린트 경고와 불필요한 자식 리렌더를 줄인 것이다.

---

## 4. 변경 위험

### 4.1 review·complete 직접 URL 진입

`/assessment/eq5d5l/review`, `/assessment/eqvas/review`, `/assessment/eqvas/complete`에 state 없이 직접 진입하면 answers·score가 비어 있다. 현재는 빈 객체·0으로 fallback하여 화면이 깨지지 않도록만 하였고, 리다이렉트나 "데이터 없음" 전용 UI는 두지 않았다. 향후 이 경로들을 외부에 노출하거나, 북마크·새로고침 대응이 중요해지면 "state 없을 때 `/`로 리다이렉트" 또는 "진입 불가 안내"를 도입할 때 라우트 또는 각 화면에서 처리 위치를 정해야 한다.

### 4.2 useCallback·useMemo 의존성

answers를 useMemo로 감싼 뒤 useCallback 의존성에 넣었으나, location.state가 바뀌지 않아도 상위 리렌더로 인해 참조가 바뀔 수 있는 경우는 여전히 있다. 복잡한 라우트 state나 여러 화면에서 동일 state를 수정하는 구조로 확장할 때는 의존성으로 인한 리렌더·effect 재실행을 다시 점검하는 것이 좋다.

### 4.3 E2E·단위 테스트의 슬라이더·다중 요소

EQ-VAS 화면 단위 테스트에서 Slider는 Radix 구조상 role="slider"가 thumb에 붙고, aria-label은 Root에 있어 테스트에서 name으로 slider를 찾지 못할 수 있다. 이에 getByRole('slider')만 사용하도록 조정하였다. E2E에서 "Step 1 of 5" 등이 화면에 두 곳(헤더·진행 바)에 있어 getByText가 두 요소를 반환하면 strict mode 위반이 나므로, .first()로 한 요소만 선택하도록 했다. 라우트나 레이아웃이 바뀌어 동일 텍스트가 더 늘어나면 셀렉터를 다시 확인해야 한다.
