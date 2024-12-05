import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import ProtectedRoute from '@/components/protected_route'
import Navbar from '@/components/navbar'

// Dynamically import the Map component to avoid SSR issues
const Map = dynamic(() => import('@/components/map'), { ssr: false })

export default function AdminPanel() {
	const [coords, setCoords] = useState<[number, number]>([23.801494, 90.426163])
	const zoom = 17

	useEffect(() => {
		if (navigator.geolocation) {
			const watchId = navigator.geolocation.watchPosition(
				(position) => {
					setCoords([position.coords.latitude, position.coords.longitude])
				},
				(error) => {
					console.error('Error watching position:', error)
					alert('Unable to retrieve your location')
				},
				{
					enableHighAccuracy: true,
					timeout: 5000,
					maximumAge: 0,
				}
			)

			// Cleanup function to clear the watch when the component unmounts
			return () => {
				navigator.geolocation.clearWatch(watchId)
			}
		} else {
			alert('Geolocation is not supported by your browser')
		}
	}, [])

	return (
		<ProtectedRoute>
			<div>
				<Navbar className="xl:max-w-7xl w-11/12 xl:w-full absolute left-1/2 -translate-x-1/2 bg-white shadow-2xl mt-3 rounded-full xl:rounded-xl" />
				<Map
					position={coords}
					setPos={setCoords}
					zoom={zoom}
					className="h-[100vh] absolute top-0 -z-10"
				/>
			</div>
		</ProtectedRoute>
	)
}
