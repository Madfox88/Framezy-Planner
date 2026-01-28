import '../styles/SettingsPanel.css'

const SettingsPanel = () => {
	return (
		<section className="settings-panel glass">
			<header className="panel-header">
				<h2>Settings</h2>
			</header>
			<div className="settings-grid">
				<div className="settings-card">
					<h3>Notifications</h3>
					<p>Stay on top of reminders and updates.</p>
					<button>Manage</button>
				</div>
				<div className="settings-card">
					<h3>Integrations</h3>
					<p>Connect your favorite tools.</p>
					<button>Connect</button>
				</div>
				<div className="settings-card">
					<h3>Appearance</h3>
					<p>Personalize the way Framezy looks.</p>
					<button>Customize</button>
				</div>
			</div>
		</section>
	)
}

export default SettingsPanel
