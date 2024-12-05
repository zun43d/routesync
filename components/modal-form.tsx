import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import EditForm from '@/components/edit-form'
import CreateForm from '@/components/create-form'
import { User } from '@/types/user'

interface ModalProps {
	btnLabel: string | JSX.Element
	btnVariant?:
		| 'outline'
		| 'default'
		| 'link'
		| 'destructive'
		| 'secondary'
		| 'ghost'
	btnSize?: 'default' | 'sm' | 'lg' | 'icon'
	type: string
	data?: User
}

export default function ModalForm({
	btnLabel,
	btnVariant = 'outline',
	btnSize = 'default',
	type,
	data,
}: ModalProps) {
	const [open, setOpen] = useState(false)

	return (
		<>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button variant={btnVariant} size={btnSize}>
						{btnLabel}
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px] bg-white">
					<DialogHeader>
						<DialogTitle>Add account</DialogTitle>
						<DialogDescription>
							Fill out the form below to create a new account.
						</DialogDescription>
					</DialogHeader>
					{type === 'edit' && data && (
						<EditForm data={data} setOpen={setOpen} />
					)}
					{type === 'create' && <CreateForm setOpen={setOpen} />}
				</DialogContent>
			</Dialog>
		</>
	)
}
