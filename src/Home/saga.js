import { call, put, takeLatest, select } from 'redux-saga/effects'
import { Types, Actions } from './action'
import { Actions as AuthActions } from '../Login/action'
import * as api from '../_DATA'

function compareQuestion(q1, q2) {
  if (q1.timestamp < q2.timestamp) {
    return 1
  }
  if (q1.timestamp > q2.timestamp) {
    return -1
  }
  return 0
}

function* fetchQuestionList() {
  try {
    let questions = yield call(api._getQuestions)
    questions = Object.keys(questions).map(function(key) {
      questions[key].answerNow = 'optionOne'
      return questions[key]
    })
    questions.sort(compareQuestion)
    yield put({
      type: Types.GET_QUESTION_LIST_SUCCESS,
      questionList: questions,
    })
  } catch (e) {
    yield put({ type: Types.GET_QUESTION_LIST_FAILURE, error: e })
  }
}

function* refreshData() {
  yield put(Actions.getQuestionListRequest())
  yield put(AuthActions.getUserListRequest())
}

function* submitQuestionAnswer(action) {
  try {
    const {
      home: { questionList },
      auth: { loginUser },
    } = yield select((state) => state)
    const { questionId } = action
    const question = questionList.find((question) => question.id === questionId)
    yield call(api._saveQuestionAnswer, {
      authedUser: loginUser.id,
      qid: questionId,
      answer: question.answerNow,
    })
    yield put({
      type: Types.SUBMIT_QUESTION_ANSWER_SUCCESS,
    })
  } catch (e) {
    yield put({ type: Types.SUBMIT_QUESTION_ANSWER_FAILURE, error: e })
  }
}

function* homeSaga() {
  yield takeLatest(Types.GET_QUESTION_LIST_REQUEST, fetchQuestionList)
  yield takeLatest(Types.SUBMIT_QUESTION_ANSWER_REQUEST, submitQuestionAnswer)
  yield takeLatest(Types.SUBMIT_QUESTION_ANSWER_SUCCESS, refreshData)
}

export default homeSaga
