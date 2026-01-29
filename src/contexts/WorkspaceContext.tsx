import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { supabase } from '../lib/supabase'

type Workspace = {
	id: string
	name: string
}

type WorkspaceContextValue = {
	workspaces: Workspace[]
	activeWorkspace: Workspace | null
	activeWorkspaceId: string | null
	setActiveWorkspace: (id: string) => void
	addWorkspace: (name: string) => Promise<void>
	refreshWorkspaces: () => Promise<void>
	loading: boolean
}

const WorkspaceContext = createContext<WorkspaceContextValue | undefined>(undefined)

const ACTIVE_WORKSPACE_KEY = 'framezy_active_workspace'

export const WorkspaceProvider = ({ children, userId }: { children: ReactNode; userId: string | null }) => {
	const [workspaces, setWorkspaces] = useState<Workspace[]>([])
	const [activeWorkspaceId, setActiveWorkspaceId] = useState<string | null>(null)
	const [loading, setLoading] = useState(true)

	const activeWorkspace = useMemo(
		() => workspaces.find((ws) => ws.id === activeWorkspaceId) ?? null,
		[workspaces, activeWorkspaceId],
	)

	// Get localStorage key scoped by user
	const getStorageKey = (uid: string) => `${ACTIVE_WORKSPACE_KEY}_${uid}`

	// Load workspaces for user
	const refreshWorkspaces = async () => {
		if (!userId) {
			setWorkspaces([])
			setActiveWorkspaceId(null)
			setLoading(false)
			return
		}

		try {
			setLoading(true)
			
			// Fetch workspaces where user is a member
			const { data, error } = await supabase
				.from('workspaces')
				.select('id, name')
				.order('created_at', { ascending: true })

			if (error) {
				console.error('[WorkspaceContext] Failed to load workspaces:', error.message)
				setWorkspaces([])
				return
			}

			const fetchedWorkspaces = data || []

			// If no workspaces exist, create a default one
			if (fetchedWorkspaces.length === 0) {
				const { data: { user } } = await supabase.auth.getUser()
				const defaultName = user?.email?.split('@')[0] || 'My Workspace'
				
				// Step 1: Create workspace
				const { data: newWorkspace, error: createError } = await supabase
					.from('workspaces')
					.insert({ name: defaultName, owner_id: userId })
					.select()
					.single()

				if (createError || !newWorkspace) {
					console.error('[WorkspaceContext] Failed to create default workspace:', createError?.message)
					setWorkspaces([])
					return
				}

				// Step 2: Add user as workspace member
				const { error: memberError } = await supabase
					.from('workspace_members')
					.insert({ workspace_id: newWorkspace.id, user_id: userId })

				if (memberError) {
					console.error('[WorkspaceContext] Failed to add user to workspace:', memberError.message)
					// Clean up workspace if member insert fails
					await supabase.from('workspaces').delete().eq('id', newWorkspace.id)
					setWorkspaces([])
					return
				}

				setWorkspaces([newWorkspace])
				setActiveWorkspaceId(newWorkspace.id)
				localStorage.setItem(getStorageKey(userId), newWorkspace.id)

				if (import.meta.env.DEV) {
					console.log('[WorkspaceContext] Created default workspace:', newWorkspace.id)
					console.log('[WorkspaceContext] Added user to workspace_members')
					console.log('[WorkspaceContext] Active workspace:', newWorkspace.id)
					console.log('[WorkspaceContext] Total workspaces:', 1)
				}
				return
			}

			setWorkspaces(fetchedWorkspaces)

			// Determine active workspace
			const storedId = localStorage.getItem(getStorageKey(userId))
			const storedWorkspaceExists = fetchedWorkspaces.some(ws => ws.id === storedId)

			let selectedWorkspaceId: string

			if (storedWorkspaceExists) {
				selectedWorkspaceId = storedId!
				setActiveWorkspaceId(storedId)
			} else {
				// Choose most recently created (last in array since ordered by created_at asc)
				const mostRecent = fetchedWorkspaces[fetchedWorkspaces.length - 1]
				selectedWorkspaceId = mostRecent.id
				setActiveWorkspaceId(mostRecent.id)
				localStorage.setItem(getStorageKey(userId), mostRecent.id)
			}

			if (import.meta.env.DEV) {
				console.log('[WorkspaceContext] User ID:', userId)
				console.log('[WorkspaceContext] Active workspace:', selectedWorkspaceId)
				console.log('[WorkspaceContext] Total workspaces:', fetchedWorkspaces.length)
			}
		} catch (err) {
			console.error('[WorkspaceContext] Unexpected error loading workspaces:', err)
			setWorkspaces([])
		} finally {
			setLoading(false)
		}
	}

	// Load workspaces when userId changes
	useEffect(() => {
		refreshWorkspaces()
	}, [userId])

	const setActiveWorkspace = (id: string) => {
		setActiveWorkspaceId(id)
		if (userId) {
			localStorage.setItem(getStorageKey(userId), id)
			
			if (import.meta.env.DEV) {
				console.log('[WorkspaceContext] Active workspace changed:', id)
			}
		}
	}

	const addWorkspace = async (name: string) => {
		if (!userId) {
			console.error('[WorkspaceContext] Cannot add workspace: user not authenticated')
			return
		}

		try {
			// Step 1: Create workspace
			const { data, error } = await supabase
				.from('workspaces')
				.insert({ name, owner_id: userId })
				.select()
				.single()

			if (error || !data) {
				console.error('[WorkspaceContext] Failed to create workspace:', error?.message)
				return
			}

			// Step 2: Add user as workspace member
			const { error: memberError } = await supabase
				.from('workspace_members')
				.insert({ workspace_id: data.id, user_id: userId })

			if (memberError) {
				console.error('[WorkspaceContext] Failed to add user to workspace:', memberError.message)
				// Clean up workspace if member insert fails
				await supabase.from('workspaces').delete().eq('id', data.id)
				return
			}

			setWorkspaces((prev) => [...prev, data])
			setActiveWorkspace(data.id)

			if (import.meta.env.DEV) {
				console.log('[WorkspaceContext] Created workspace:', data.id)
				console.log('[WorkspaceContext] Added user to workspace_members')
			}
		} catch (err) {
			console.error('[WorkspaceContext] Unexpected error creating workspace:', err)
		}
	}

	const value = useMemo(
		() => ({ workspaces, activeWorkspace, activeWorkspaceId, setActiveWorkspace, addWorkspace, refreshWorkspaces, loading }),
		[workspaces, activeWorkspace, activeWorkspaceId, loading],
	)

	return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>
}

export const useWorkspace = () => {
	const context = useContext(WorkspaceContext)
	if (!context) {
		throw new Error('useWorkspace must be used within WorkspaceProvider')
	}
	return context
}
