import { useMemo, useState } from 'react'
import './styles/App.css'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Dashboard from './components/Dashboard'
import TasksPanel from './components/TasksPanel'
import GoalsPanel from './components/GoalsPanel'
import CalendarPanel from './components/CalendarPanel'
import SettingsPanel from './components/SettingsPanel'
import AccountPanel from './components/AccountPanel'
import { ThemeProvider } from './contexts/ThemeContext'
import { WorkspaceProvider } from './contexts/WorkspaceContext'
import { ProfileProvider } from './contexts/ProfileContext'
import { PlanProvider } from './contexts/PlanContext'

type AppSection = 'dashboard' | 'tasks' | 'goals' | 'calendar' | 'settings' | 'account'

const sectionLabels: Record<AppSection, string> = {
  dashboard: 'Dashboard',
  tasks: 'Tasks',
  goals: 'Goals',
  calendar: 'Calendar',
  settings: 'Settings',
  account: 'Account',
}

function AppShell() {
  const [activeSection, setActiveSection] = useState<AppSection>('dashboard')

  const content = useMemo(() => {
    switch (activeSection) {
      case 'tasks':
        return <TasksPanel />
      case 'goals':
        return <GoalsPanel />
      case 'calendar':
        return <CalendarPanel />
      case 'settings':
        return <SettingsPanel />
      case 'account':
        return <AccountPanel />
      case 'dashboard':
      default:
        return <Dashboard />
    }
  }, [activeSection])

  return (
    <div className="app">
      <Sidebar
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        sections={sectionLabels}
      />
      <div className="main-container">
        <TopBar activeSectionLabel={sectionLabels[activeSection]} />
        <main className="main-content">{content}</main>
      </div>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <WorkspaceProvider>
        <ProfileProvider>
          <PlanProvider>
            <AppShell />
          </PlanProvider>
        </ProfileProvider>
      </WorkspaceProvider>
    </ThemeProvider>
  )
}

export default App
