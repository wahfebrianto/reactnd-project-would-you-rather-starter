import { createReducer } from 'reduxsauce'
import { Types } from './action'

export const INITIAL_STATE = {
  questionList: [],
  fetchingQuestionList: false,
  error: {},
  showUnanswered: true,
}

export const getQuestionListRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    fetchingQuestionList: true,
    showUnanswered: true,
  }
}

export const getQuestionListSuccess = (state = INITIAL_STATE, action) => {
  const { questionList } = action
  return {
    ...state,
    fetchingQuestionList: false,
    questionList,
  }
}

export const getQuestionListFailure = (state = INITIAL_STATE, action) => {
  const { error } = action
  return {
    ...state,
    fetchingQuestionList: false,
    error,
  }
}

export const changeQuestionFilter = (state = INITIAL_STATE) => {
  const { showUnanswered } = state
  return {
    ...state,
    showUnanswered: !showUnanswered,
  }
}

export const chooseQuestionAnswer = (state = INITIAL_STATE, action) => {
  const { questionList } = state
  const { questionId, answer } = action
  const questionIndex = questionList.findIndex(
    (question) => question.id === questionId,
  )
  questionList[questionIndex].answerNow = answer
  return {
    ...state,
    questionList: [...questionList.map((question) => ({ ...question }))],
  }
}

export const submitQuestionAnswerRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
  }
}

export const submitQuestionAnswerSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
  }
}

export const submitQuestionAnswerFailure = (state = INITIAL_STATE, action) => {
  const { error } = action
  return {
    ...state,
    error,
  }
}

export const HANDLERS = {
  [Types.GET_QUESTION_LIST_REQUEST]: getQuestionListRequest,
  [Types.GET_QUESTION_LIST_SUCCESS]: getQuestionListSuccess,
  [Types.GET_QUESTION_LIST_FAILURE]: getQuestionListFailure,
  [Types.CHANGE_QUESTION_FILTER]: changeQuestionFilter,
  [Types.CHOOSE_QUESTION_ANSWER]: chooseQuestionAnswer,
  [Types.SUBMIT_QUESTION_ANSWER_REQUEST]: submitQuestionAnswerRequest,
  [Types.SUBMIT_QUESTION_ANSWER_SUCCESS]: submitQuestionAnswerSuccess,
  [Types.SUBMIT_QUESTION_ANSWER_FAILURE]: submitQuestionAnswerFailure,
}

const homeReducer = createReducer(INITIAL_STATE, HANDLERS)
export default homeReducer
