import gql from 'graphql-tag'
import { REQUIRED_FIELD_USER } from '../fragments/userFragment'

export const UPDATE_USER = gql`
	mutation Mutation($where: users_bool_exp!, $set: users_set_input) {
		update_users(where: $where, _set: $set) {
			returning {
				__typename
				id
				...requiredFieldUsers
			}
		}
	}
	${REQUIRED_FIELD_USER}
`
