import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './cartSlice';
import contentReducer from './contentSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    content: contentReducer,
  },
});
