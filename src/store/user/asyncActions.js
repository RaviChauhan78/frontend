import { createUserError, createUserLoading, createUserSuccess, getUsersError, getUsersLoading, getUsersSuccess } from './actions';
import api from '../api';
import { toast } from 'react-toastify';

const getUsersAction = (page, size, filter) => {
  return async (dispatch) => {
    try {
      // Start the loading state
      dispatch(getUsersLoading());

      // Perform the asynchronous operation (e.g., API call)
      // const filterData = `&from=${filter?.from}&to=${filter?.to}&name=${filter?.name}&mobile=${filter?.mobile}&status=${filter?.status}`;
      const response = await api.get(`userlist`);
      const data = response.data;

      // Dispatch success action with the received data
      dispatch(getUsersSuccess(data));
      if (data?.success === false) {
        toast.error(data?.message);
      }
    } catch (error) {
      // Dispatch error action if an error occurs
      dispatch(getUsersError(error.message));
      toast.error(error?.response?.data?.message);
    }
  };
};

const createUserAction = (postData) => {
  return async (dispatch) => {
    try {
      // Start the loading state
      dispatch(createUserLoading());

      // Perform the asynchronous operation (e.g., API call)
      const response = await api.post('register', postData);
      const data = response.data;

      // Dispatch success action with the received data
      dispatch(createUserSuccess(data));
      if (data?.status) {
      }
      if (data?.success === true) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      // Dispatch error action if an error occurs
      dispatch(createUserError(error.message));
      toast.error(error?.response?.data?.message);
    }
  };
};

export {
  getUsersAction,
  createUserAction
};
