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
				'flex items-center justify-between py-3 px-4 border-b border-gray-100 z-50',
				className
			)}
		>
			<div className="flex items-center justify-center gap-2">
				<Image src="/logo.svg" alt="RouteSync Logo" width={35} height={35} />
				<h1 className="text-xl font-semibold">RouteSync</h1>
			</div>
			<Button
				size="sm"
				variant="outline"
				className="rounded-full xl:rounded-xl"
				onClick={handleLogout}
			>
				Logout
			</Button>
		</nav>
	)
}
