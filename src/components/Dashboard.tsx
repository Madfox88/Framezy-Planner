import { useState } from 'react'
import { CreatePlanModal } from './CreatePlanModal'
import '../styles/DashboardNew.css'

const Dashboard = () => {
	const [isCreatePlanOpen, setIsCreatePlanOpen] = useState(false)

	return (
		<>
			<div className="dashboard">
				<section className="dashboard-grid">
					<div className="stat-card glass">
						<h3>Active Plans</h3>
						<button 
							className="stat-card-button"
							onClick={() => setIsCreatePlanOpen(true)}
							title="Create a new plan"
						>
							+ New Plan
						</button>
					</div>
					<div className="stat-card glass">
						<h3>Tasks due</h3>
						<div className="stat-value">8</div>
						<p className="stat-label">Today</p>
					</div>
					<div className="stat-card glass">
						<h3>Focus time</h3>
						<div className="stat-value">4h</div>
						<p className="stat-label">Scheduled</p>
					</div>
					<div className="stat-card glass">
						<h3>Goals</h3>
						<div className="stat-value">63%</div>
						<p className="stat-label">On track</p>
					</div>
				</section>

				<section className="dashboard-grid-sections">
				<div className="dashboard-section glass">
					<h2>Today’s Schedule</h2>
					<div className="today-schedule">
						<div className="schedule-item">
							<p>09:30 · Deep work block</p>
							<span>2h</span>
						</div>
						<div className="schedule-item">
							<p>12:30 · Team sync</p>
							<span>30m</span>
						</div>
						<div className="schedule-item">
							<p>15:00 · Creative sprint</p>
							<span>90m</span>
						</div>
					</div>
				</div>

				<div className="dashboard-section glass">
					<h2>Priority Tasks</h2>
					<div className="task-list">
						<div className="task-summary priority-high">
							<div className="task-summary-content">
								<p className="task-summary-title">Finalize client proposal</p>
								<span className="task-summary-date">Due today</span>
							</div>
							<span className="badge priority-high">High</span>
						</div>
						<div className="task-summary priority-medium">
							<div className="task-summary-content">
								<p className="task-summary-title">Prepare quarterly roadmap</p>
								<span className="task-summary-date">Due tomorrow</span>
							</div>
							<span className="badge priority-medium">Medium</span>
						</div>
						<div className="task-summary priority-low">
							<div className="task-summary-content">
								<p className="task-summary-title">Review design tokens</p>
								<span className="task-summary-date">Due Friday</span>
							</div>
							<span className="badge priority-low">Low</span>
						</div>
					</div>
				</div>

				<div className="dashboard-section glass">
					<h2>Active Goals</h2>
					<div className="goals-list">
						<div className="goal-summary">
							<div className="goal-summary-content">
								<p className="goal-summary-title">Launch Framezy v2</p>
								<span className="goal-progress-badge">72%</span>
							</div>
							<div className="progress-bar-small">
								<div className="progress-fill-small" style={{ width: '72%' }} />
							</div>
						</div>
						<div className="goal-summary">
							<div className="goal-summary-content">
								<p className="goal-summary-title">Write product story</p>
								<span className="goal-progress-badge">45%</span>
							</div>
							<div className="progress-bar-small">
								<div className="progress-fill-small" style={{ width: '45%' }} />
							</div>
						</div>
					</div>
				</div>
			</section>

			<CreatePlanModal isOpen={isCreatePlanOpen} onClose={() => setIsCreatePlanOpen(false)} />
		</>
	)
}

export default Dashboard
