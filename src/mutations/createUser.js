import gql from 'graphql-tag'
import { REQUIRED_FIELD_USER } from '../fragments/userFragment'

export const CREATE_USER = gql`
	mutation Mutation($objects: [users_insert_input!]!) {
		insert_users(objects: $objects) {
			returning {
				id
				timestamp
				...requiredFieldUsers
			}
		}
	}
	${REQUIRED_FIELD_USER}
`
