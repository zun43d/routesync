import { useState, useMemo, useCallback } from 'react'
import { DirectionsRenderer, DirectionsService } from '@react-google-maps/api'

export default function MapDirections() {
	const [directions, setDirections] = useState<
		google.maps.DirectionsResult | undefined
	>()
	const [travelTime, setTravelTime] = useState<string | undefined>()

	const origin = useMemo(
		() => ({
			lat: 23.720097576463985,
			lng: 90.49046398911374,
		}),
		[]
	)

	const dest = useMemo(
		() => ({
			lat: 23.80011117572682,
			lng: 90.42311907304365,
		}),
		[]
	)

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
			destination: dest,
			origin: origin,
			waypoints: [],
			optimizeWaypoints: true,
			travelMode: google.maps.TravelMode.DRIVING,
		}),
		[dest, origin]
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
