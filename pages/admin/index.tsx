import { useRouter } from 'next/router'
import { Button } from '@/components/ui/button'
import SignupForm from '@/components/signup-form'
import ProtectedRoute from '@/components/protected_route'
import { useAuth } from '@/context/AuthUserContext'

export default function AdminPanel() {
	const router = useRouter()
	const { logout } = useAuth()

	const handleLogout = () => {
		logout()
		router.push('/')
	}

	return (
		<ProtectedRoute>
			<div className="admin-panel">
				<nav>
					<Button onClick={handleLogout}>Logout</Button>
				</nav>
				<h1>Admin Panel</h1>
				<SignupForm />
			</div>
		</ProtectedRoute>
	)
}
