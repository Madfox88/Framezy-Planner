import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

type Theme = 'light' | 'dark'

type ThemeContextValue = {
	theme: Theme
	setTheme: (theme: Theme) => void
	toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const THEME_STORAGE_KEY = 'framezy-theme'

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setThemeState] = useState<Theme>(() => {
		const stored = localStorage.getItem(THEME_STORAGE_KEY)
		return stored === 'dark' ? 'dark' : 'light'
	})

	const setTheme = (nextTheme: Theme) => {
		setThemeState(nextTheme)
		localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
	}

	const toggleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light')
	}

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme)
	}, [theme])

	const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme])

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
	const context = useContext(ThemeContext)
	if (!context) {
		throw new Error('useTheme must be used within ThemeProvider')
	}
	return context
}
