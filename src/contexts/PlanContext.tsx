import { createContext, useContext, useMemo, useState, useCallback, type ReactNode } from 'react'
import { createPlanWithStages, fetchPlansForWorkspace } from '../lib/dataLayer'
import type { Plan, CreatePlanInput } from '../types'

interface PlanContextValue {
	plans: Plan[]
	loading: boolean
	error: string | null
	createPlan: (input: CreatePlanInput, workspaceId: string, userId: string) => Promise<Plan>
	refreshPlans: (workspaceId: string) => Promise<void>
}

const PlanContext = createContext<PlanContextValue | undefined>(undefined)

export const PlanProvider = ({ children }: { children: ReactNode }) => {
	const [plans, setPlans] = useState<Plan[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const refreshPlans = useCallback(async (workspaceId: string) => {
		try {
			setLoading(true)
			setError(null)
			const fetchedPlans = await fetchPlansForWorkspace(workspaceId)
			setPlans(fetchedPlans)
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to fetch plans')
		} finally {
			setLoading(false)
		}
	}, [])

	const createPlan = useCallback(
		async (input: CreatePlanInput, workspaceId: string, userId: string): Promise<Plan> => {
			try {
				setLoading(true)
				setError(null)
				const newPlan = await createPlanWithStages(workspaceId, userId, input)
				setPlans((prev) => [newPlan, ...prev])
				return newPlan
			} catch (err) {
				const errorMessage = err instanceof Error ? err.message : 'Failed to create plan'
				setError(errorMessage)
				throw err
			} finally {
				setLoading(false)
			}
		},
		[],
	)

	const value = useMemo(
		() => ({ plans, loading, error, createPlan, refreshPlans }),
		[plans, loading, error, createPlan, refreshPlans],
	)

	return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>
}

export const usePlans = () => {
	const context = useContext(PlanContext)
	if (!context) {
		throw new Error('usePlans must be used within PlanProvider')
	}
	return context
}
