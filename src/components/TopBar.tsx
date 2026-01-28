import { useMemo, useState, useEffect, useRef } from 'react'
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
	const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
	const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = useState(false)
	
	const headerRef = useRef<HTMLElement>(null)
	const workspaceBtnRef = useRef<HTMLButtonElement>(null)
	const profileBtnRef = useRef<HTMLButtonElement>(null)

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

	const timeLabel = useMemo(() => {
		return new Date().toLocaleTimeString(undefined, {
			hour: '2-digit',
			minute: '2-digit',
			hour12: true,
		})
	}, [])

	const greeting = useMemo(() => {
		const hour = new Date().getHours()
		let timeGreeting = 'Good morning'
		
		if (hour >= 12 && hour < 17) {
			timeGreeting = 'Good afternoon'
		} else if (hour >= 17 && hour < 21) {
			timeGreeting = 'Good evening'
		} else if (hour >= 21 || hour < 5) {
			timeGreeting = 'Good night'
		}
		
		return timeGreeting
	}, [])

	// Close dropdowns on ESC and outside click
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setIsProfileMenuOpen(false)
				setIsWorkspaceMenuOpen(false)
			}
		}

		const handleOutsideClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement
			const isInsideHeader = headerRef.current?.contains(target)
			const isDropdownClick = target.closest('.workspace-panel') || target.closest('.profile-menu')
			const isTriggerClick = target.closest('.workspace-btn') || target.closest('.profile-btn')
			
			if (!isInsideHeader || (!isDropdownClick && !isTriggerClick)) {
				setIsProfileMenuOpen(false)
				setIsWorkspaceMenuOpen(false)
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		document.addEventListener('mousedown', handleOutsideClick)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
			document.removeEventListener('mousedown', handleOutsideClick)
		}
	}, [])

	const handleProfileClick = () => {
		setIsProfileMenuOpen((prev) => !prev)
		setIsWorkspaceMenuOpen(false)
	}

	const handleWorkspaceClick = () => {
		setIsWorkspaceMenuOpen((prev) => !prev)
		setIsProfileMenuOpen(false)
	}

	// Calculate dropdown positions
	const workspaceMenuStyle: React.CSSProperties = workspaceBtnRef.current
		? {
				left: workspaceBtnRef.current.getBoundingClientRect().left,
		  }
		: {}

	const profileMenuStyle: React.CSSProperties = profileBtnRef.current
		? {
				right: window.innerWidth - profileBtnRef.current.getBoundingClientRect().right,
		  }
		: {}

	return (
		<header className="top-bar" ref={headerRef}>
			<div className="top-bar-left">
				<div className="greeting-section">
					<h1 className="greeting-text">
						{greeting}, <span className="greeting-name">{profile.name}</span>
					</h1>
					<p className="date-time">{dateLabel} · {timeLabel}</p>
				</div>
			</div>
			<div className="top-bar-right">
				<div className="workspace-selector">
					<button
						ref={workspaceBtnRef}
						className="workspace-btn"
						onClick={handleWorkspaceClick}
						aria-expanded={isWorkspaceMenuOpen}
						aria-label="Toggle workspace menu"
					>
						<span className="workspace-icon">🏷️</span>
						<span className="workspace-name">{activeWorkspace?.name}</span>
						<FiChevronDown className="dropdown-arrow" />
					</button>
					{isWorkspaceMenuOpen && (
						<div className="workspace-panel" style={workspaceMenuStyle}>
							{workspaces.map((workspace) => (
								<div key={workspace.id} className="workspace-item-wrapper">
									<button
										className={`workspace-item ${
											activeWorkspace?.id === workspace.id ? 'active' : ''
										}`}
										onClick={() => {
											setActiveWorkspace(workspace.id)
											setIsWorkspaceMenuOpen(false)
										}}
									>
										{workspace.name}
									</button>
									<button className="workspace-delete-btn">×</button>
								</div>
							))}
							<div className="workspace-divider" />
							<button
								className="workspace-item new"
								onClick={() => {
									addWorkspace('New Workspace')
									setIsWorkspaceMenuOpen(false)
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
					<button
						ref={profileBtnRef}
						className="profile-btn"
						onClick={handleProfileClick}
						aria-expanded={isProfileMenuOpen}
						aria-label="Toggle profile menu"
					>
						<UserAvatar name={profile.name} imageUrl={profile.avatarUrl} size="sm" />
					</button>
					{isProfileMenuOpen && (
						<div className="profile-menu" style={profileMenuStyle}>
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
