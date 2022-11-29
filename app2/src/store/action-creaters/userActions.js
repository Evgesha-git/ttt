import {UserActionType} from "../reducers/userReducer";
import {auth} from "../../utils/firebase-config";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from "firebase/auth";
import {ref, set} from "firebase/database";
import {database} from "../../utils/firebase-config";


export const loginAction = (email, password) => {
    return async (dispatch) => {
        dispatch({type: UserActionType.FETCH_USER});
        try{
            const user = await signInWithEmailAndPassword(auth, email, password);
            dispatch({type: UserActionType.SUCCESS_USER, payload: user});
        }catch (e){
            dispatch({type: UserActionType.ERROR_USER, payload: e.message});
        }
    }
}
export const logOut = () => {
    return async (dispatch) => {
        dispatch({type: UserActionType.FETCH_USER});
        try{
            const user = await signOut(auth);
            dispatch({type: UserActionType.LOGOUT_USER});
        }catch (e){
            dispatch({type: UserActionType.ERROR_USER, payload: e.message});
        }
    }
}

export const registerAction = (email, passwoord, login) => {
    return async (dispatch) => {
        dispatch({type: UserActionType.FETCH_USER});
        try{
            const user = await createUserWithEmailAndPassword(auth, email, passwoord,login);
            console.log(user);
            set(ref(database, `users/${user.user.uid}`), {
                games: 0,
                wins: 0,
                falls: 0,
                name: user.user.email,
            });
            dispatch({type: UserActionType.REGISTER_USER, payload: user});
        }catch (e){
            dispatch({type: UserActionType.ERROR_USER, payload: e.message});
        }
    }
}