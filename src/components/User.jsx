import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { DELETE_USER } from '../mutations/deleteUser'
import { USERS } from '../queries/getUsers'
import { dateFormatter } from '../utils/formatters'
import UserDetails from './UserDetails'

export default function User({ user }) {
	const [userDetails, setUserDetails] = useState(null)
	const [showUserDetails, setShowUserDetails] = useState(false)
	const [btnDisabled, setBtnDisabled] = useState(false)

	useEffect(() => {
		const fullTime = +user.timestamp || Date.parse(user.timestamp)
		const details = {
			name: user.name,
			rocket: user.rocket,
			timestamp: dateFormatter.format(fullTime),
			twitter: user.twitter,
			id: user.id,
		}
		setUserDetails(details)
	}, [user])

	const [delete_users] = useMutation(DELETE_USER, {
		update(cache, { data: { delete_users } }) {
			const { users } = cache.readQuery({ query: USERS })
			cache.writeQuery({
				query: USERS,
				data: { users: users.filter(item => item.id !== delete_users.returning[0].id) },
			})
		},
	})
	function getUserDetails() {
		if (userDetails) {
			setUserDetails(userDetails)
			setShowUserDetails(prev => !prev)
		}
	}

	function userDelete() {
		if (user.id) {
			delete_users({
				variables: {
					where: {
						id: {
							_eq: user.id,
						},
					},
				},
			})
			setBtnDisabled(true)
		}
	}

	return (
		<>
			<li className="user">
				<div className="user__title">
					<p>
						<span onClick={getUserDetails} className="user__name">
							{user.name}
						</span>
						({user.rocket ? user.rocket : 'no rocket'})
					</p>
					<button onClick={userDelete} type="button" className="user__del button" disabled={btnDisabled}>
						Delete
					</button>
				</div>
				<div className="user__details">{showUserDetails && <UserDetails userDetails={userDetails} />}</div>
			</li>
		</>
	)
}
