import Image from 'next/image'

import { LoginForm } from '@/components/login-form'

export default function Home() {
	return (
		<div className="h-screen flex flex-col justify-center">
			<header className="flex items-center justify-center pb-20 py-5 px-5 gap-2">
				<Image src="/logo.svg" alt="RouteSync Logo" width={50} height={50} />
				<h1 className="text-2xl font-semibold">RouteSync</h1>
			</header>
			<div className="flex items-center justify-center px-4">
				<LoginForm />
			</div>
		</div>
	)
}
