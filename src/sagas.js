import { all } from 'redux-saga/effects'
import loginSaga from './Login/saga'
import homeSaga from './Home/saga'
import newQuestionSaga from './NewQuestion/saga'

export default function* rootSaga() {
  yield all([loginSaga(), homeSaga(), newQuestionSaga()])
}
