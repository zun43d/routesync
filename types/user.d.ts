export interface User {
	user_id: string
	username: string
	email: string
	name: string
	role: 'driver' | 'student' | 'admin'
	phone_num: string
}
