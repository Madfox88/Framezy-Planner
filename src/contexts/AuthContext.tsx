import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'

type AuthContextValue = {
	user: User | null
	loading: boolean
	signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		// Get initial session
		const initAuth = async () => {
			try {
				const { data: { user: currentUser } } = await supabase.auth.getUser()
				setUser(currentUser)
				
				if (import.meta.env.DEV && currentUser) {
					console.log('[Auth] User loaded:', currentUser.id)
				}
			} catch (err) {
				console.error('[Auth] Failed to load user:', err)
			} finally {
				setLoading(false)
			}
		}

		initAuth()

		// Listen for auth changes
		const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
			setUser(session?.user ?? null)
			
			if (import.meta.env.DEV) {
				console.log('[Auth] Auth state changed:', session?.user?.id ?? 'signed out')
			}
		})

		return () => {
			subscription.unsubscribe()
		}
	}, [])

	const signOut = async () => {
		await supabase.auth.signOut()
		setUser(null)
	}

	return (
		<AuthContext.Provider value={{ user, loading, signOut }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used within AuthProvider')
	}
	return context
}
