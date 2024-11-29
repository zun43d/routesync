import { createContext, useContext, ReactNode } from 'react'
import useFirebaseAuth from '@/lib/useFirebaseAuth'

const AuthUserContext = createContext<ReturnType<
	typeof useFirebaseAuth
> | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const auth = useFirebaseAuth()
	return (
		<AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
	)
}

export const useAuth = () => {
	const context = useContext(AuthUserContext)
	if (context === null) {
		throw new Error('useAuth must be used within an AuthUserProvider')
	}
	return context
}
