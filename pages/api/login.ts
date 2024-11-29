import { loginWithUsername } from '@/lib/firebase'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
	message: string
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	// block get request
	if (req.method !== 'POST') {
		res.status(405).json({ message: 'Method Not Allowed' })
		return
	}

	// get the username and pass from the request
	const { username, password } = req.body

	try {
		// login the user using the firebase function
		await loginWithUsername(username, password)
		res.status(200).json({ message: 'Login successful' })
	} catch (error) {
		res.status(401).json({ message: (error as Error).message })
	}
}
