// import firebase geopoint data type
import { GeoPoint, DocumentReference } from 'firebase/firestore'

export interface Route {
	route_id: string
	from: GeoPoint
	to: GeoPoint
	waypoints: GeoPoint[]
	driver: DocumentReference
}
