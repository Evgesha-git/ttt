import { UserActionType } from "../reducers/userReducer";
import { auth } from "../../utils/firebase-config";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { child, get, ref, set, update } from "firebase/database";
import { database } from "../../utils/firebase-config";
import { async } from "@firebase/util";


export const loginAction = (email, password) => {
    return async (dispatch) => {
        dispatch({ type: UserActionType.FETCH_USER });
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            const userData = await get(child(ref(database), `users/${user.user.uid}`));
            console.log(userData.val());
            if (userData.exists()) {
                dispatch({ type: UserActionType.SUCCESS_USER, payload: userData.val() });
            } else {
                throw new Error()
            }
        } catch (e) {
            dispatch({ type: UserActionType.ERROR_USER, payload: e.message });
        }
    }
}
export const logOut = () => {
    return async (dispatch) => {
        dispatch({ type: UserActionType.FETCH_USER });
        try {
            const user = await signOut(auth);
            dispatch({ type: UserActionType.LOGOUT_USER });
        } catch (e) {
            dispatch({ type: UserActionType.ERROR_USER, payload: e.message });
        }
    }
}

export const registerAction = (email, passwoord, login) => {
    return async (dispatch) => {
        dispatch({ type: UserActionType.FETCH_USER });
        try {
            const user = await createUserWithEmailAndPassword(auth, email, passwoord);
            await set(ref(database, `users/${user.user.uid}`), {
                games: [],
                wins: 0,
                falls: 0,
                name: user.user.email,
                userId: user.user.uid,
            });

            const userData = await get(child(ref(database), `users/${user.user.uid}`));
            console.log(userData.val());

            dispatch({ type: UserActionType.REGISTER_USER, payload: userData.val() });
        } catch (e) {
            dispatch({ type: UserActionType.ERROR_USER, payload: e.message });
        }
    }
}

export const addGames = (id, user, game, type) => {
    return async (dispatch) => {
        dispatch({ type: UserActionType.FETCH_USER });
        try {
            const response = await get(child(ref(database), `users/${id}`));
            if (response.exists()) {
                const oldGames = response.val();
                if (oldGames.games) {
                    oldGames.games = [...oldGames.games, game];
                } else {
                    oldGames.games = [game];
                }
                type ? oldGames.wins += 1 : oldGames.falls += 1;
                await update(ref(database, `users/${id}`), oldGames);
                dispatch({ type: UserActionType.SET_GAME, payload: 'Данные успешно отправлены' });
            } else {
                throw new Error()
            }
        } catch (e) {
            dispatch({ type: UserActionType.ERROR_USER, payload: e.message })
        }
    }
}

