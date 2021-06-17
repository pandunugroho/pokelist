import { gql } from "@apollo/client"

export const POKEMON_LIST = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
      }
    }
  }
`

export const POKEMON_DETAIL = gql`
  query pokemon($name: String!) {
  pokemon(name: $name) {
    id,
    name,
    sprites {
      front_default
    },
    types {
      slot,
      type {
        name
      }
    },
    moves {
      move {
        name
      }
    }
  }
}
`