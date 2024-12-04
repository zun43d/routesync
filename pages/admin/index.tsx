import AdminPanel from '@/layout/admin-panel'

export default function AdminPage() {
	return (
		<AdminPanel>
			<div className="flex flex-1 flex-col gap-4 p-4 pt-0 w-full">
				<div className="grid auto-rows-min gap-4 md:grid-cols-3">
					<div className="aspect-video rounded-xl bg-muted" />
					<div className="aspect-video rounded-xl bg-muted" />
					<div className="aspect-video rounded-xl bg-muted" />
				</div>
				<div className="min-h-[100vh] flex-1 rounded-xl bg-muted md:min-h-[20vh]" />
			</div>
		</AdminPanel>
	)
}
