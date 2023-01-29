import { combineReducers } from "redux";
import chatReducer from "./chatReducer";
import contactReducer from "./contactReducer";
import fileReducer from "./fileReducer";
import postReducer from "./postReducer";
import signupReducer from "./signupReducer";
import userReducer from "./userReducer";

export const rootReducer = combineReducers({
    post: postReducer,
    user: userReducer,
    signup: signupReducer,
    chat: chatReducer,
    file: fileReducer,
    contact: contactReducer
})

export type RootState = ReturnType<typeof rootReducer>