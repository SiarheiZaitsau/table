import { createSelector } from "reselect";

const users = (state) => state.reducer.users;

export const getUsers = createSelector(users, (state) => state.data);

export const getUsersLoading = createSelector(users, (state) => state.loading);
