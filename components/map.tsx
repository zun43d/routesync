import { useEffect, useMemo } from 'react'
import {
	GoogleMap,
	LoadScript,
	MarkerF,
	useGoogleMap,
	TrafficLayer,
} from '@react-google-maps/api'
import { Locate } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'
import MapDirections from '@/components/map-directions'
import { useDriverLiveStatus } from '@/context/DriverLiveStatusContext'

const containerStyle = {
	width: '100%',
	// height: '100vh',
}

interface MapProps {
	position: [number, number]
	setPos: (pos: [number, number]) => void
	zoom: number
	className?: string
}

function LocateBtn({ position, zoom }: Omit<MapProps, 'className'>) {
	const map = useGoogleMap()

	const handleLocate = () => {
		if (map) {
			map.setCenter({
				lat: position[0],
				lng: position[1],
			})
			map.setZoom(zoom)
		}
	}

	return (
		<button
			onClick={handleLocate}
			className="absolute bottom-32 right-3 locate-btn"
		>
			<Locate size={24} />
		</button>
	)
}

const GoogleMapComponent = (props: MapProps) => {
	const { position, setPos, zoom, className } = props
	const { driverLiveStatus, selectedRoute } = useDriverLiveStatus()

	// const [start, setStart] = useState(false)

	const center = useMemo(
		() => ({
			lat: position[0],
			lng: position[1],
		}),
		[position]
	)

	useEffect(() => {
		if (navigator.geolocation) {
			const watchId = navigator.geolocation.watchPosition(
				(position) => {
					setPos([position.coords.latitude, position.coords.longitude])
				},
				(error) => {
					console.error('Error watching position:', error)
					// alert('Trying to retrieve your location again')
				},
				{
					enableHighAccuracy: true,
					timeout: 10000,
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
	}, [setPos])

	return (
		<LoadScript
			googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
		>
			<GoogleMap
				mapContainerClassName={className}
				mapContainerStyle={containerStyle}
				center={useMemo(
					() => ({
						lat: position[0],
						lng: position[1],
					}),
					[]
				)}
				zoom={10}
				options={{
					// colorScheme: 'DARK',
					fullscreenControl: false,
					streetViewControl: false,
					mapTypeControl: false,
					zoomControl: !useIsMobile(),
				}}
			>
				<MarkerF position={center} icon="/current-location.png" />
				<TrafficLayer />
				{/* <button
					onClick={() => setStart(!start)}
					className="absolute top-0 right-0 bg-white p-2"
				>
					{start ? 'Stop' : 'Start'}
				</button> */}
				{selectedRoute && driverLiveStatus?.isStreaming && (
					<>
						<MapDirections
							origin={{
								lat: selectedRoute.from.latitude,
								lng: selectedRoute.from.longitude,
							}}
							dest={{
								lat: selectedRoute.to.latitude,
								lng: selectedRoute.to.longitude,
							}}
						/>
						<MarkerF
							position={{
								lat: driverLiveStatus.lat,
								lng: driverLiveStatus.lng,
							}}
							icon="bus-locate.png"
						/>
					</>
				)}
				<LocateBtn position={position} setPos={setPos} zoom={zoom} />
			</GoogleMap>
		</LoadScript>
	)
}

export default GoogleMapComponent
