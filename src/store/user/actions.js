import { CREATE_USER_ERROR, CREATE_USER_LOADING, CREATE_USER_SUCCESS, GET_USERS_ERROR, GET_USERS_LOADING, GET_USERS_SUCCESS } from './actionTypes';

// Get Users
const getUsersLoading = () => {
  return {
    type: GET_USERS_LOADING,
  };
};

const getUsersSuccess = (data) => {
  return {
    type: GET_USERS_SUCCESS,
    payload: data,
  };
};

const getUsersError = (error) => {
  return {
    type: GET_USERS_ERROR,
    payload: error,
  };
};

// Create User
const createUserLoading = () => {
  return {
    type: CREATE_USER_LOADING,
  };
};

const createUserSuccess = (data) => {
  return {
    type: CREATE_USER_SUCCESS,
    payload: data,
  };
};

const createUserError = (error) => {
  return {
    type: CREATE_USER_ERROR,
    payload: error,
  };
};

export {
  getUsersLoading,
  getUsersSuccess,
  getUsersError,

  createUserLoading,
  createUserSuccess,
  createUserError,
};
