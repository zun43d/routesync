import { useState, useEffect } from 'react'
import { type User } from '@/types/user'
import { db, auth, rtdb } from '@/config/firebase'
import {
	doc,
	collection,
	setDoc,
	query,
	where,
	getDocs,
	limit,
	getDoc,
} from 'firebase/firestore'
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	User as FirebaseUser,
} from 'firebase/auth'
import { ref, get, child } from 'firebase/database'
import { type Route } from '@/types/route'

const useFirebaseAuth = () => {
	const [currentUser, setCurrentUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)

	const handleSateChange = async (user: FirebaseUser | null) => {
		if (user) {
			const docRef = doc(db, 'users', user.uid)
			const docSnap = await getDoc(docRef)
			if (docSnap.exists()) {
				setCurrentUser(docSnap.data() as User)
			} else {
				console.error('No such document!')
			}
		} else {
			setCurrentUser(null)
		}
		setLoading(false)
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, handleSateChange)
		return () => unsubscribe()
	}, [])

	const createUser = async (
		user: Omit<User, 'user_id'>,
		password: string
	): Promise<void> => {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			user.email,
			password
		)
		const uid = userCredential.user.uid

		const docRef = doc(db, 'users', uid)
		await setDoc(docRef, user)
	}

	const getUserByUsername = async (username: string): Promise<User> => {
		const q = query(
			collection(db, 'users'),
			where('username', '==', username),
			limit(1)
		)
		const querySnapshot = await getDocs(q)

		if (querySnapshot.empty) {
			throw new Error('No such user!')
		}

		const user: User = querySnapshot.docs[0].data() as User

		return user
	}

	const loginWithUsername = async (
		username: string,
		password: string
	): Promise<void> => {
		try {
			const user = await getUserByUsername(username)
			await signInWithEmailAndPassword(auth, user.email, password)
		} catch (error) {
			// console.error('Error logging in with username:', error)
			throw error
		}
	}

	const getUsersByRole = async (role: string): Promise<User[]> => {
		const q = query(collection(db, 'users'), where('role', '==', role))
		const querySnapshot = await getDocs(q)

		if (querySnapshot.empty) {
			return []
		}

		const users: User[] = querySnapshot.docs.map((doc) => {
			const data = doc.data() as User
			return { ...data, user_id: doc.id }
		})

		return users
	}

	const setUserData = async (
		user_id: string,
		updatedData: Partial<User>
	): Promise<void> => {
		const docRef = doc(db, 'users', user_id)
		await setDoc(docRef, updatedData, { merge: true })
	}

	const getRoutes = async (): Promise<Route[]> => {
		const q = query(collection(db, 'routes'))
		const querySnapshot = await getDocs(q)

		if (querySnapshot.empty) {
			return []
		}

		const routes: Route[] = querySnapshot.docs.map((doc) => {
			const data = doc.data() as Route
			return { ...data, route_id: doc.id }
		})

		return routes
	}

	const getIsDriverLive = async (
		driverUID: string
	): Promise<{ isStreaming: boolean; lat: number; lng: number }> => {
		const dbRef = ref(rtdb)
		const snapshot = await get(child(dbRef, `drivers/${driverUID}`))
		if (snapshot.exists()) {
			return snapshot.val()
		} else {
			throw new Error('No data available')
		}
	}

	const logout = async (): Promise<void> => {
		try {
			await auth.signOut()
			setCurrentUser(null)
		} catch (error) {
			console.error('Error logging out:', error)
			throw error
		}
	}

	return {
		currentUser,
		loading,
		createUser,
		loginWithUsername,
		logout,
		getUsersByRole,
		setUserData,
		getRoutes,
		getIsDriverLive,
	}
}

export default useFirebaseAuth
