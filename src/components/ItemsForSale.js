import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Segment, Card, Divider, Loader, Header } from 'semantic-ui-react';
import { QUERY_AVAILABLE_ITEMS } from '../typedefs';
import Item from './Item';

const ItemsForSale = () => {
  const { data, loading } = useQuery(QUERY_AVAILABLE_ITEMS);
  if (loading) return <Loader />;

  return (
    <Segment>
      <Header as="h2">Available Items </Header>
      <Divider />
      <Card.Group itemsPerRow={5}>
        {data.itemsForSale.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            title={item.title}
            thumbnail_url={item.thumbnail_url}
            price={item.price}
          />
        ))}
      </Card.Group>
    </Segment>
  );
};
export default ItemsForSale;
