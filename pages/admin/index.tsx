import Navbar from '@/components/navbar'
import SignupForm from '@/components/signup-form'
import ProtectedRoute from '@/components/protected_route'
import { ContactRound, Route, Car } from 'lucide-react'

const data = {
	nav: [
		{ name: 'Students', icon: ContactRound },
		{ name: 'Drivers', icon: Car },
		{ name: 'Routes', icon: Route },
	],
}

export default function AdminPanel() {
	return (
		<ProtectedRoute>
			<div className="admin-panel">
				<Navbar />
				<div className="flex w-full gap-5">
					<aside className="flex flex-col justify-start items-start gap-3 text-lg max-w-56 w-full h-full border-r py-5">
						{data.nav.map((item, index) => (
							<a
								key={index}
								href="#"
								className="w-full flex items-center gap-2 p-3 hover:bg-gray-100"
							>
								<item.icon />
								<span>{item.name}</span>
							</a>
						))}
					</aside>

					<SignupForm />
				</div>
			</div>
		</ProtectedRoute>
	)
}
