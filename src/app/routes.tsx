import {
  Routes,
  Route,
  useNavigate,
  useParams,
  useLocation,
  Navigate,
} from 'react-router-dom'
import { useCallback, useMemo } from 'react'
import type { Eq5d5lAnswers } from '@domains/assessment/types'
import { SelectAssessmentScreen } from '@features/select-assessment/SelectAssessmentScreen'
import { Eq5d5lStepScreen } from '@features/eq5d5l/Eq5d5lStepScreen'
import { Eq5d5lReviewScreen } from '@features/eq5d5l/Eq5d5lReviewScreen'
import { Eq5d5lCompleteScreen } from '@features/eq5d5l/Eq5d5lCompleteScreen'
import { EqVasScreen } from '@features/eqvas/EqVasScreen'
import { EqVasReviewScreen } from '@features/eqvas/EqVasReviewScreen'
import { EqVasCompleteScreen } from '@features/eqvas/EqVasCompleteScreen'

function SelectAssessmentRoute() {
  const navigate = useNavigate()

  const handleStart = useCallback(
    (selectedIds: string[]) => {
      if (selectedIds.includes('eq5d5l')) {
        navigate('/assessment/eq5d5l')
      } else if (selectedIds.includes('eqvas')) {
        navigate('/assessment/eqvas')
      }
    },
    [navigate],
  )

  return <SelectAssessmentScreen onStart={handleStart} />
}

function Eq5d5lStepRoute() {
  const navigate = useNavigate()
  const location = useLocation()
  const { stepIndex: stepIndexParam } = useParams<{ stepIndex: string }>()
  const stepIndex = Math.max(
    0,
    Math.min(parseInt(stepIndexParam ?? '0', 10), 4),
  )
  const answers = useMemo(
    () => (location.state as { answers?: Eq5d5lAnswers })?.answers ?? {},
    [location.state],
  )

  const handleNext = useCallback(
    (nextStepIndex: number, nextAnswers: Eq5d5lAnswers) => {
      navigate(`/assessment/eq5d5l/step/${nextStepIndex}`, {
        state: { answers: nextAnswers },
      })
    },
    [navigate],
  )

  const handleBack = useCallback(() => {
    if (stepIndex === 0) {
      navigate('/')
    } else {
      navigate(`/assessment/eq5d5l/step/${stepIndex - 1}`, {
        state: { answers },
      })
    }
  }, [navigate, stepIndex, answers])

  const handleComplete = useCallback(
    (finalAnswers: Eq5d5lAnswers) => {
      navigate('/assessment/eq5d5l/review', { state: { answers: finalAnswers } })
    },
    [navigate],
  )

  return (
    <Eq5d5lStepScreen
      stepIndex={stepIndex}
      initialAnswers={answers}
      onNext={handleNext}
      onBack={handleBack}
      onComplete={handleComplete}
    />
  )
}

function Eq5d5lReviewRoute() {
  const navigate = useNavigate()
  const location = useLocation()
  const answers = useMemo(
    () => (location.state as { answers?: Eq5d5lAnswers })?.answers ?? {},
    [location.state],
  )

  const handleSubmit = useCallback(() => {
    navigate('/assessment/eq5d5l/complete', { state: { answers } })
  }, [navigate, answers])

  const handleBack = useCallback(() => {
    navigate('/assessment/eq5d5l/step/4', { state: { answers } })
  }, [navigate, answers])

  return (
    <Eq5d5lReviewScreen
      answers={answers}
      onSubmit={handleSubmit}
      onBack={handleBack}
    />
  )
}

function Eq5d5lCompleteRoute() {
  const navigate = useNavigate()
  const location = useLocation()
  const answers = (location.state as { answers?: Eq5d5lAnswers })?.answers ?? {}

  const handleBackToAssessment = useCallback(() => {
    navigate('/')
  }, [navigate])

  return (
    <Eq5d5lCompleteScreen answers={answers} onBackToAssessment={handleBackToAssessment} />
  )
}

function EqVasRoute() {
  const navigate = useNavigate()

  const handleSubmit = useCallback(
    (score: number) => {
      navigate('/assessment/eqvas/review', { state: { score } })
    },
    [navigate],
  )

  const handleBack = useCallback(() => {
    navigate('/')
  }, [navigate])

  return <EqVasScreen onSubmit={handleSubmit} onBack={handleBack} />
}

function EqVasReviewRoute() {
  const navigate = useNavigate()
  const location = useLocation()
  const score = (location.state as { score?: number })?.score ?? 0

  const handleSubmit = useCallback(() => {
    navigate('/assessment/eqvas/complete', { state: { score } })
  }, [navigate, score])

  const handleBack = useCallback(() => {
    navigate('/assessment/eqvas', { state: { score } })
  }, [navigate, score])

  return (
    <EqVasReviewScreen
      score={score}
      onSubmit={handleSubmit}
      onBack={handleBack}
    />
  )
}

function EqVasCompleteRoute() {
  const navigate = useNavigate()
  const location = useLocation()
  const score = (location.state as { score?: number })?.score ?? 0

  const handleBackToAssessment = useCallback(() => {
    navigate('/')
  }, [navigate])

  return (
    <EqVasCompleteScreen
      score={score}
      onBackToAssessment={handleBackToAssessment}
    />
  )
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SelectAssessmentRoute />} />
      <Route
        path="/assessment/eq5d5l"
        element={<Navigate to="/assessment/eq5d5l/step/0" replace />}
      />
      <Route path="/assessment/eq5d5l/step/:stepIndex" element={<Eq5d5lStepRoute />} />
      <Route path="/assessment/eq5d5l/review" element={<Eq5d5lReviewRoute />} />
      <Route path="/assessment/eq5d5l/complete" element={<Eq5d5lCompleteRoute />} />
      <Route path="/assessment/eqvas" element={<EqVasRoute />} />
      <Route path="/assessment/eqvas/review" element={<EqVasReviewRoute />} />
      <Route path="/assessment/eqvas/complete" element={<EqVasCompleteRoute />} />
    </Routes>
  )
}
