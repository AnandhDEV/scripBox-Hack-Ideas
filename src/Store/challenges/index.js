import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { DomainURL } from "../../Utils/constants";

const initialState = {
  users: [],
  challengeList: [],
  loader: false,
};

export const fetchChallenges = createAsyncThunk(
  "appConfig/fetchChallenges",
  async () => {
    const response = await axios.get(DomainURL + "challenges");
    return response.data ?? [];
  }
);
export const fetchUsers = createAsyncThunk("appConfig/fetchUsers", async () => {
  const response = await axios.get(DomainURL + "users");

  return response.data ?? [];
});

export const addChallenges = createAsyncThunk(
  "appConfig/addChallenges",
  async (data, { getState, dispatch }) => {
    const response = await axios.post(DomainURL + "challenges", data);
    dispatch(fetchChallenges());

    return response;
  }
);

export const updateChallenges = createAsyncThunk(
  "appConfig/updateChallenges",
  async (data, { getState, dispatch }) => {
    const response = await axios.put(DomainURL + `challenges/${data.id}`, data);
    dispatch(fetchChallenges());

    return response;
  }
);

const chanllengesSlice = createSlice({
  name: "challenges",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchChallenges.fulfilled, (state, action) => {
      state.challengeList = action.payload;
      state.loader = false;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(fetchChallenges.pending, (state, action) => {
      state.loader = true;
    });
    builder.addCase(fetchChallenges.rejected, (state, action) => {
      state.loader = false;
    });
  },
});

export default chanllengesSlice.reducer;
export const { setIsEdit } = chanllengesSlice.actions;
