import { createReducer } from 'reduxsauce'
import { Types } from './action'

export const INITIAL_STATE = {
  questionForm: {
    optionOne: '',
    optionTwo: '',
  },
  newDataInserted: false,
}

export const changeQuestionForm = (state = INITIAL_STATE, action) => {
  const { questionForm } = state
  const { index, value } = action
  questionForm[index] = value
  return {
    ...state,
    questionForm: { ...questionForm },
  }
}

export const resetQuestionForm = () => {
  return INITIAL_STATE
}

export const submitQuestionRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
  }
}

export const submitQuestionSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    newDataInserted: true,
  }
}

export const submitQuestionFailure = (state = INITIAL_STATE, action) => {
  const { error } = action
  return {
    ...state,
    error,
  }
}

export const HANDLERS = {
  [Types.CHANGE_QUESTION_FORM]: changeQuestionForm,
  [Types.RESET_QUESTION_FORM]: resetQuestionForm,
  [Types.SUBMIT_QUESTION_REQUEST]: submitQuestionRequest,
  [Types.SUBMIT_QUESTION_SUCCESS]: submitQuestionSuccess,
  [Types.SUBMIT_QUESTION_FAILURE]: submitQuestionFailure,
}

const newQuestionReducer = createReducer(INITIAL_STATE, HANDLERS)
export default newQuestionReducer
