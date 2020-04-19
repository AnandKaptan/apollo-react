import { gql } from "apollo-boost";

export const QUERY_AVAILABLE_ITEMS = gql`
  query {
    itemsForSale @client {
      id
      title
      thumbnail_url
      price
    }
  }
`;
export const QUERY_CART_INFO = gql`
  query {
    cart @client {
      items {
        id
        title
        thumbnail_url
        price
      }
      total
    }
    currency @client
  }
`;

export const MUTATION_ADD_ITEM_TO_CART = gql`
  mutation($id: String!) {
    addItemToCart(id: $id) @client
  }
`;
export const MUTATION_DELETE_ITEM_FROM_CART = gql`
  mutation($id: String!) {
    deleteItemFromCart(id: $id) @client
  }
`;
