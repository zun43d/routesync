import { MapContainer, Marker, TileLayer, Popup, useMap } from 'react-leaflet'
import { Locate } from 'lucide-react'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'

interface MyMapProps {
	position: [number, number]
	setPos: (pos: [number, number]) => void
	zoom: number
	className?: string
}

function LocateBtn({
	setPos,
	zoom,
}: Omit<MyMapProps, 'position' | 'className'>) {
	const map = useMap()

	const handleLocate = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setPos([position.coords.latitude, position.coords.longitude])
					map.setView(
						[position.coords.latitude, position.coords.longitude],
						zoom
					)
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
			className="leaflet-bar leaflet-control flex justify-center items-center w-[34px] h-[34px] ml-[10px] mt-20 top bg-white hover:cursor-pointer"
		>
			<Locate size={20} />
		</button>
	)
}

export default function MyMap(props: MyMapProps) {
	const { position, setPos, zoom, className } = props

	return (
		<MapContainer
			center={position}
			zoom={zoom}
			scrollWheelZoom={true}
			className={className}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={position}>
				<Popup>Current Location</Popup>
			</Marker>
			<LocateBtn setPos={setPos} zoom={zoom} />
		</MapContainer>
	)
}
