import { useEffect, ReactNode } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthUserContext'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
	const { currentUser, loading } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!loading && !currentUser) {
			router.push('/')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser, loading])

	if (!loading && currentUser) {
		return children
	}

	return (
		<div className="w-full h-36 flex items-center justify-center">
			<p>Loading..</p>
		</div>
	)
}
