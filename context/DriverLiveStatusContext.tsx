import {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from 'react'
// import { useAuth } from '@/context/AuthUserContext'
import { type Route } from '@/types/route'
import { ref, onValue, off, DataSnapshot } from 'firebase/database'
import { rtdb } from '@/config/firebase'

interface DriverLiveStatusContextType {
	driverLiveStatus: {
		isStreaming: boolean
		lat: number
		lng: number
	} | null
	selectedRoute: Route | null
	setSelectedRoute: (route: Route | null) => void
	loading: boolean
}

const DriverLiveStatusContext =
	createContext<DriverLiveStatusContextType | null>(null)

export const DriverLiveStatusProvider = ({
	children,
}: {
	children: ReactNode
}) => {
	// Have to change this so that firebase functions stay seperated
	// But for now I have no energy to do that
	// const { getIsDriverLive } = useAuth()
	const [driverLiveStatus, setDriverLiveStatus] = useState<{
		isStreaming: boolean
		lat: number
		lng: number
	} | null>(null)
	const [selectedRoute, setSelectedRoute] = useState<Route | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		let statusRef: ReturnType<typeof ref> | null = null
		if (selectedRoute) {
			setLoading(true)
			statusRef = ref(rtdb, `drivers/${selectedRoute.driver.id}`)
			const handleStatusChange = (snapshot: DataSnapshot) => {
				if (snapshot.exists()) {
					setDriverLiveStatus(snapshot.val())
				} else {
					setDriverLiveStatus(null)
				}
				setLoading(false)
			}
			onValue(statusRef, handleStatusChange)
		} else {
			setDriverLiveStatus(null)
			setLoading(false)
		}
		return () => {
			if (statusRef) {
				off(statusRef)
			}
		}
	}, [selectedRoute])

	return (
		<DriverLiveStatusContext.Provider
			value={{ driverLiveStatus, selectedRoute, setSelectedRoute, loading }}
		>
			{children}
		</DriverLiveStatusContext.Provider>
	)
}

export const useDriverLiveStatus = () => {
	const context = useContext(DriverLiveStatusContext)
	if (context === null) {
		throw new Error(
			'useDriverLiveStatus must be used within a DriverLiveStatusProvider'
		)
	}
	return context
}
