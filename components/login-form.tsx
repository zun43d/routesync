import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAuth } from '@/context/AuthUserContext'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'

type FormValues = {
	username: string
	password: string
}

export function LoginForm() {
	const router = useRouter()
	const { toast } = useToast()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<{ username: string; password: string }>()

	const { currentUser, loginWithUsername, loading } = useAuth()

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		try {
			await loginWithUsername(data.username, data.password)
			console.log('Successful login')
		} catch (error) {
			// alert(error.message)
			toast({
				variant: 'destructive',
				title: (error as Error).message,
			})
		}
	}

	useEffect(() => {
		if (!loading && currentUser) {
			switch (currentUser.role) {
				case 'admin':
					router.push('/admin')
					break
				case 'driver':
					router.push('/driver')
					break
				case 'student':
					router.push('/student')
					break
				default:
					break
			}
		}
	}, [currentUser, loading, router])

	// useEffect(() => {
	// 	if (error) {

	// 	}
	// }, [error])

	return (
		<Card className="mx-auto max-w-sm w-full">
			<CardHeader>
				<CardTitle className="text-2xl">Login Portal</CardTitle>
			</CardHeader>
			<CardContent>
				<form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
					<div className="grid gap-2">
						<Label htmlFor="user">Username</Label>
						<Input
							id="user"
							type="text"
							placeholder="Enter your username"
							required
							{...register('username', { required: true })}
						/>
						{errors.username && (
							<span className="text-red-500">Username is required</span>
						)}
					</div>
					<div className="grid gap-2">
						<div className="flex items-center">
							<Label htmlFor="password">Password</Label>
							<Link href="#" className="ml-auto inline-block text-sm underline">
								Forgot your password?
							</Link>
						</div>
						<Input
							id="password"
							type="password"
							required
							{...register('password', { required: true })}
						/>
						{errors.password && (
							<span className="text-red-500">Password is required</span>
						)}
					</div>
					<Button type="submit" className="w-full">
						Login
					</Button>
				</form>
				<div className="mt-4 text-center text-sm">
					Don&apos;t have an account? <br /> Contact your administrator.
				</div>
			</CardContent>
		</Card>
	)
}
