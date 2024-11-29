import { useRouter } from 'next/router'
import { Button } from '@/components/ui/button'
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
			<div className="">
				<nav>
					<Button onClick={handleLogout}>Logout</Button>
				</nav>
				<h1>Student </h1>
			</div>
		</ProtectedRoute>
	)
}
