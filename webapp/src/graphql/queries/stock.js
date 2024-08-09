import { gql } from '@apollo/client'

export const stock = gql`
  query Stock($id: Integer!) {
    charity(id: $id) {
      id
      symbol
      name
      dateGenerated
      prices {
        date
        open
        high
        low
        close
        volume
      }
    }
  }
`