import '../styles/TasksPanel.css'

const TasksPanel = () => {
	return (
		<section className="tasks-panel glass">
			<header className="panel-header">
				<h2>Tasks</h2>
				<button className="panel-action">New Task</button>
			</header>
			<div className="panel-body">
				<div className="task-card">
					<h3>Design sprint backlog</h3>
					<p>Finalize the sprint backlog and share with the team.</p>
					<span className="task-chip">Due today</span>
				</div>
				<div className="task-card">
					<h3>Plan stakeholder review</h3>
					<p>Prepare agenda and metrics for the review.</p>
					<span className="task-chip">Tomorrow</span>
				</div>
				<div className="task-card">
					<h3>Capture customer notes</h3>
					<p>Summarize feedback from interviews.</p>
					<span className="task-chip">This week</span>
				</div>
			</div>
		</section>
	)
}

export default TasksPanel
