# ref 이미지 분석

ref 폴더에 있는 5개 이미지를 화면·플로우·요소별로 정리한 분석 문서입니다.

---

## 1. ref 목록 및 역할

| 이미지 | 화면 | 역할 |
|--------|------|------|
| `select_assessment.png` | 평가 선택 | 진입: 사용자 카드, 평가 카드(EQ-5D-5L, EQ-VAS), Start Selected Assessment (N) |
| `EQ-5D-5L_mobility.png` | EQ-5D-5L Step 1/5 | 5단계 설문 중 1차원(Mobility), 라디오 5개, Next |
| `EQ-5D-5L_review_and_submit.png` | **EQ-5D-5L 리뷰·제출** | 5차원 답변 요약 카드 5장, Submit Assessment |
| `EQ-VAS.png` | **EQ-VAS 설문** | 단일 스텝, 0–100 슬라이더, Submit |
| `EQ-VAS_review_and_submit.png` | **EQ-VAS 리뷰·제출** | EQ-VAS 점수(66) 카드 1장, Submit Assessment |

---

## 2. 기존 ref (이미 구현 반영)

### 2.1 select_assessment.png
- **제목**: Select Assessment
- **구성**: 안내문, 사용자 카드(이름·생년월일·성별·ID), 평가 카드 리스트(EQ-5D-5L, EQ-VAS), CTA "Start Selected Assessment (N)"
- **현재 구현**: `SelectAssessmentScreen`, `AssessmentCard`, `useSelectAssessment` (EQ-5D-5L만 Start 시 이동)

### 2.2 EQ-5D-5L_mobility.png
- **제목**: EQ-5D-5L, Step 1 of 5
- **구성**: 뒤로가기, 진행바, 안내문, 차원 제목(Mobility), 5개 라디오, Next
- **현재 구현**: `Eq5d5lStepScreen`, `Eq5d5lProgress`, Step 1~5 후 완료 화면

---

## 3. 새로 추가된 ref 상세

### 3.1 EQ-5D-5L_review_and_submit.png

**화면명**: Review and Submit (EQ-5D-5L)

| 영역 | 내용 |
|------|------|
| **Header** | 뒤로가기(←), 제목 "Review and Submit" |
| **안내문** | "Please review your answers and submit." / "You have completed the EQ-5D-5L assessment." |
| **본문** | **5개 요약 카드** (차원별) |
| | 1. **Mobility** (파란 강조): 아이콘(걷는 사람), "I have **no** problems in walking about" |
| | 2. **Self-Care** (초록): 아이콘(욕조), "I have **slight** problems washing or dressing myself" |
| | 3. **Usual Activities** (주황): 아이콘(집), "I have **moderate** problems doing my usual activities" |
| | 4. **Pain / Discomfort** (빨강): 아이콘(캡슐), "I have **severe** pain or discomfort" |
| | 5. **Anxiety / Depression** (보라): 아이콘(슬픈 이모지), "I am **extremely** anxious or depressed" |
| **Footer** | 풀폭 버튼 "Submit Assessment" |

**특징**
- 차원별 **아이콘·색상**이 다름 (Mobility 파랑, Self-care 초록 등).
- 각 카드는 **선택한 문장**을 보여주고, 심각도 키워드(no, slight, moderate, severe, extremely)가 **색으로 강조**됨.
- 현재 구현의 `Eq5d5lCompleteScreen`은 "Thank you. Your responses have been recorded." + Summary 리스트 형태이므로, 이 ref는 **제출 전 최종 확인(Review and Submit)** 단계로, 완료 화면과는 다른 단계로 볼 수 있음.

---

### 3.2 EQ-VAS.png

**화면명**: EQ-VAS (단일 스텝)

| 영역 | 내용 |
|------|------|
| **Header** | 뒤로가기, 제목 "EQ-VAS", 진행 "Step 1 of 1" (파란 진행바) |
| **안내문** | "We would like to know how good or bad your health is TODAY." / "Please indicate on the scale how your health is today." |
| **입력** | **가로 슬라이더** 0–100 |
| | 트랙: 그라데이션 (빨강 → 보라 → 파랑, 나쁨→좋음) |
| | 눈금(틱), 슬라이더 thumb(파란 원), 선택값 **66** 툴팁 표시 |
| **범례** | "100 = Best health you can imagine" / "0 = Worst health you can imagine" |
| **Footer** | 버튼 "Submit" |

**특징**
- EQ-5D-5L과 달리 **1스텝만** 있고, **슬라이더**로 0–100 점수 입력.
- 현재 앱에는 EQ-VAS 설문 화면이 없고, Select Assessment에서 EQ-VAS만 선택 시 "EQ-VAS survey is not available yet" 안내만 있음 → **신규 화면**으로 구현 대상.

---

### 3.3 EQ-VAS_review_and_submit.png

**화면명**: Review and Submit (EQ-VAS)

| 영역 | 내용 |
|------|------|
| **Header** | 뒤로가기, 제목 "Review and Submit" |
| **안내문** | "Please review your answers and submit." / "You have completed the EQ-VAS assessment." |
| **본문** | **카드 1개**: EQ-VAS 아이콘(막대그래프), "EQ-VAS", **점수 "66"** 표시 |
| **Footer** | 풀폭 버튼 "Submit Assessment" |

**특징**
- EQ-VAS는 답변이 **숫자 1개(0–100)**이므로, 리뷰 화면도 카드 1장에 **점수만** 노출.
- EQ-5D-5L 리뷰와 동일한 레이아웃(제목·안내·카드·Submit)을 공유 가능.

---

## 4. 플로우 정리

```
[Select Assessment]  ← 기존 구현
    ├─ EQ-5D-5L 선택 → Start → [EQ-5D-5L Step 1] → … → [Step 5] → [완료]  ← 기존
    │                        (ref 추가)                    → [Review and Submit] → Submit Assessment
    │
    └─ EQ-VAS 선택   → Start → [EQ-VAS] (Step 1 of 1, 슬라이더) → Submit  ← 신규
                                    → [EQ-VAS Review and Submit] (점수 66) → Submit Assessment  ← 신규
```

- **EQ-5D-5L**: Step 5 다음에 **Review and Submit** 단계를 넣으면 ref와 맞음. (현재는 완료 메시지 화면만 있음.)
- **EQ-VAS**: **설문 1스텝(EQ-VAS.png)** + **리뷰·제출(EQ-VAS_review_and_submit.png)** 둘 다 신규 구현 대상.

---

## 5. 구현 관점 요약

| 구분 | 기존 구현 | ref 반영 시 추가·변경 |
|------|-----------|------------------------|
| **Select Assessment** | ✅ | 변경 없음 |
| **EQ-5D-5L Step 1~5** | ✅ | 변경 없음 |
| **EQ-5D-5L 완료 후** | 완료 메시지 + Summary | **Review and Submit** 화면 추가(5개 차원 카드, 키워드 강조, Submit Assessment) |
| **EQ-VAS 설문** | 없음 | **EQ-VAS 화면** 추가(Step 1 of 1, 0–100 슬라이더, Submit) |
| **EQ-VAS 완료 후** | 없음 | **EQ-VAS Review and Submit** 추가(점수 카드 1장, Submit Assessment) |

---

## 6. 공통 UI 패턴

- **Review and Submit**: 제목·안내 2줄·카드 영역·풀폭 "Submit Assessment" → EQ-5D-5L과 EQ-VAS가 같은 레이아웃 패턴 사용 가능.
- **진행**: EQ-5D-5L은 "Step X of 5", EQ-VAS는 "Step 1 of 1".
- **뒤로가기**: 모든 화면 공통.

이 문서는 ref 이미지 분석만 다루며, 구현 우선순위나 Phase 구분은 별도 계획에서 정하면 됩니다.
