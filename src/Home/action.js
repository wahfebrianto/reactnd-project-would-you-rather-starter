import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions(
  {
    getQuestionListRequest: [],
    getQuestionListSuccess: ['questionList'],
    getQuestionListFailure: ['error'],
    changeQuestionFilter: [],
    chooseQuestionAnswer: ['questionId', 'answer'],
    submitQuestionAnswerRequest: ['questionId'],
    submitQuestionAnswerSuccess: [],
    submitQuestionAnswerFailure: ['error'],
  },
  {},
)

export { Types, Creators as Actions }
