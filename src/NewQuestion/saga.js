import { call, put, takeLatest, select } from 'redux-saga/effects'
import { Types } from './action'
import * as api from '../_DATA'
import { Actions as AuthActions } from '../Login/action'

function* savingQuestion() {
  try {
    const {
      newQuestion: { questionForm },
      auth: { loginUser },
    } = yield select((state) => state)
    yield call(api._saveQuestion, {
      author: loginUser.id,
      optionOneText: questionForm.optionOne,
      optionTwoText: questionForm.optionTwo,
    })
    yield put({
      type: Types.SUBMIT_QUESTION_SUCCESS,
    })
  } catch (e) {
    yield put({ type: Types.SUBMIT_QUESTION_FAILURE, error: e })
  }
}

function* refreshData() {
  yield put(AuthActions.getUserListRequest())
}

function* newQuestionSaga() {
  yield takeLatest(Types.SUBMIT_QUESTION_REQUEST, savingQuestion)
  yield takeLatest(Types.SUBMIT_QUESTION_SUCCESS, refreshData)
}

export default newQuestionSaga
