import gql from 'graphql-tag'

export const UPDATE_USER = gql`
	mutation Mutation($where: users_bool_exp!, $set: users_set_input) {
		update_users(where: $where, _set: $set) {
			returning {
				id
			}
		}
	}
`
