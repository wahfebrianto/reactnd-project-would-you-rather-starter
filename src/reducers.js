import { combineReducers } from 'redux'
import loginReducer from './Login/reducer'
import homeReducer from './Home/reducer'
import newQuestionReducer from './NewQuestion/reducer'

const rootReducer = combineReducers({
  auth: loginReducer,
  home: homeReducer,
  newQuestion: newQuestionReducer,
})

export default rootReducer
