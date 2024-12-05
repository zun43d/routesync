import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthUserContext'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function Navbar({ className }: { className?: string }) {
	const router = useRouter()
	const { logout } = useAuth()

	const handleLogout = () => {
		logout()
		router.push('/')
	}

	return (
		<nav
			className={cn(
				'flex items-center justify-between p-5 border-b border-gray-100 z-50',
				className
			)}
		>
			<div className="flex items-center justify-center gap-2">
				<Image src="/logo.svg" alt="RouteSync Logo" width={50} height={50} />
				<h1 className="text-2xl font-semibold">RouteSync</h1>
			</div>
			<Button onClick={handleLogout}>Logout</Button>
		</nav>
	)
}
