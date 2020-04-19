import React from "react";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { available_items as AvailableItems } from "./data/availableItems";
import { Container, Grid, Segment, Header } from "semantic-ui-react";
import ItemsForSale from "./components/ItemsForSale";
import UserCart from "./components/UserCart";
import resolvers from "./resolvers";

const cache = new InMemoryCache({});
const client = new ApolloClient({
  cache,
  resolvers,
});

cache.writeData({
  data: {
    cart: {
      items: [],
      total: 0,
      __typename: "Cart",
    },
    currency: "USD",
    itemsForSale: AvailableItems,
  },
  resolvers,
});
const App = () => {
  return (
    <ApolloProvider client={client}>
      <Container>
        <br />
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Segment>
                <Header as="h1">Local State Management using Apollo</Header>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column width={11}>
              <ItemsForSale />
            </Grid.Column>
            <Grid.Column width={5}>
              <UserCart />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </ApolloProvider>
  );
};

export default App;
