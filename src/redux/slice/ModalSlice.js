import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  modalInfo: null
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true
      state.modalInfo = action.payload
    },

    closeModal: (state) => {
      state.isOpen = false
    }
  }
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer
