import { useQuery } from '@apollo/client'
import { createContext } from 'react'
import { USERS } from '../queries/getUsers'

export const UserContext = createContext()

export default function UserProvider({ children }) {
	const { data, loading, refetch: updateUser } = useQuery(USERS)
	return <UserContext.Provider value={{ data, loading, updateUser }}>{children}</UserContext.Provider>
}
