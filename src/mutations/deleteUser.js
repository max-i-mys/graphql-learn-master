import gql from 'graphql-tag'

export const DELETE_USER = gql`
	mutation DeleteUser($where: users_bool_exp!) {
		delete_users(where: $where) {
			returning {
				id
			}
			affected_rows
		}
	}
`
