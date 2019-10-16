import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions(
  {
    changeQuestionForm: ['index', 'value'],
    resetQuestionForm: [],
    submitQuestionRequest: [],
    submitQuestionSuccess: [],
    submitQuestionFailure: ['error'],
  },
  {},
)

export { Types, Creators as Actions }
