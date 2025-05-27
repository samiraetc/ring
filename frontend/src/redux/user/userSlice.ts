import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UsersState = {
  selectedUser: User | null;
};

const initialState: UsersState = {
  selectedUser: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSelectedUser(state, action: PayloadAction<User>) {
      state.selectedUser = action.payload;
    },
    clearSelectedUser(state) {
      state.selectedUser = null;
    },
    addReviewToSelectedUser(state, action: PayloadAction<Review>) {
      if (state.selectedUser) {
        state.selectedUser.reviews.push(action.payload);

        const total = state.selectedUser.reviews.length;
        const avg =
          state.selectedUser.reviews.reduce((sum, r) => sum + r.rating, 0) /
          total;

        state.selectedUser.totalReviews = total;
        state.selectedUser.averageRating = Number(avg.toFixed(2));
      }
    },
  },
});

export const { setSelectedUser, clearSelectedUser, addReviewToSelectedUser } =
  usersSlice.actions;

export default usersSlice.reducer;
