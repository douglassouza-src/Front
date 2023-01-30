import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../typeStore';

const initialState: Omit<User, 'recados'> = {
  email:"",
  name:"",
  password:"",
};

const userLoggedSlice = createSlice({
  name: "userLogged",
  initialState,
  reducers: {
    setUsuarioLogado: (state,action: PayloadAction<Omit<User, 'recados'>>) => { 
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.password = action.payload.password;
    },
    clearUsuarioLogado: (state) => {
      return initialState;
    }
  },
});


export const { setUsuarioLogado, clearUsuarioLogado } = userLoggedSlice.actions;
export const userLoggedReducer = userLoggedSlice.reducer;