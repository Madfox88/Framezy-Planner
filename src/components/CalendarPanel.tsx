import '../styles/CalendarPanel.css'

const CalendarPanel = () => {
	return (
		<section className="calendar-panel glass">
			<header className="panel-header">
				<h2>Calendar</h2>
				<button className="panel-action">New Event</button>
			</header>
			<div className="calendar-grid">
				{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
					<div className="calendar-day" key={day}>
						<h4>{day}</h4>
						<p>Focus block</p>
					</div>
				))}
			</div>
		</section>
	)
}

export default CalendarPanel
