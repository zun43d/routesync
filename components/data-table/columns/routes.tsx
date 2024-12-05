import type { Route } from '@/types/route'
import { ColumnDef } from '@tanstack/react-table'
import { Trash2, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'

const handleDelete = (id: string) => {
	const confirmDelete = confirm('Are you sure you want to delete this user?')
	if (confirmDelete) {
		// Delete user
		console.log(id)
	}
}

export const columns: ColumnDef<Route>[] = [
	{
		accessorKey: 'route_id',
		header: 'Route Name',
	},
	{
		accessorKey: 'from',
		header: 'From',
		cell: ({ row }) => {
			const from = row.original.from
			return <span>{from.latitude + ', ' + from.longitude}</span>
		},
	},
	{
		accessorKey: 'to',
		header: 'To',
		cell: ({ row }) => {
			const to = row.original.to
			return <span>{to.latitude + ', ' + to.longitude}</span>
		},
	},
	{
		accessorKey: 'waypoints',
		header: 'Stopage Points',
		cell: ({ row }) => {
			return row.original.waypoints.map((waypoint) => (
				<>
					<span key={waypoint.latitude}>
						{waypoint.latitude + ', ' + waypoint.longitude}
					</span>
					<br />
				</>
			))
		},
	},
	{
		accessorKey: 'driver',
		header: 'Driver',
		cell: ({ row }) => {
			const driver = row.original.driver
			return <span>{driver.id}</span>
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const user = row.original

			return (
				<div className="space-x-2">
					{/* <ModalForm
						btnLabel={<Pencil />}
						btnSize="icon"
						type="edit"
						data={user}
					/> */}
					<Button
						variant="outline"
						size="icon"
						onClick={() => handleDelete(user.route_id)}
					>
						<Pencil />
					</Button>
					<Button
						variant="destructive"
						size="icon"
						onClick={() => handleDelete(user.route_id)}
					>
						<Trash2 />
					</Button>
				</div>
			)
		},
	},
]
