import { useEffect } from 'react'
import { useWorkspace } from '../contexts/WorkspaceContext'
import { usePlans } from '../contexts/PlanContext'
import '../styles/PlansList.css'

const PlansList = () => {
	const { activeWorkspace } = useWorkspace()
	const { plans, loading, error, refreshPlans } = usePlans()

	useEffect(() => {
		if (activeWorkspace?.id) {
			refreshPlans(activeWorkspace.id)
		}
	}, [activeWorkspace?.id, refreshPlans])

	// If no active workspace, show neutral state
	if (!activeWorkspace) {
		return (
			<div className="plans-list-container">
				<h2>Plans</h2>
				<div className="plans-empty">
					<p>Select a workspace to view plans.</p>
				</div>
			</div>
		)
	}

	if (loading) {
		return <div className="plans-loading">Loading plans...</div>
	}

	if (error) {
		return <div className="plans-error">Error: {error}</div>
	}

	return (
		<div className="plans-list-container">
			<h2>Plans</h2>
			{plans.length === 0 ? (
				<div className="plans-empty">
					<p>No plans yet. Create one to get started.</p>
				</div>
			) : (
				<div className="plans-grid">
					{plans.map((plan) => (
						<div key={plan.id} className="plan-card glass">
							<div className="plan-card-header">
								<h3>{plan.title}</h3>
								<span className={`plan-status ${plan.status}`}>{plan.status}</span>
							</div>
							{plan.description && <p className="plan-description">{plan.description}</p>}
							<div className="plan-meta">
								<span className="plan-date">
									Created {new Date(plan.created_at).toLocaleDateString()}
								</span>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default PlansList
