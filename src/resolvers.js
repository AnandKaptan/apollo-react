import { QUERY_AVAILABLE_ITEMS, QUERY_CART_INFO } from "./typedefs";

const resolvers = {
  Mutation: {
    addItemToCart: (_, { id }, { cache }) => {
      const { cart } = cache.readQuery({ query: QUERY_CART_INFO });

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
  },
};

export default resolvers;
