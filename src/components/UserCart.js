import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Segment, Divider, Table, Loader, Header } from 'semantic-ui-react';
import { QUERY_CART_INFO } from '../typedefs';

const UserCart = () => {
  const { data, loading } = useQuery(QUERY_CART_INFO);

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
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.cart.items.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.title}</Table.Cell>
              <Table.Cell>{item.price}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell>Total</Table.HeaderCell>
            <Table.HeaderCell>
              {data.currency === 'USD' ? '$' : '€'} {data.cart.total.toFixed(2)}{' '}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
      {/* <h4>
        Total: {data.currency === 'USD' ? '$' : '€'}{' '}
        {data.cart.total.toFixed(2)}{' '}
      </h4> */}
    </Segment>
  );
};

export default UserCart;
