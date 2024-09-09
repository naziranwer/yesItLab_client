import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    formData: {},
    status: "idle",
    error: null,
  },
  reducers: {
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },

    setFormStatus: (state, action) => {
      state.status = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearFormData: (state) => {
      state.formData = {};
      state.status = "idle";
      state.error = null;
    },
  },
});

export const { setFormData, setFormStatus, setError, clearFormData } =
  formSlice.actions;

export default formSlice.reducer;
