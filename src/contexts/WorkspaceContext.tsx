import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

type Workspace = {
	id: string
	name: string
}

type WorkspaceContextValue = {
	workspaces: Workspace[]
	activeWorkspaceId: string
	setActiveWorkspace: (id: string) => void
	addWorkspace: (name: string) => void
}

const WorkspaceContext = createContext<WorkspaceContextValue | undefined>(undefined)

const defaultWorkspaces: Workspace[] = [
	{ id: 'main', name: 'Framezy HQ' },
	{ id: 'design', name: 'Design Studio' },
	{ id: 'personal', name: 'Personal' },
]

export const WorkspaceProvider = ({ children }: { children: ReactNode }) => {
	const [workspaces, setWorkspaces] = useState<Workspace[]>(defaultWorkspaces)
	const [activeWorkspaceId, setActiveWorkspaceId] = useState<string>(defaultWorkspaces[0].id)

	const setActiveWorkspace = (id: string) => setActiveWorkspaceId(id)

	const addWorkspace = (name: string) => {
		const newWorkspace = {
			id: `ws-${Date.now()}`,
			name,
		}
		setWorkspaces((prev) => [...prev, newWorkspace])
		setActiveWorkspaceId(newWorkspace.id)
	}

	const value = useMemo(
		() => ({ workspaces, activeWorkspaceId, setActiveWorkspace, addWorkspace }),
		[workspaces, activeWorkspaceId],
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
