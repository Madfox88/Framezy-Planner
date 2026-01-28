import { FiCamera, FiMail, FiLock, FiUser } from 'react-icons/fi'
import { useProfile } from '../contexts/ProfileContext'
import UserAvatar from './UserAvatar'
import '../styles/AccountPanel.css'

const AccountPanel = () => {
	const { profile } = useProfile()

	return (
		<section className="account-panel">
			<header className="account-header">
				<h1>Account</h1>
				<p className="account-subtitle">Manage your personal details and security</p>
			</header>
			<div className="account-content">
				<div className="account-section">
					<div className="section-header">
						<FiUser className="section-icon" />
						<h2>Profile</h2>
					</div>
					<div className="section-body">
						<div className="profile-picture-section">
							<div className="profile-picture-container">
								<UserAvatar name={profile.name} imageUrl={profile.avatarUrl} size="lg" />
								<button className="change-picture-btn" type="button">
									<FiCamera />
								</button>
							</div>
							<div className="profile-picture-info">
								<button className="btn-link">Upload new</button>
								<button className="btn-link-danger">Remove</button>
								<p className="profile-picture-hint">Recommended 512×512 PNG</p>
							</div>
						</div>
						<div className="info-row">
							<label>Email</label>
							<div className="info-value">{profile.email}</div>
						</div>
					</div>
				</div>

				<div className="account-section">
					<div className="section-header">
						<FiMail className="section-icon" />
						<h2>Contact</h2>
					</div>
					<div className="section-body">
						<div className="form-group">
							<label>
								<FiUser className="input-icon" /> Full name
							</label>
							<input value={profile.name} readOnly />
						</div>
						<div className="form-group">
							<label>
								<FiMail className="input-icon" /> Email
							</label>
							<input value={profile.email} readOnly />
						</div>
					</div>
				</div>

				<div className="account-section">
					<div className="section-header">
						<FiLock className="section-icon" />
						<h2>Security</h2>
					</div>
					<div className="section-body">
						<div className="form-group">
							<label>Change password</label>
							<div className="input-with-button">
								<input placeholder="New password" type="password" />
								<button>Update</button>
							</div>
						</div>
						<div className="message success">Security settings are up to date.</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default AccountPanel
