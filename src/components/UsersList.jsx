import { useUser } from '../hooks/useUser'
import User from './User'

export function UsersList() {
	const { data = {}, loading } = useUser()
	const { users = [] } = data
	if (loading) return <p>Loading...</p>
	return (
		<>
			{users.length > 0 ? (
				<ul>
					{users.map(user => (
						<User key={user.id} user={user} />
					))}
				</ul>
			) : (
				<p>No users!</p>
			)}
		</>
	)
}
