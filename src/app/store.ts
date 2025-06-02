import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // Define your reducers here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // dùng để bỏ qua kiểm tra tính tuần tự của middleware, nếu sử dụng các giá trị không tuần tự như Date, Map, Set, v.v.
    }),
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development mode
})

export type RootState = ReturnType<typeof store.getState>; // RootState sẽ là kiểu của toàn bộ state trong Redux store
export type AppDispatch = typeof store.dispatch; // AppDispatch sẽ là kiểu của hàm dispatch trong Redux store