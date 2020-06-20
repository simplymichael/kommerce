import { fromJS } from 'immutable';
import { initialState } from '../../store/users/reducer';
import {
  reducer,
  createUser,
  loginUser,
  fetchCurrentUser,
} from '../../store/users';
import {
  createUserError,
  createUserSuccess,
  loginUserError,
  loginUserSuccess,
  fetchCurrentUserError,
  fetchCurrentUserSuccess,
} from '../../store/users/actions';
import {
  CREATE_USER,
  CREATE_USER_ERROR,
  CREATE_USER_SUCCESS,
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  FETCH_CURRENT_USER,
  FETCH_CURRENT_USER_ERROR,
  FETCH_CURRENT_USER_SUCCESS,
} from '../../store/users/constants';
import Service from '../../services/Service';

const userService = Service.getService('UserService');
const newUser = {
  name: 'James',
  email: 'james@kommerce.com',
  password: 'secret',
};
const stateTree = {
  user: {},
  isLoggingIn: false,
  loginError: null,
  isCreatingUser: false,
  createUserError: null,
  isFetchingCurrentUser: false,
  fetchCurrentUserError: null,
};

describe('Store:Users', () => {
  describe('actions and reducers', () => {
    it('return the initial state', () => {
      expect(initialState).toEqual(fromJS(stateTree));
    });

    test('action: CREATE_USER updates "isCreatingUser" from false to true', () => {
      expect(reducer(initialState, createUser(newUser))).toEqual(fromJS({
        ...stateTree,
        isCreatingUser: true,
      }));
    });

    test('action: CREATE_USER_ERROR sets "createUserError" to specified error', () => {
      const error = new Error('Failed to create user');

      expect(reducer(initialState, createUserError(error))).toEqual(fromJS({
        ...stateTree,
        createUserError: error,
      }));
    });

    test('action: CREATE_USER_SUCCESS sets the user to the supplied user', () => {
      expect(reducer(initialState, createUserSuccess(newUser))).toEqual(fromJS({
        ...stateTree,
        user: newUser,
      }));
    });

    test('action: LOGIN updates "isLoggingIn" from false to true', () => {
      expect(reducer(initialState, loginUser(newUser))).toEqual(fromJS({
        ...stateTree,
        isLoggingIn: true,
      }));
    });

    test('action: LOGIN_ERROR sets "loginError" to specified error', () => {
      const error = new Error('Failed to log user in');

      expect(reducer(initialState, loginUserError(error))).toEqual(fromJS({
        ...stateTree,
        loginError: error,
      }));
    });

    test('action: LOGIN_SUCCESS sets the user to the supplied user', () => {
      expect(reducer(initialState, loginUserSuccess(newUser))).toEqual(fromJS({
        ...stateTree,
        user: newUser,
      }));
    });

    test('action: FETCH_CURRENT_USER updates "isFetchingCurrentUser" from false to true', () => {
      expect(reducer(initialState, fetchCurrentUser())).toEqual(fromJS({
        ...stateTree,
        isFetchingCurrentUser: true,
      }));
    });

    test('action: FETCH_CURRENT_USER_ERROR sets "fetchCurrentUserError" to specified error', () => {
      const error = new Error('Failed to fetch current user\'s data');

      expect(reducer(initialState, fetchCurrentUserError(error))).toEqual(fromJS({
        ...stateTree,
        fetchCurrentUserError: error,
      }));
    });

    test('action: FETCH_CURRENT_USER_SUCCESS sets the current user to the supplied user', () => {
      expect(reducer(initialState, fetchCurrentUserSuccess(newUser))).toEqual(fromJS({
        ...stateTree,
        user: newUser,
      }));
    });

  });

  describe('createUser() sagas and dispatch calls', () => {
    const mockCreateUser = async (dispatch, user, error) => {
      dispatch(createUser(user));

      try {
        if(error) {
          throw error;
        }

        dispatch(createUserSuccess(user));
      } catch(err) {
        dispatch(createUserError(err.toString()));
      }
    };

    it('dispatches "createUserSuccess(user) on success', async () => {
      const mockDispatch = jest.fn();
      const expectedActions = [
        [{
          type: CREATE_USER,
          payload: { user: newUser }
        }],
        [{
          type: CREATE_USER_SUCCESS,
          payload: { user: newUser }
        }],
      ];

      await mockCreateUser(mockDispatch, newUser);

      expect(mockDispatch.mock.calls).toEqual(expectedActions);
    });

    it('dispatches "createUserError(thrownError)" on error', async () => {
      const error = new Error('Network error');
      const mockDispatch = jest.fn();

      const expectedActions = [
        [{
          type: CREATE_USER,
          payload: { user: newUser }
        }],
        [{
          type: CREATE_USER_ERROR,
          error: error.toString()
        }],
      ];

      await mockCreateUser(mockDispatch, newUser, error);

      expect(mockDispatch.mock.calls).toEqual(expectedActions);
    });
  });

  describe('loginUser() sagas and dispatch calls', () => {
    const mockLoginUser = async (dispatch, user, error) => {
      dispatch(loginUser(user));

      try {
        if(error) {
          throw error;
        }

        dispatch(loginUserSuccess(user));
      } catch(err) {
        dispatch(loginUserError(err.toString()));
      }
    };

    it('dispatches "loginUserSuccess(user) on success', async () => {
      const mockDispatch = jest.fn();
      const expectedActions = [
        [{
          type: LOGIN,
          payload: { user: newUser }
        }],
        [{
          type: LOGIN_SUCCESS,
          payload: { user: newUser }
        }],
      ];

      await mockLoginUser(mockDispatch, newUser);

      expect(mockDispatch.mock.calls).toEqual(expectedActions);
    });

    it('dispatches "loginUserError(thrownError)" on error', async () => {
      const error = new Error('Network error');
      const mockDispatch = jest.fn();

      const expectedActions = [
        [{
          type: LOGIN,
          payload: { user: newUser }
        }],
        [{
          type: LOGIN_ERROR,
          error: error.toString()
        }],
      ];

      await mockLoginUser(mockDispatch, newUser, error);

      expect(mockDispatch.mock.calls).toEqual(expectedActions);
    });
  });

  describe('fetchCurrentUser() sagas and dispatch calls', () => {
    const mockFetchCurrentUser = async dispatch => {
      dispatch(fetchCurrentUser());

      try {
        dispatch(fetchCurrentUserSuccess(
          await userService.getCurrentUser()
        ));
      } catch(err) {
        dispatch(fetchCurrentUserError(err.toString()));
      }
    };

    it('dispatches "fetchCurrentUserSuccess(user) on success', async () => {
      const mockDispatch = jest.fn();
      const spy = jest
        .spyOn(userService, 'getCurrentUser')
        .mockImplementation(() => Promise.resolve(newUser));
      const expectedActions = [
        [{ type: FETCH_CURRENT_USER }],
        [{
          type: FETCH_CURRENT_USER_SUCCESS,
          payload: { user: newUser }
        }],
      ];

      expect(spy).not.toHaveBeenCalled();

      await mockFetchCurrentUser(mockDispatch);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(mockDispatch.mock.calls).toEqual(expectedActions);

      userService.getCurrentUser.mockRestore();
    });

    it('dispatches "fetchCurrentUserError(thrownError)" on error', async () => {
      const error = new Error('Network error');
      const mockDispatch = jest.fn();
      const spy = jest
        .spyOn(userService, 'getCurrentUser')
        .mockImplementation(() => {
          throw error;
        });
      const expectedActions = [
        [{ type: FETCH_CURRENT_USER }],
        [{
          type: FETCH_CURRENT_USER_ERROR,
          error: error.toString()
        }],
      ];

      expect(spy).not.toHaveBeenCalled();

      await mockFetchCurrentUser(mockDispatch);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(mockDispatch.mock.calls).toEqual(expectedActions);

      userService.getCurrentUser.mockRestore();
    });
  });
});
