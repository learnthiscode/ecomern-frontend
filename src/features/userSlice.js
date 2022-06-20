import { createSlice } from "@reduxjs/toolkit";

// appApi
import appApi from "../services/appApi";

const initialState = null;

export const userSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        logout: () => initialState,
        addNotification: (state, action) => {
            state.notifications.unshift(action.payload);
        },
        resetNotifications: (state) => {
            state.notifications.forEach((obj) => {
                obj.status = "read";
            });
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(appApi.endpoints.signup.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.login.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.addToCart.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.removeFromCart.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.increaseCartProduct.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.decreaseCartProduct.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.createOrder.matchFulfilled, (_, { payload }) => payload);
    },
});
export const { logout, addNotification, resetNotifications } = userSlice.actions;
export default userSlice.reducer;
