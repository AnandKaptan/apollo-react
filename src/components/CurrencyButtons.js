import React from 'react';
import { MUTATION_CONVERT_CURRENCY } from '../typedefs';
import { useMutation } from '@apollo/react-hooks';
import { Button } from 'semantic-ui-react';

const CurrencyButtons = ({ currency }) => {
  const [convertCurrency] = useMutation(MUTATION_CONVERT_CURRENCY);
  return (
    <Button.Group>
      <Button
        content="USD"
        icon="usd"
        positive={currency === 'USD'}
        onClick={() => convertCurrency({ variables: { newCurrency: 'USD' } })}
      />
      <Button
        content="EUR"
        icon="eur"
        positive={currency === 'EUR'}
        onClick={() => convertCurrency({ variables: { newCurrency: 'EUR' } })}
      />
    </Button.Group>
  );
};

export default CurrencyButtons;
