import React from 'react';
import { Card, Button, Image } from 'semantic-ui-react';
import { MUTATION_ADD_ITEM_TO_CART } from '../typedefs';
import { useMutation } from '@apollo/react-hooks';

const Item = ({ id, title, thumbnail_url, price }) => {
  const [addItemToCart] = useMutation(MUTATION_ADD_ITEM_TO_CART, {
    variables: { id: id },
  });
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
      <Card.Content as={Button} onClick={addItemToCart}>
        Add to cart
      </Card.Content>
    </Card>
  );
};

export default Item;
