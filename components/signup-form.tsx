import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useAuth } from '@/context/AuthUserContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/components/ui/form'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { type User } from '@/types/user'

const formSchema = z.object({
	username: z
		.string()
		.min(2, { message: 'Username must be at least 2 characters.' }),
	email: z.string().email({ message: 'Invalid email address.' }),
	name: z.string().min(1, { message: 'Name is required.' }),
	role: z.enum(['driver', 'student', 'admin'], {
		message: 'Role is required.',
	}),
	phone_num: z
		.string()
		.min(10, { message: 'Phone number must be at least 10 digits.' }),
	password: z
		.string()
		.min(6, { message: 'Password must be at least 6 characters.' }),
})

export default function SignupForm() {
	const [message, setMessage] = useState('')

	const { createUser } = useAuth()

	const form = useForm<Omit<User, 'user_id'> & { password: string }>({
		resolver: zodResolver(formSchema),
	})

	const handleCreateUser = async (
		data: Omit<User, 'user_id'> & { password: string }
	) => {
		try {
			const { password, ...userData } = data
			await createUser(userData, password)
			setMessage('User created successfully')
		} catch (error) {
			setMessage((error as Error).message)
		}
	}

	return (
		<div className="space-y-5 w-full mr-5 my-8">
			<h3 className="font-medium text-2xl">Register a student account</h3>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleCreateUser)}
					className="space-y-8 w-full"
				>
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input placeholder="Username" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="Email" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder="Name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="role"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Role</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select Role" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="driver">Driver</SelectItem>
										<SelectItem value="student">Student</SelectItem>
										<SelectItem value="admin">Admin</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="phone_num"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Phone Number</FormLabel>
								<FormControl>
									<Input placeholder="Phone Number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type="password" placeholder="Password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Create User</Button>
					{message && <p>{message}</p>}
				</form>
			</Form>
		</div>
	)
}
