import { gql } from "apollo-boost";

const QUERY_AVAILABLE_ITEMS = gql`
  query {
    itemsForSale @client {
      id
      title
      thumbnail_url
      price
    }
  }
`;
export default QUERY_AVAILABLE_ITEMS;
