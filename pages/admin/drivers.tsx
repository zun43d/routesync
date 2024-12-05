import { useEffect, useState } from 'react'
import AdminPanel from '@/layout/admin-panel'
import { columns } from '@/components/data-table/columns'
import { DataTable } from '@/components/data-table/table'
import useFirebaseAuth from '@/lib/useFirebaseAuth'
import type { User } from '@/types/user'
import ModalForm from '@/components/modal-form'

export default function StudentsPage() {
	const { getUsersByRole } = useFirebaseAuth()
	const [data, setData] = useState<User[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const students = await getUsersByRole('driver')
				setData(students)
			} catch (error) {
				console.error('Error fetching drivers:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchStudents()
	}, [getUsersByRole])

	return (
		<AdminPanel>
			<div className="flex items-center justify-between">
				<h3 className="text-2xl">Driver Accounts</h3>
				<ModalForm btnLabel="Add Driver" type="create" />
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
