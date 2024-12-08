import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import ProtectedRoute from '@/components/protected-route'
import Navbar from '@/components/navbar'
import { useDriverLiveStatus } from '@/context/DriverLiveStatusContext'
import { useAuth } from '@/context/AuthUserContext'
import { Button } from '@/components/ui/button'
import { ref, update } from 'firebase/database'
import { rtdb } from '@/config/firebase'

// Dynamically import the Map component to avoid SSR issues
const Map = dynamic(() => import('@/components/map'), { ssr: false })

export default function AdminPanel() {
	const [coords, setCoords] = useState<[number, number]>([23.801494, 90.426163])
	const [isStarted, setIsStarted] = useState(false)

	const { setSelectedRoute } = useDriverLiveStatus()
	const { currentUser, getRouteByDriverID, loading } = useAuth()
	const zoom = 17

	useEffect(() => {
		const fetchRoute = async () => {
			if (!loading && currentUser && currentUser.role === 'driver') {
				const route = await getRouteByDriverID(currentUser.user_id)
				setSelectedRoute(route)
			}
		}
		fetchRoute()
	}, [loading, currentUser, getRouteByDriverID, setSelectedRoute])

	const handleStart = async () => {
		setIsStarted((prev) => !prev)
		if (!loading && currentUser && currentUser.role === 'driver') {
			const driverRef = ref(rtdb, `drivers/${currentUser.user_id}`)

			const updateCoords = () => {
				update(driverRef, {
					lat: coords[0],
					lng: coords[1],
				})
			}

			const updateStatus = () => {
				update(driverRef, {
					isStreaming: isStarted,
				})
			}
			updateStatus()
			updateCoords()
			console.log(isStarted)
			const intervalId = setInterval(updateCoords, 500) // Update every 5 seconds

			return () => clearInterval(intervalId) // Clear interval on component unmount
		}
	}

	return (
		<ProtectedRoute>
			<div>
				<Navbar className="xl:max-w-7xl w-11/12 xl:w-full absolute left-1/2 -translate-x-1/2 bg-white shadow-2xl mt-3 rounded-full xl:rounded-xl" />
				<Map
					position={coords}
					setPos={setCoords}
					zoom={zoom}
					className="h-[100dvh] xl:h-[100vh] absolute top-0 -z-10"
				/>
				<Button
					size="default"
					className="max-w-xs w-full fixed bottom-8 left-1/2 -translate-x-1/2"
					variant={isStarted ? 'destructive' : 'default'}
					onClick={handleStart}
				>
					Share Location
				</Button>
			</div>
		</ProtectedRoute>
	)
}
