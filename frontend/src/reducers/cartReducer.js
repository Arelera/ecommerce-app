// actions
export const addToCart = (product) => {
  return {
    type: 'ADD',
    product,
  };
};

export const removeFromCart = (product) => {
  return {
    type: 'REMOVE',
    product,
  };
};

export const setAmount = (id, amount) => {
  return {
    type: 'SET_AMOUNT',
    id,
    amount,
  };
};

// reducer, [[product, amount], ...]
const cartReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD':
      // if item already in cart, +1 it's amount
      return state.some((prod) => prod[0].id === action.product.id)
        ? state.map((prod) =>
            prod[0].id === action.product.id
              ? [prod[0], [Number(prod[1]) + 1]]
              : prod
          )
        : [...state, [action.product, 1]];
    case 'REMOVE':
      return state.filter((prod) => prod.id !== action.product.id);
    case 'SET_AMOUNT':
      console.log('STATE: ', state);
      return state.map((prod) =>
        prod[0].id === action.id ? [prod[0], action.amount] : prod
      );
    default:
      return state;
  }
};

export default cartReducer;
