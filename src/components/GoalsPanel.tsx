import '../styles/GoalsPanel.css'

const GoalsPanel = () => {
	return (
		<section className="goals-panel glass">
			<header className="panel-header">
				<h2>Goals</h2>
				<button className="panel-action">New Goal</button>
			</header>
			<div className="panel-body">
				<div className="goal-card">
					<h3>Launch Framezy v2</h3>
					<p>Ship the new experience and onboard beta users.</p>
					<div className="goal-progress">
						<div className="goal-progress-bar" style={{ width: '72%' }} />
					</div>
				</div>
				<div className="goal-card">
					<h3>Reach 1k active users</h3>
					<p>Drive engagement with onboarding improvements.</p>
					<div className="goal-progress">
						<div className="goal-progress-bar" style={{ width: '45%' }} />
					</div>
				</div>
			</div>
		</section>
	)
}

export default GoalsPanel
