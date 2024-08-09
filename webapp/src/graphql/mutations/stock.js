import { gql } from '@apollo/client'

export const createStock = gql`
  mutation createStock($data: CreateStockInput!) {
    createStock(data: $data) {
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