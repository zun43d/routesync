import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { Inter as FontSans } from 'next/font/google'

import { cn } from '@/lib/utils'

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
})

export default function App({ Component, pageProps }: AppProps) {
	return (
		<main className={cn('font-sans antialiased', fontSans.variable)}>
			<Component {...pageProps} />
		</main>
	)
}
