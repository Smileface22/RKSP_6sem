import { configureStore } from '@reduxjs/toolkit';
import { agreementReducer } from "./reducers/agreementReducer";


const store = configureStore({
    reducer: {
      agreement: agreementReducer,  // Подключаем редьюсер
    },
  });

export default store;