import { useState, useMemo, useCallback } from 'react'
import { DirectionsRenderer, DirectionsService } from '@react-google-maps/api'

interface MapDirectionsProps {
	origin: { lat: number; lng: number }
	dest: { lat: number; lng: number }
}

export default function MapDirections({ origin, dest }: MapDirectionsProps) {
	const [directions, setDirections] = useState<
		google.maps.DirectionsResult | undefined
	>()
	const [travelTime, setTravelTime] = useState<string | undefined>()

	const memoizedOrigin = useMemo(() => origin, [origin])
	const memoizedDest = useMemo(() => dest, [dest])

	const directionsCallback = useCallback(
		(
			result: google.maps.DirectionsResult | null,
			status: google.maps.DirectionsStatus
		) => {
			if (result !== null && status === 'OK') {
				setDirections(result)
				const route = result.routes[0].legs[0]
				setTravelTime(route.duration?.text)
			} else {
				console.error('Directions request failed due to ' + status)
			}
		},
		[]
	)

	const directionsServiceOptions = useMemo(
		() => ({
			destination: memoizedDest,
			origin: memoizedOrigin,
			// waypoints: [],
			optimizeWaypoints: true,
			travelMode: google.maps.TravelMode.DRIVING,
		}),
		[memoizedDest, memoizedOrigin]
	)

	const directionsResult = useMemo(() => {
		return {
			directions,
		}
	}, [directions])

	return (
		<>
			<DirectionsService
				options={directionsServiceOptions}
				callback={directionsCallback}
			/>
			<DirectionsRenderer options={directionsResult} />
			{travelTime && <p>Travel Time: {travelTime}</p>}
		</>
	)
}
