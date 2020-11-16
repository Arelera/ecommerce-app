// actions
export const addToCart = (product) => {
  return {
    type: 'ADD',
    product,
  };
};

export const removeFromCart = (id) => {
  return {
    type: 'REMOVE',
    id,
  };
};

export const setAmount = (id, amount) => {
  return {
    type: 'SET_AMOUNT',
    id,
    amount,
  };
};

export const clearCart = () => {
  localStorage.removeItem('cart');
  return {
    type: 'CLEAR',
  };
};

// reducer, [[product, amount], ...]
const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : [];

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD':
      // if item already in cart, +1 it's amount
      const newCartAdd = state.some((prod) => prod[0].id === action.product.id)
        ? state.map((prod) =>
            prod[0].id === action.product.id
              ? [prod[0], [Number(prod[1]) + 1]]
              : prod
          )
        : [...state, [action.product, 1]];
      localStorage.setItem('cart', JSON.stringify(newCartAdd));
      return newCartAdd;

    case 'REMOVE':
      const newCartRem = state.filter((prod) => prod[0].id !== action.id);
      localStorage.setItem('cart', JSON.stringify(newCartRem));
      return newCartRem;

    case 'SET_AMOUNT':
      const newCartSet = state.map((prod) =>
        prod[0].id === action.id ? [prod[0], action.amount] : prod
      );
      localStorage.setItem('cart', newCartSet);
      return newCartSet;

    case 'CLEAR':
      localStorage.removeItem('cart');
      return [];
    default:
      return state;
  }
};

export default cartReducer;
