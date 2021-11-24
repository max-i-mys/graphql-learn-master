import gql from 'graphql-tag'

export const CREATE_USER = gql`
	mutation Mutation($objects: [users_insert_input!]!) {
		insert_users(objects: $objects) {
			returning {
				id
				name
			}
		}
	}
`
