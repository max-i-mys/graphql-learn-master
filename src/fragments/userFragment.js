import gql from 'graphql-tag'

export const REQUIRED_FIELD_USER = gql`
	fragment requiredFieldUsers on users {
		name
		rocket
		twitter
	}
`
