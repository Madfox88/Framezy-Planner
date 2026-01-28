import { useState } from 'react'
import { usePlans } from '../contexts/PlanContext'
import { useWorkspace } from '../contexts/WorkspaceContext'
import { supabase } from '../lib/supabase'
import type { CreatePlanInput } from '../types'
import '../styles/CreatePlanModal.css'

interface CreatePlanModalProps {
	isOpen: boolean
	onClose: () => void
}

export const CreatePlanModal = ({ isOpen, onClose }: CreatePlanModalProps) => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const { createPlan } = usePlans()
	const { activeWorkspaceId } = useWorkspace()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError(null)

		if (!title.trim()) {
			setError('Plan title is required')
			return
		}

		try {
			setIsSubmitting(true)

			// Get current user
			const { data: authData, error: authError } = await supabase.auth.getUser()
			if (authError || !authData.user) {
				throw new Error('Unable to get current user')
			}

			const input: CreatePlanInput = {
				title: title.trim(),
				description: description.trim() || undefined,
			}

			await createPlan(input, activeWorkspaceId, authData.user.id)

			// Reset form and close
			setTitle('')
			setDescription('')
			onClose()
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to create plan')
		} finally {
			setIsSubmitting(false)
		}
	}

	if (!isOpen) return null

	return (
		<div className="create-plan-modal-overlay" onClick={onClose}>
			<div className="create-plan-modal-content" onClick={(e) => e.stopPropagation()}>
				<div className="create-plan-modal-header">
					<h2>Create New Plan</h2>
					<button className="create-plan-modal-close" onClick={onClose}>
						×
					</button>
				</div>

				<form onSubmit={handleSubmit} className="create-plan-modal-form">
					<div className="create-plan-form-group">
						<label htmlFor="plan-title">Plan Title *</label>
						<input
							id="plan-title"
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="e.g., Website Redesign, Launch Campaign"
							disabled={isSubmitting}
							autoFocus
						/>
					</div>

					<div className="create-plan-form-group">
						<label htmlFor="plan-description">Description (Optional)</label>
						<textarea
							id="plan-description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Add context or goals for this plan..."
							disabled={isSubmitting}
							rows={4}
						/>
					</div>

					{error && <div className="create-plan-form-error">{error}</div>}

					<div className="create-plan-form-actions">
						<button
							type="button"
							className="create-plan-form-button-cancel"
							onClick={onClose}
							disabled={isSubmitting}
						>
							Cancel
						</button>
						<button
							type="submit"
							className="create-plan-form-button-submit"
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Creating...' : 'Create Plan'}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
