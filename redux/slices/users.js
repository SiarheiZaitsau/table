import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { parseUsers } from "../../helpers/index";

export const fetchUsers = createAsyncThunk("users/fetchAll", async () => {
  const data = await axios.get("https://jsonplaceholder.typicode.com/users");
  data.data = parseUsers(data.data);
  return data;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    loading: false,
    status: null,
  },

  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchUsers.fulfilled]: (state, { payload }) => {
      (state.loading = false), (state.data = payload.data);
      state.status = "success";
    },
    [fetchUsers.rejected]: (state, action) => {
      (state.loading = false), (state.status = "failed");
    },
  },
});

export default usersSlice.reducer;
