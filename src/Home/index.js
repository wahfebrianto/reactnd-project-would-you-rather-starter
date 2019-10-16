import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Question from './Question'
import { Actions } from './action'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'

export class Home extends Component {
  static propTypes = {
    changeQuestionFilter: PropTypes.func,
    getQuestionListRequest: PropTypes.func,
    loginUser: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    match: PropTypes.object,
    questionList: PropTypes.arrayOf(PropTypes.object),
    showUnanswered: PropTypes.bool,
  }

  componentDidMount() {
    const { getQuestionListRequest } = this.props
    getQuestionListRequest()
  }

  render() {
    const { questionId } = this.props.match.params
    const { questionList, showUnanswered, loginUser } = this.props
    const { changeQuestionFilter } = this.props
    const showedQuestions = questionId
      ? questionList.filter((question) => question.id === questionId)
      : showUnanswered
      ? questionList.filter(
          (question) => !Object.keys(loginUser.answers).includes(question.id),
        )
      : questionList.filter((question) =>
          Object.keys(loginUser.answers).includes(question.id),
        )
    return (
      <div>
        {questionId && showedQuestions.length === 0 && <Redirect to='/error' />}
        {!questionId && (
          <ToggleButtonGroup
            type='checkbox'
            value={showUnanswered}
            onChange={changeQuestionFilter}
            className='col-12'
          >
            <ToggleButton
              variant={!showUnanswered ? 'outline-primary' : 'primary'}
            >
              Unanswered
            </ToggleButton>
            <ToggleButton
              variant={showUnanswered ? 'outline-primary' : 'primary'}
            >
              Answered
            </ToggleButton>
          </ToggleButtonGroup>
        )}
        {showedQuestions.map((question) => {
          return (
            <Question
              question={question}
              key={question.id}
              open={!!questionId}
            />
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { home, auth } = state
  return { ...home, loginUser: auth.loginUser }
}

export default connect(
  mapStateToProps,
  Actions,
)(Home)
