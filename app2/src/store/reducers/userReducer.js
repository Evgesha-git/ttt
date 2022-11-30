const initialState = {
    user: null,
    loading: false,
    error: null
}

export const UserActionType = {
    FETCH_USER: "FETCH_USER",
    SUCCESS_USER: "SUCCESS_USER",
    REGISTER_USER: "REGISTER_USER",
    LOGOUT_USER: "LOGOUT_USER",
    SET_GAME: "SET_GAME",
    ERROR_USER: "ERROR_USER"
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case UserActionType.FETCH_USER:
            return { user: state.user, error: null, loading: true };
        case UserActionType.SUCCESS_USER:
            return { user: action.payload, loading: false, error: null };
        case UserActionType.REGISTER_USER:
            return { user: action.payload, error: null, loading: false };
        case UserActionType.LOGOUT_USER:
            return { user: null, loading: false, error: null };
        case UserActionType.SET_GAME:
            return { user: state.user, loading: false, error: null }
        case UserActionType.ERROR_USER:
            return { user: null, loading: false, error: action.payload };
        default:
            return state
    }
}