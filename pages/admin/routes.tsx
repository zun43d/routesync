import { useEffect, useState } from 'react'
import AdminPanel from '@/layout/admin-panel'
import { columns } from '@/components/data-table/columns/routes'
import { DataTable } from '@/components/data-table/table'
import useFirebaseAuth from '@/lib/useFirebaseAuth'
import { type Route } from '@/types/route'
import { Button } from '@/components/ui/button'

export default function RoutesPage() {
	const { getRoutes } = useFirebaseAuth()
	const [data, setData] = useState<Route[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchRoutes = async () => {
			try {
				const routes = await getRoutes()
				setData(routes)
			} catch (error) {
				console.error('Error fetching Routes:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchRoutes()
	}, [getRoutes])

	return (
		<AdminPanel>
			<div className="flex items-center justify-between">
				<h3 className="text-2xl">Routes</h3>
				<Button variant="outline">Add Route</Button>
			</div>
			<div className="mx-auto py-10">
				{loading ? (
					<p>Loading...</p>
				) : (
					<DataTable columns={columns} data={data} />
				)}
			</div>
		</AdminPanel>
	)
}
