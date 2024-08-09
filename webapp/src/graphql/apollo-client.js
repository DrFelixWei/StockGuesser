import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { RestLink } from 'apollo-link-rest'

import { logoutOnUnauthorizedLink } from './logout-on-unauthorized-link'
import { getAuthToken } from '../hooks'

export const httpLink = new HttpLink({ uri: `${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_GRAPHQL_PATH}` })

const restLink = new RestLink({
  uri: process.env.REACT_APP_API_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getAuthToken()

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

export const client = new ApolloClient({
  link: ApolloLink.from([logoutOnUnauthorizedLink, authLink, restLink, httpLink]),
  cache: new InMemoryCache(),
})
