import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { verifySchema } from './utils/verifySchema'

// Run schema verification in development only
if (import.meta.env.DEV) {
	verifySchema()
}

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>,
)
