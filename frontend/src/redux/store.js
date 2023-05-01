import { configureStore } from "@reduxjs/toolkit";
import { employeesSlice } from "./features/employeesSlice";
import { companiesSlice } from "./features/companiesSlice";
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
    reducer: {
        [employeesSlice.reducerPath]: employeesSlice.reducer,
        [companiesSlice.reducerPath]: companiesSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(employeesSlice.middleware, companiesSlice.middleware),
    devTools: true
})

export default store
setupListeners(store.dispatch)