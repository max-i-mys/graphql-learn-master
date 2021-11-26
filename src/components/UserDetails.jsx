import { useEffect, useState } from 'react'
import UserForm from './UserForm'

export default function UserDetails({ userDetails, setUserDetails }) {
	const [userDetailsArr, setUserDetailsArr] = useState([])
	const [showForm, setShowForm] = useState(false)
	useEffect(() => {
		const arr = []
		for (let detail in userDetails) {
			if (detail !== 'id') {
				arr.push(userDetails[detail])
			}
			setUserDetailsArr(arr)
		}
	}, [userDetails])
	function showEditForm() {
		setShowForm(true)
	}
	return (
		<>
			{userDetailsArr.length > 0 && (
				<ul>
					{userDetailsArr.map((detailUser, index) => (detailUser ? <li key={index}>{detailUser}</li> : null))}
				</ul>
			)}
			{!showForm && (
				<button type="button" onClick={showEditForm} className="button user__edit">
					Edit
				</button>
			)}
			{showForm && (
				<UserForm
					values={userDetails}
					setUserDetails={setUserDetails}
					currentUserId={userDetails.id}
					setShowFormEdit={setShowForm}
				/>
			)}
		</>
	)
}
