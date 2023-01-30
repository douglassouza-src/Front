import { combineReducers } from 'redux';
import { recadosReducer } from './recados/recadoSlice';
import {userLoggedReducer} from './userLogged/userLoggedSlice';
import { usersReducer } from './users/userSlice';



const rootReducer = combineReducers({
  users: usersReducer,
  userLogged: userLoggedReducer,
  recados: recadosReducer,
});

export { rootReducer };