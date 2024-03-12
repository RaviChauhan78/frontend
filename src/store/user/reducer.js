import { CREATE_USER_ERROR, CREATE_USER_LOADING, CREATE_USER_SUCCESS, GET_USERS_ERROR, GET_USERS_LOADING, GET_USERS_SUCCESS } from "./actionTypes";

const initialState = {
    getUsers: {
        loading: false,
        data: null,
        error: null
    },
    createUser: {
        loading: false,
        data: null,
        error: null
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS_LOADING:
            return { ...state, getUsers: { ...state.getUsers, loading: true, data: null, error: null } };
        case GET_USERS_SUCCESS:
            return { ...state, getUsers: { ...state.getUsers, loading: false, data: action.payload, error: null } };
        case GET_USERS_ERROR:
            return { ...state, getUsers: { ...state.getUsers, loading: false, data: null, error: action.payload } };

        case CREATE_USER_LOADING:
            return { ...state, createUser: { ...state.createUser, loading: true, data: null, error: null } };
        case CREATE_USER_SUCCESS:
            return { ...state, createUser: { ...state.createUser, loading: false, data: action.payload, error: null } };
        case CREATE_USER_ERROR:
            return { ...state, createUser: { ...state.createUser, loading: false, data: null, error: action.payload } };

        default:
            return state;
    }
};

export default reducer;
