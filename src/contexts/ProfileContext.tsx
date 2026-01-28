import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

type Profile = {
	name: string
	email: string
	avatarUrl?: string | null
}

type ProfileContextValue = {
	profile: Profile
	setProfile: (profile: Profile) => void
}

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined)

const defaultProfile: Profile = {
	name: 'Mustafa',
	email: 'mustafa@framezy.app',
	avatarUrl: null,
}

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
	const [profile, setProfile] = useState<Profile>(defaultProfile)
	const value = useMemo(() => ({ profile, setProfile }), [profile])

	return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}

export const useProfile = () => {
	const context = useContext(ProfileContext)
	if (!context) {
		throw new Error('useProfile must be used within ProfileProvider')
	}
	return context
}
