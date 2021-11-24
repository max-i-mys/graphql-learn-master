import gql from 'graphql-tag'
import { REQUIRED_FIELD_USER } from '../fragments/userFragment'

export const USERS = gql`
	query getUsers {
		users {
			id
			timestamp
			...requiredFieldUsers
		}
	}
	${REQUIRED_FIELD_USER}
`
