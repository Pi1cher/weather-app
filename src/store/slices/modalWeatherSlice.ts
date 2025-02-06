import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
  userId: string | null;
}

const initialState: ModalState = {
  isOpen: false,
  userId: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.userId = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.userId = null;
    },
  },
});

const { reducer: modalWeatherReducer, actions } = modalSlice;

const modalWeatherActions = {
  ...actions,
};
export { modalWeatherReducer, modalWeatherActions };
