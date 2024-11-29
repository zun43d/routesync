import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from '@/components/ui/toaster'

import { Inter as FontSans } from 'next/font/google'

import { cn } from '@/lib/utils'
import { AuthProvider } from '@/context/AuthUserContext'

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
})

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AuthProvider>
			<main className={cn('font-sans antialiased', fontSans.variable)}>
				<Component {...pageProps} />
			</main>
			<Toaster />
		</AuthProvider>
	)
}
