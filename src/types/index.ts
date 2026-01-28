// Plan types
export type PlanStatus = 'active' | 'archived'

export interface Plan {
	id: string
	workspace_id: string
	title: string
	description: string | null
	status: PlanStatus
	created_by: string
	created_at: string
	updated_at: string
}

export interface Stage {
	id: string
	plan_id: string
	title: string
	position: number
	created_at: string
	updated_at: string
}

// Form types
export interface CreatePlanInput {
	title: string
	description?: string
}
