import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface GroupState {
  groupName: string;
}

const initialState: GroupState = {
  groupName: "",
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setGroupName: (state, action: PayloadAction<string>) => {
      state.groupName = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setGroupName } = groupSlice.actions;

export default groupSlice;
