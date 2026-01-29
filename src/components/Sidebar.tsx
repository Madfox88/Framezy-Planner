import { FiHome, FiCheckSquare, FiTarget, FiCalendar, FiSettings, FiUser } from 'react-icons/fi'
import type { ReactElement } from 'react'
import logo from '../assets/logo_dark.png'
import '../styles/Sidebar.css'

type AppSection = 'dashboard' | 'tasks' | 'goals' | 'calendar' | 'settings' | 'account'

const icons: Record<AppSection, ReactElement> = {
	dashboard: <FiHome />,
	tasks: <FiCheckSquare />,
	goals: <FiTarget />,
	calendar: <FiCalendar />,
	settings: <FiSettings />,
	account: <FiUser />,
}

type SidebarProps = {
	activeSection: AppSection
	sections: Record<AppSection, string>
	onSelectSection: (section: AppSection) => void
}

const Sidebar = ({ activeSection, sections, onSelectSection }: SidebarProps) => {
	return (
		<aside className="sidebar">
			<div className="sidebar-logo">
				<img src={logo} alt="Framezy Planner" />
			</div>
			<nav className="sidebar-nav">
				{(Object.keys(sections) as AppSection[]).map((section) => (
					<button
						key={section}
						className={`sidebar-item ${activeSection === section ? 'active' : ''}`}
						onClick={() => onSelectSection(section)}
						title={sections[section]}
					>
						<span className="sidebar-icon">{icons[section]}</span>
					</button>
				))}
			</nav>
			<div className="sidebar-footer">
				<span className="sidebar-dot" />
			</div>
		</aside>
	)
}

export default Sidebar
