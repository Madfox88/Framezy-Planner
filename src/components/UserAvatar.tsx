import '../styles/TopBar.css'

type UserAvatarProps = {
	name: string
	imageUrl?: string | null
	size?: 'sm' | 'md' | 'lg'
}

const gradientClasses = ['avatar-blue', 'avatar-purple', 'avatar-pink', 'avatar-green', 'avatar-orange', 'avatar-red']

const UserAvatar = ({ name, imageUrl, size = 'md' }: UserAvatarProps) => {
	const initial = name.trim().charAt(0).toUpperCase()
	const gradientClass = gradientClasses[name.length % gradientClasses.length]

	return (
		<span
			className={`user-avatar user-avatar-${size} ${imageUrl ? 'has-image' : gradientClass}`}
		>
			{imageUrl ? <img className="avatar-image" src={imageUrl} alt={name} /> : initial}
		</span>
	)
}

export default UserAvatar
