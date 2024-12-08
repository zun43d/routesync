import { ComponentPropsWithoutRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/context/AuthUserContext'
import { Route, type RouteFormatted } from '@/types/route'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import getAreaFromCoords from '@/lib/getAreaFromCoords'
import { useDriverLiveStatus } from '@/context/DriverLiveStatusContext'

export default function RoutesPicker(props: ComponentPropsWithoutRef<'div'>) {
	const { className } = props
	const { getRoutes } = useAuth()
	const { driverLiveStatus, selectedRoute, setSelectedRoute, loading } =
		useDriverLiveStatus()

	const [rawRoutes, setRawRoutes] = useState<Route[]>([])
	const [routes, setRoutes] = useState<RouteFormatted[]>([])
	const [loadingRoutes, setLoadingRoutes] = useState(true)

	useEffect(() => {
		const loadRoutes = async () => {
			const fetchedRoutes = await getRoutes()
			setRawRoutes(fetchedRoutes)
			const formattedRoutes = await Promise.all(
				fetchedRoutes.map(async (route) => {
					const fromArea = await getAreaFromCoords(
						route.from.latitude,
						route.from.longitude
					)
					const toArea = await getAreaFromCoords(
						route.to.latitude,
						route.to.longitude
					)
					// fetch area for waypoints in route
					const waypoints = await Promise.all(
						route.waypoints.map(async (waypoint) => {
							const area = await getAreaFromCoords(
								waypoint.latitude,
								waypoint.longitude
							)
							return area
						})
					)

					return { ...route, from: fromArea, to: toArea, waypoints }
				})
			)
			setRoutes(formattedRoutes)
			setLoadingRoutes(false)
		}
		setTimeout(() => {
			loadRoutes()
		}, 3000)
	}, [getRoutes])

	return (
		<div
			className={cn(
				'max-w-xs md:max-w-md w-full bg-white rounded-lg py-3 px-5 space-y-3',
				className
			)}
		>
			<div className="space-y-2">
				<h3 className="font-semibold">Routes</h3>
				<div className="relative">
					<Select
						onValueChange={(e) =>
							setSelectedRoute(rawRoutes.filter((r) => r.route_id === e)[0])
						}
					>
						<SelectTrigger className="w-full">
							<SelectValue
								placeholder={
									loadingRoutes ? 'Loading routes' : 'Choose a route'
								}
							/>
						</SelectTrigger>
						{!loadingRoutes && (
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Routes</SelectLabel>
									{routes.map((route) => (
										<SelectItem
											key={route.route_id}
											value={route.route_id}
											className="flex flex-col items-start"
										>
											<span>{route.route_id}</span>{' '}
											<span className="text-sm text-muted-foreground">
												{route.from} - {route.waypoints.join(' - ')} -{' '}
												{route.to}
											</span>
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						)}
					</Select>
				</div>
			</div>
			<div>
				<h3 className="font-semibold">Bus</h3>
				{selectedRoute ? (
					loading ? (
						<p className="text-sm text-muted-foreground animate-pulse">
							Searching...
						</p>
					) : driverLiveStatus ? (
						<div>
							<p className="text-sm text-muted-foreground flex items-center gap-1.5">
								<span className=" inline-block bg-green-500 animate-ping w-2 h-2 rounded-full"></span>
								<span className=" inline-block bg-green-500 w-2 h-2 rounded-full -ml-3.5"></span>
								On the way
							</p>
						</div>
					) : (
						<p className="text-sm text-muted-foreground">No bus online</p>
					)
				) : (
					<p className="text-sm text-muted-foreground">Choose a route first</p>
				)}
			</div>
		</div>
	)
}
