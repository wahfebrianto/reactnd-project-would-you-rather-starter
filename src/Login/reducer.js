import { createReducer } from 'reduxsauce'
import { Types } from './action'

export const INITIAL_STATE = {
  userList: [],
  fetchingUserList: false,
  error: {},
  selectedUser: {},
  loginUser: '',
}

export const getUserListRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    fetchingUserList: true,
  }
}

export const getUserListSuccess = (state = INITIAL_STATE, action) => {
  const { loginUser } = state
  const { userList } = action
  return {
    ...state,
    fetchingUserList: false,
    userList,
    selectedUser: loginUser ? {} : userList && userList[0],
    loginUser: loginUser
      ? userList && userList.find((user) => user.id === loginUser.id)
      : '',
  }
}

export const getUserListFailure = (state = INITIAL_STATE, action) => {
  const { error } = action
  return {
    ...state,
    fetchingUserList: false,
    error,
  }
}

export const selectUser = (state = INITIAL_STATE, action) => {
  const { selectedUser } = action
  return {
    ...state,
    selectedUser,
  }
}

export const login = (state = INITIAL_STATE) => {
  const { selectedUser } = state
  return {
    ...state,
    loginUser: { ...selectedUser },
    selectedUser: {},
  }
}

export const logout = (state = INITIAL_STATE) => {
  return {
    ...state,
    loginUser: '',
  }
}

export const HANDLERS = {
  [Types.GET_USER_LIST_REQUEST]: getUserListRequest,
  [Types.GET_USER_LIST_SUCCESS]: getUserListSuccess,
  [Types.GET_USER_LIST_FAILURE]: getUserListFailure,
  [Types.SELECT_USER]: selectUser,
  [Types.LOGIN]: login,
  [Types.LOGOUT]: logout,
}

const loginReducer = createReducer(INITIAL_STATE, HANDLERS)
export default loginReducer
