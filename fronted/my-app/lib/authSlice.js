import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState = { selectedCategory: 'All'};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
 
    setSelectedCategory: (state, action) => {
      console.log("sdd",action.payload)
           state.selectedCategory = action.payload;
    },
  },
});

export const { setSelectedCategory } = authSlice.actions;
export default authSlice.reducer;
