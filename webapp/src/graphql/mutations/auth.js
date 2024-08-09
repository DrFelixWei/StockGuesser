import { gql } from '@apollo/client'

export const login = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) @rest(path: "/auth/login", method: "POST") {
      access_token
    }
  }
`

export const loginAs = gql`
  mutation LoginAs($userId: Int!) {
    loginAs(input: { userId: $userId }) @rest(path: "/auth/loginAs/{args.input.userId}", method: "POST") {
      access_token
    }
  }
`
