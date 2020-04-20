import { QUERY_AVAILABLE_ITEMS, QUERY_CART_INFO } from "./typedefs";
import convertPrice from "./utils";
// import { ApolloError } from 'apollo-boost';

const resolvers = {
  Mutation: {
    addItemToCart: (_, { id }, { cache }) => {
      const { cart } = cache.readQuery({ query: QUERY_CART_INFO });
      // if (cart.items.some((item) => item.id === id)) {
      //   throw new ApolloError({ errorMessage: 'Duplicate item' });
      //   return null;
      // }
      const { itemsForSale } = cache.readQuery({
        query: QUERY_AVAILABLE_ITEMS,
      });

      const newItem = itemsForSale.find((item) => item.id === id);

      cache.writeQuery({
        query: QUERY_CART_INFO,
        data: {
          cart: {
            items: cart.items.concat(newItem),
            total: cart.total + newItem.price,
            __typename: "Cart",
          },
        },
      });

      return newItem;
    },
    deleteItemFromCart: (_, { id }, { cache }) => {
      const { cart } = cache.readQuery({ query: QUERY_CART_INFO });
      const { itemsForSale } = cache.readQuery({
        query: QUERY_AVAILABLE_ITEMS,
      });
      const currentItem = itemsForSale.find((item) => item.id === id);

      cache.writeQuery({
        query: QUERY_CART_INFO,
        data: {
          cart: {
            items: cart.items.filter((item) => item.id !== id),
            total: cart.total - currentItem.price,
            __typename: "Cart",
          },
        },
      });
      return currentItem;
    },
    convertCurrency: async (_, { newCurrency }, { cache }) => {
      const { cart, currency } = cache.readQuery({
        query: QUERY_CART_INFO,
      });
      const { itemsForSale } = cache.readQuery({
        query: QUERY_AVAILABLE_ITEMS,
      });

      const newCartItems = await Promise.all(
        cart.items.map(async (item) => ({
          ...item,
          price: await convertPrice(currency, newCurrency, item.price),
        }))
      );
      const newTotal = await convertPrice(currency, newCurrency, cart.total);

      const newItemsForSale = await Promise.all(
        itemsForSale.map(async (item) => ({
          ...item,
          price: await convertPrice(currency, newCurrency, item.price),
        }))
      );
      cache.writeQuery({
        query: QUERY_CART_INFO,
        data: {
          cart: {
            items: newCartItems,
            total: newTotal,
            __typename: "Cart",
          },
          currency: newCurrency,
        },
      });
      cache.writeQuery({
        query: QUERY_AVAILABLE_ITEMS,
        data: {
          itemsForSale: newItemsForSale,
        },
      });
      return newCurrency;
    },
  },
};

export default resolvers;
