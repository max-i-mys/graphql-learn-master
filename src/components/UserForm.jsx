import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../mutations/createUser'
import { UPDATE_USER } from '../mutations/updateUser'
import { USERS } from '../queries/getUsers'

export default function UserForm({ values, setShowFormEdit, setShowFormAdd, currentUserId }) {
	const [insert_users] = useMutation(CREATE_USER, {
		update(cache, { data: { insert_users } }) {
			const { users } = cache.readQuery({ query: USERS })
			cache.writeQuery({
				query: USERS,
				data: { users: [...insert_users.returning, ...users] },
			})
		},
	})

	const [update_users] = useMutation(UPDATE_USER, {
		update(cache, { data: { update_users } }) {
			const { users } = cache.readQuery({ query: USERS })
			const [currentUser] = update_users.returning
			const currentId = users.findIndex(item => item.id === currentUser.id)
			const newUserArr = [...users]
			newUserArr.splice(currentId, 1, currentUser)
			cache.writeQuery({
				query: USERS,
				data: { users: newUserArr },
			})
		},
	})

	function handlerCancel() {
		if (setShowFormEdit) {
			setShowFormEdit(false)
			return
		}
		if (setShowFormAdd) {
			setShowFormAdd(false)
		}
	}
	function handlerUser(e) {
		const valueName = e.target.username.value
		const valueRocket = e.target.rocket.value
		const valueTwitter = e.target.twitter.value
		e.preventDefault()
		if (valueName || valueRocket || valueTwitter) {
			if (setShowFormAdd) {
				insert_users({
					variables: {
						objects: [
							{
								name: valueName,
								rocket: valueRocket,
								twitter: valueTwitter,
							},
						],
					},
				})
				e.target.reset()
				return
			}
			if (setShowFormEdit) {
				update_users({
					variables: {
						set: { name: valueName, twitter: valueTwitter, rocket: valueRocket },
						where: {
							_or: [
								{
									_not: {
										_not: {
											id: {
												_in: currentUserId,
											},
										},
									},
								},
							],
						},
					},
				})
				// updateUser()
				setShowFormEdit(prev => !prev)
			}
		}
	}
	return (
		<>
			<form onSubmit={handlerUser} className="user__form">
				<input name="username" type="text" defaultValue={values?.name || ''} placeholder="Username" />
				<input name="rocket" type="text" defaultValue={values?.rocket || ''} placeholder="Rocket" />
				<input name="twitter" type="text" defaultValue={values?.twitter || ''} placeholder="Twitter" />
				<div className="user__btn-block">
					<button onClick={handlerCancel} type="button" className="button user__cancel">
						Cancel
					</button>
					<button type="submit" className="button user__action">
						{values ? 'Edit' : 'Add'}
					</button>
				</div>
			</form>
		</>
	)
}
