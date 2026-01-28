import { supabase } from './supabase'
import type { Plan, Stage, CreatePlanInput } from '../types'

/**
 * Create a new Plan with default Stages
 *
 * Steps:
 * 1. Insert Plan into plans table
 * 2. Automatically create 4 default Stages (Backlog, In Progress, Review, Done)
 * 3. Return the created Plan
 *
 * RLS is enforced automatically by Supabase based on workspace membership
 */
export async function createPlanWithStages(
	workspaceId: string,
	userId: string,
	input: CreatePlanInput,
): Promise<Plan> {
	// 1. Insert the Plan
	const { data: planData, error: planError } = await supabase
		.from('plans')
		.insert({
			workspace_id: workspaceId,
			title: input.title,
			description: input.description || null,
			status: 'active',
			created_by: userId,
		})
		.select()
		.single()

	if (planError || !planData) {
		throw new Error(`Failed to create plan: ${planError?.message}`)
	}

	// 2. Create default Stages
	const defaultStages = [
		{ title: 'Backlog', position: 1 },
		{ title: 'In Progress', position: 2 },
		{ title: 'Review', position: 3 },
		{ title: 'Done', position: 4 },
	]

	const stagesToInsert = defaultStages.map((stage) => ({
		plan_id: planData.id,
		title: stage.title,
		position: stage.position,
	}))

	const { error: stagesError } = await supabase
		.from('stages')
		.insert(stagesToInsert)

	if (stagesError) {
		// Clean up the plan if stage creation fails
		await supabase.from('plans').delete().eq('id', planData.id)
		throw new Error(`Failed to create default stages: ${stagesError.message}`)
	}

	return planData as Plan
}

/**
 * Fetch all Plans for a specific workspace
 */
export async function fetchPlansForWorkspace(workspaceId: string): Promise<Plan[]> {
	const { data, error } = await supabase
		.from('plans')
		.select('*')
		.eq('workspace_id', workspaceId)
		.eq('status', 'active')
		.order('created_at', { ascending: false })

	if (error) {
		throw new Error(`Failed to fetch plans: ${error.message}`)
	}

	return data as Plan[]
}

/**
 * Fetch all Stages for a specific Plan
 */
export async function fetchStagesForPlan(planId: string): Promise<Stage[]> {
	const { data, error } = await supabase
		.from('stages')
		.select('*')
		.eq('plan_id', planId)
		.order('position', { ascending: true })

	if (error) {
		throw new Error(`Failed to fetch stages: ${error.message}`)
	}

	return data as Stage[]
}
