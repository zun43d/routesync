import {
	GoogleMap,
	LoadScript,
	Marker,
	useGoogleMap,
} from '@react-google-maps/api'
import { Locate } from 'lucide-react'

const containerStyle = {
	width: '100%',
	height: '91vh',
}

interface MapProps {
	position: [number, number]
	setPos: (pos: [number, number]) => void
	zoom: number
	className?: string
}

function LocateBtn({ setPos, zoom }: Omit<MapProps, 'position' | 'className'>) {
	const map = useGoogleMap()

	const handleLocate = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setPos([position.coords.latitude, position.coords.longitude])
					if (map) {
						map.setCenter({
							lat: position.coords.latitude,
							lng: position.coords.longitude,
						})
						map.setZoom(zoom)
					}
				},
				() => {
					alert('Unable to retrieve your location')
				}
			)
		} else {
			alert('Geolocation is not supported by your browser')
		}
	}

	return (
		<button
			onClick={handleLocate}
			className="absolute bottom-48 right-3 locate-btn"
		>
			<Locate size={24} />
		</button>
	)
}

const GoogleMapComponent = (props: MapProps) => {
	const { position, setPos, zoom } = props

	const center = {
		lat: position[0],
		lng: position[1],
	}

	return (
		<LoadScript
			googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
		>
			<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
				<Marker position={center} />
				<LocateBtn setPos={setPos} zoom={zoom} />
			</GoogleMap>
		</LoadScript>
	)
}

export default GoogleMapComponent
