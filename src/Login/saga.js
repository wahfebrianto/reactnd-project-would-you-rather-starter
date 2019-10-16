import { call, put, takeLatest } from 'redux-saga/effects'
import { Types } from './action'
import * as api from '../_DATA'

function compareUser(u1, u2) {
  if (u1.totalScore < u2.totalScore) {
    return 1
  }
  if (u1.totalScore > u2.totalScore) {
    return -1
  }
  return 0
}

function* fetchUserList() {
  try {
    let users = yield call(api._getUsers)
    users = Object.keys(users).map(function(key, index) {
      users[key].totalQuestions = users[key].questions.length
      users[key].totalAnswers = Object.keys(users[key].answers).length
      users[key].totalScore =
        users[key].totalQuestions + users[key].totalAnswers
      return users[key]
    })
    users.sort(compareUser)
    yield put({
      type: Types.GET_USER_LIST_SUCCESS,
      userList: users,
    })
  } catch (e) {
    yield put({ type: Types.GET_USER_LIST_FAILURE, error: e })
  }
}

function* loginSaga() {
  yield takeLatest(Types.GET_USER_LIST_REQUEST, fetchUserList)
}

export default loginSaga
