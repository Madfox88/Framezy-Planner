import { useState } from 'react'
import { supabase } from '../lib/supabase'
import '../styles/Auth.css'

const AuthPage = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isSignUp, setIsSignUp] = useState(false)
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState('')
	const [error, setError] = useState('')

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setMessage('')
		setError('')

		try {
			if (isSignUp) {
				const { error } = await supabase.auth.signUp({
					email,
					password,
				})
				if (error) throw error
				setMessage('Check your email for confirmation link')
			} else {
				const { error } = await supabase.auth.signInWithPassword({
					email,
					password,
				})
				if (error) throw error
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="auth-page">
			<div className="auth-container glass">
				<h1>Framezy Planner</h1>
				<p className="auth-subtitle">{isSignUp ? 'Create your account' : 'Sign in to continue'}</p>

				<form onSubmit={handleSubmit} className="auth-form">
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							placeholder="you@example.com"
						/>
					</div>

					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							placeholder="••••••••"
							minLength={6}
						/>
					</div>

					{error && <div className="auth-error">{error}</div>}
					{message && <div className="auth-message">{message}</div>}

					<button type="submit" disabled={loading} className="auth-submit-btn">
						{loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
					</button>
				</form>

				<button
					type="button"
					onClick={() => {
						setIsSignUp(!isSignUp)
						setError('')
						setMessage('')
					}}
					className="auth-toggle-btn"
				>
					{isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
				</button>
			</div>
		</div>
	)
}

export default AuthPage
