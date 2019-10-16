import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Actions } from './action'
import Answer from './Answer'
import { Link } from 'react-router-dom'

export class Question extends Component {
  static propTypes = {
    chooseQuestionAnswer: PropTypes.func,
    loginUser: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    open: PropTypes.bool,
    question: PropTypes.object,
    submitQuestionAnswerRequest: PropTypes.func,
    userList: PropTypes.arrayOf(PropTypes.object),
  }

  render() {
    const { userList, question, loginUser, open } = this.props
    const { chooseQuestionAnswer, submitQuestionAnswerRequest } = this.props
    const askingUser = userList.find((user) => user.id === question.author)
    const answered =
      Object.keys(loginUser.answers).includes(question.id) &&
      loginUser.answers[question.id]
    const cardTitle = answered
      ? `Asked by ${askingUser && askingUser.name}`
      : `${askingUser && askingUser.name} asks:`
    const totalVotes =
      question.optionOne.votes.length + question.optionTwo.votes.length
    return (
      <Card>
        <Card.Header>
          <h6 className='pull-left'>{cardTitle}</h6>
        </Card.Header>

        <Card.Body className='text-center'>
          <Row>
            <Col
              sm={4}
              className='question-avatar-container d-flex justify-content-center'
            >
              <img
                src={askingUser && askingUser.avatarURL}
                width='200'
                alt='avatar'
              />
            </Col>
            <Col
              sm={8}
              className='question-question-container d-flex flex-column justify-content-between'
            >
              {!open ? (
                <Fragment>
                  <h2>Would You Rather ...</h2>
                  ... {question.optionOne.text} ...
                  <Link to={`/question/${question.id}`}>
                    <Button variant='success' className='col-12'>
                      View Poll
                    </Button>
                  </Link>
                </Fragment>
              ) : answered ? (
                <Fragment>
                  <h2>Result</h2>
                  <Answer
                    label={question.optionOne.text}
                    votes={question.optionOne.votes.length}
                    totalVotes={totalVotes}
                    selected={answered === 'optionOne'}
                  />
                  <Answer
                    label={question.optionTwo.text}
                    votes={question.optionTwo.votes.length}
                    totalVotes={totalVotes}
                    selected={answered === 'optionTwo'}
                  />
                </Fragment>
              ) : (
                <Fragment>
                  <h2>Would You Rather ...</h2>
                  <Form>
                    <Form.Group>
                      <Form.Check
                        inline
                        name={question.id}
                        label={question.optionOne.text}
                        value='optionOne'
                        type='radio'
                        id={`${question.id}-1`}
                        checked={question.answerNow === 'optionOne'}
                        onClick={() =>
                          chooseQuestionAnswer(question.id, 'optionOne')
                        }
                        onChange={() => {}}
                      />
                      <br />
                      <Form.Check
                        inline
                        name={question.id}
                        label={question.optionTwo.text}
                        value='optionTwo'
                        type='radio'
                        id={`${question.id}-2`}
                        checked={question.answerNow === 'optionTwo'}
                        onClick={() =>
                          chooseQuestionAnswer(question.id, 'optionTwo')
                        }
                        onChange={() => {}}
                      />
                    </Form.Group>
                    <Button
                      variant='success'
                      className='col-12'
                      onClick={() => submitQuestionAnswerRequest(question.id)}
                    >
                      Submit
                    </Button>
                  </Form>
                </Fragment>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  const { auth } = state
  return { ...auth }
}

export default connect(
  mapStateToProps,
  Actions,
)(Question)
