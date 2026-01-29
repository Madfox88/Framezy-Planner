import { supabase } from '../lib/supabase'

/**
 * Development-only schema verification
 * Performs lightweight selects on core tables to verify Supabase connection
 */
export async function verifySchema() {
	if (import.meta.env.PROD) {
		return // Never run in production
	}

	console.log('[Schema Verification] Starting...')

	try {
		// Check workspaces table
		const { error: workspacesError } = await supabase
			.from('workspaces')
			.select('id')
			.limit(1)

		if (workspacesError) {
			console.error('[Schema Verification] ❌ workspaces table:', workspacesError.message, workspacesError.code)
		} else {
			console.log('[Schema Verification] ✅ workspaces table accessible')
		}

		// Check plans table
		const { error: plansError } = await supabase
			.from('plans')
			.select('id')
			.limit(1)

		if (plansError) {
			console.error('[Schema Verification] ❌ plans table:', plansError.message, plansError.code)
		} else {
			console.log('[Schema Verification] ✅ plans table accessible')
		}

		// Check stages table
		const { error: stagesError } = await supabase
			.from('stages')
			.select('id')
			.limit(1)

		if (stagesError) {
			console.error('[Schema Verification] ❌ stages table:', stagesError.message, stagesError.code)
		} else {
			console.log('[Schema Verification] ✅ stages table accessible')
		}

		console.log('[Schema Verification] Complete')
	} catch (err) {
		console.error('[Schema Verification] Unexpected error:', err)
	}
}
