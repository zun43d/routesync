export default function getAreaFromCoords(
	lat: number,
	lng: number
): Promise<string> {
	return new Promise((resolve, reject) => {
		const geocoder = new google.maps.Geocoder()
		const latlng = { lat, lng }

		if (lat === 23.801549962928657 && lng === 90.42623058891937) {
			resolve('UITS')
		}
		geocoder.geocode({ location: latlng }, (results, status) => {
			if (status === google.maps.GeocoderStatus.OK) {
				if (results && results[0]) {
					resolve(results[0].address_components[0].short_name)
				} else {
					reject('No results found')
				}
			} else {
				reject('Geocoder failed due to: ' + status)
			}
		})
	})
}
