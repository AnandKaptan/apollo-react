import React from 'react';
import { Card, Button, Image } from 'semantic-ui-react';

const Item = ({ title, thumbnail_url, price }) => {
  const currency = 'USD';

  return (
    <Card>
      <Image src={thumbnail_url} style={{ height: 200, objectFit: 'cover' }} />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>
          {currency === 'EUR' ? '€' : '$'} {price.toFixed(2)}
        </Card.Meta>
      </Card.Content>
      <Card.Content as={Button}>Add to cart</Card.Content>
    </Card>
  );
};

export default Item;
