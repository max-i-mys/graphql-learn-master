import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { useUser } from '../hooks/useUser'
import { DELETE_USER } from '../mutations/deleteUser'
import { dateFormatter } from '../utils/formatters'
import UserDetails from './UserDetails'

export default function User({ user }) {
	const [userDetails, setUserDetails] = useState(null)
	const [showUserDetails, setShowUserDetails] = useState(false)
	const [delete_users] = useMutation(DELETE_USER, {})
	const { updateUser } = useUser()
	function getUserDetails() {
		if (user) {
			const details = {
				name: user.name,
				rocket: user.rocket,
				timestamp: dateFormatter.format(Date.parse(user.timestamp)),
				twitter: user.twitter,
				id: user.id,
			}
			setUserDetails(details)
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
			updateUser()
		}
	}

	return (
		<>
			<li className="user">
				<p className="user__title">
					<span onClick={getUserDetails} className="user__name">
						{user.name}
					</span>
					({user.rocket})
					<button onClick={userDelete} type="button" className="user__del button">
						Delete
					</button>
				</p>
				<div className="user__details">{showUserDetails && <UserDetails userDetails={userDetails} />}</div>
			</li>
		</>
	)
}
