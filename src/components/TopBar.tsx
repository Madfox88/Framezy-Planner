import { useMemo, useState } from 'react'
import { FiMoon, FiSun, FiChevronDown, FiPlus } from 'react-icons/fi'
import { useTheme } from '../contexts/ThemeContext'
import { useWorkspace } from '../contexts/WorkspaceContext'
import { useProfile } from '../contexts/ProfileContext'
import UserAvatar from './UserAvatar'
import '../styles/TopBar.css'

type TopBarProps = {
	activeSectionLabel: string
}

const TopBar = ({ activeSectionLabel }: TopBarProps) => {
	const { theme, toggleTheme } = useTheme()
	const { workspaces, activeWorkspaceId, setActiveWorkspace, addWorkspace } = useWorkspace()
	const { profile } = useProfile()
	const [workspaceOpen, setWorkspaceOpen] = useState(false)
	const [profileOpen, setProfileOpen] = useState(false)

	const activeWorkspace = useMemo(
		() => workspaces.find((workspace) => workspace.id === activeWorkspaceId) ?? workspaces[0],
		[workspaces, activeWorkspaceId],
	)

	const dateLabel = useMemo(() => {
		return new Date().toLocaleDateString(undefined, {
			weekday: 'long',
			month: 'long',
			day: 'numeric',
		})
	}, [])

	return (
		<header className="top-bar">
			<div className="top-bar-left">
				<div className="greeting-section">
					<h1 className="greeting-text">
						{activeSectionLabel}
						<span className="user-name"> · {profile.name}</span>
					</h1>
					<p className="date-time">{dateLabel}</p>
				</div>
			</div>
			<div className="top-bar-right">
				<div className="workspace-selector">
					<button
						className="workspace-btn"
						onClick={() => setWorkspaceOpen((open) => !open)}
					>
						<span className="workspace-icon">🏷️</span>
						<span className="workspace-name">{activeWorkspace?.name}</span>
						<FiChevronDown className="dropdown-arrow" />
					</button>
					{workspaceOpen && (
						<div className="workspace-panel">
							{workspaces.map((workspace) => (
								<button
									key={workspace.id}
									className={`workspace-item ${
										activeWorkspace?.id === workspace.id ? 'active' : ''
									}`}
									onClick={() => {
										setActiveWorkspace(workspace.id)
										setWorkspaceOpen(false)
									}}
								>
									{workspace.name}
								</button>
							))}
							<div className="workspace-divider" />
							<button
								className="workspace-item new"
								onClick={() => {
									addWorkspace('New Workspace')
									setWorkspaceOpen(false)
								}}
							>
								<FiPlus /> Create workspace
							</button>
						</div>
					)}
				</div>
				<button className="workspace-btn" onClick={toggleTheme}>
					{theme === 'light' ? <FiMoon /> : <FiSun />}
					<span>{theme === 'light' ? 'Dark' : 'Light'}</span>
				</button>
				<div className="profile-menu-container">
					<button className="profile-btn" onClick={() => setProfileOpen((open) => !open)}>
						<UserAvatar name={profile.name} imageUrl={profile.avatarUrl} size="sm" />
					</button>
					{profileOpen && (
						<div className="profile-menu">
							<div className="profile-header">
								<p className="profile-name">{profile.email}</p>
							</div>
							<button className="profile-item">View profile</button>
							<button className="profile-item">Preferences</button>
							<div className="profile-divider" />
							<button className="profile-item">Sign out</button>
						</div>
					)}
				</div>
			</div>
		</header>
	)
}

export default TopBar
