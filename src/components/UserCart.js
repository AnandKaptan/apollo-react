import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  Segment,
  Divider,
  Table,
  Loader,
  Header,
  Button,
} from 'semantic-ui-react';
import { QUERY_CART_INFO, MUTATION_DELETE_ITEM_FROM_CART } from '../typedefs';
import CurrencyButtons from './CurrencyButtons';

const UserCart = () => {
  const { data, loading } = useQuery(QUERY_CART_INFO);
  const [deleteItemFromCart] = useMutation(MUTATION_DELETE_ITEM_FROM_CART);

  if (loading) return <Loader />;

  return (
    <Segment>
      <Header as="h2">User Cart</Header>
      <Divider />
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Item</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.cart.items.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.title}</Table.Cell>
              <Table.Cell>{item.price.toFixed(2)}</Table.Cell>
              <Table.Cell>
                <Button
                  circular
                  icon="delete"
                  color="red"
                  size="tiny"
                  onClick={() =>
                    deleteItemFromCart({ variables: { id: item.id } })
                  }
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell>Total</Table.HeaderCell>
            <Table.HeaderCell>
              {data.currency === 'USD' ? '$' : '€'} {data.cart.total.toFixed(2)}{' '}
            </Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
      <CurrencyButtons currency={data.currency} />
    </Segment>
  );
};

export default UserCart;
