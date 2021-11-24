import { useState } from 'react'
import UserForm from './UserForm'

export function AddUser() {
	const [showForm, setShowForm] = useState(false)
	return (
		<>
			<div className="user__add">
				{!showForm && (
					<button onClick={() => setShowForm(true)} type="button" className="button user__action">
						Add new user
					</button>
				)}
				{showForm && <UserForm setShowFormAdd={setShowForm} />}
			</div>
		</>
	)
}
