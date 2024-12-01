import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import ProtectedRoute from '@/components/protected_route'
import Navbar from '@/components/navbar'
import 'leaflet/dist/leaflet.css'

// Dynamically import the Map component to avoid SSR issues
const Map = dynamic(() => import('@/components/map'), { ssr: false })

export default function AdminPanel() {
	const [coords, setCoords] = useState<[number, number]>([23.801494, 90.426163])
	const zoom = 17

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setCoords([position.coords.latitude, position.coords.longitude])
				},
				() => {
					alert('Unable to retrieve your location')
				}
			)
		} else {
			alert('Geolocation is not supported by your browser')
		}
	}, [])

	return (
		<ProtectedRoute>
			<div className="">
				<Navbar />
				<div>
					<Map
						position={coords}
						setPos={setCoords}
						zoom={zoom}
						className="h-[91vh]"
					/>
				</div>
			</div>
		</ProtectedRoute>
	)
}
