import type { User } from '@/types/user'
import { ColumnDef } from '@tanstack/react-table'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const handleDelete = (id: string) => {
	const confirmDelete = confirm('Are you sure you want to delete this user?')
	if (confirmDelete) {
		// Delete user
		console.log(id)
	}
}

export const columns: ColumnDef<User>[] = [
	{
		accessorKey: 'user_id',
		header: 'UID',
	},
	{
		accessorKey: 'username',
		header: 'Username',
	},
	{
		accessorKey: 'email',
		header: 'Email',
	},
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'role',
		header: 'Role',
	},
	{
		accessorKey: 'phone_num',
		header: 'Phone Number',
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const user = row.original

			return (
				<Button
					variant="destructive"
					onClick={() => handleDelete(user.user_id)}
				>
					<Trash2 />
				</Button>
			)
		},
	},
]
