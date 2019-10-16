import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions(
  {
    getUserListRequest: [],
    getUserListSuccess: ['userList'],
    getUserListFailure: ['error'],
    selectUser: ['selectedUser'],
    login: [],
    logout: [],
  },
  {},
)

export { Types, Creators as Actions }
