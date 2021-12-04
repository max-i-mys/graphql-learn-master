import { useMutation } from '@apollo/client'
import { Form, Text } from 'informed'
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
	const [update_users] = useMutation(UPDATE_USER)

	function handlerCancel() {
		if (setShowFormEdit) {
			setShowFormEdit(false)
			return
		}
		if (setShowFormAdd) {
			setShowFormAdd(false)
		}
	}
	function handlerUser(data, e) {
		const { username: valueName, rocket: valueRocket, twitter: valueTwitter } = data
		if (valueName || valueRocket || valueTwitter) {
			const newDataUser = {
				name: valueName,
				rocket: valueRocket,
				twitter: valueTwitter,
			}
			if (setShowFormAdd) {
				insert_users({
					variables: {
						objects: [
							{
								...newDataUser,
							},
						],
					},
					optimisticResponse: {
						insert_users: {
							__typename: 'users_mutation_response',
							returning: [
								{
									__typename: 'users',
									id: Date.now(),
									timestamp: Date.now(),
									...newDataUser,
								},
							],
						},
					},
				})
				return
			}
			if (setShowFormEdit) {
				update_users({
					variables: {
						set: {
							...newDataUser,
						},
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
					optimisticResponse: {
						update_users: {
							__typename: 'users_mutation_response',
							returning: [
								{
									__typename: 'users',
									id: currentUserId,
									...newDataUser,
								},
							],
						},
					},
				})
				setShowFormEdit(prev => !prev)
			}
		}
	}
	return (
		<>
			<Form onSubmit={handlerUser} className="user__form">
				<Text field="username" initialValue={values?.name || ''} placeholder="Username" />
				<Text field="rocket" initialValue={values?.rocket || ''} placeholder="Rocket" />
				<Text field="twitter" initialValue={values?.twitter || ''} placeholder="Twitter" />
				<div className="user__btn-block">
					<button onClick={handlerCancel} type="button" className="button user__cancel">
						Cancel
					</button>
					<button type="submit" className="button user__action">
						{values ? 'Edit' : 'Add'}
					</button>
				</div>
			</Form>
		</>
	)
}
