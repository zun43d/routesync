import { ComponentPropsWithoutRef } from 'react'
import Navbar from '@/components/navbar'
import ProtectedRoute from '@/components/protected-route'
import { ContactRound, Route, Bus, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'

const data = {
	nav: [
		{ name: 'Dashboard', icon: LayoutDashboard, loc: '' },
		{ name: 'Students', icon: ContactRound, loc: 'students' },
		{ name: 'Drivers', icon: Bus, loc: 'drivers' },
		{ name: 'Routes', icon: Route, loc: 'routes' },
	],
}

export default function AdminPanel(props: ComponentPropsWithoutRef<'div'>) {
	const { children } = props

	return (
		<ProtectedRoute>
			<div className="admin-panel">
				<Navbar />
				<div className="flex w-full ">
					<aside className="flex flex-col justify-start items-start gap-3 text-lg max-w-56 w-full h-full border-r py-5">
						{data.nav.map((item, index) => (
							<Link
								key={index}
								href={`/admin/${item.loc}`}
								className="w-full flex items-center gap-2 p-3 hover:bg-gray-100"
							>
								<item.icon />
								<span>{item.name}</span>
							</Link>
						))}
					</aside>

					<div className="py-7 px-8 w-full">{children}</div>
				</div>
			</div>
		</ProtectedRoute>
	)
}
