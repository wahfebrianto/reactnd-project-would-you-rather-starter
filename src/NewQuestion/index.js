import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Actions } from './action'

export class NewQuestion extends Component {
  static propTypes = {
    changeQuestionForm: PropTypes.func,
    newDataInserted: PropTypes.bool,
    resetQuestionForm: PropTypes.func,
    submitQuestionRequest: PropTypes.func,
  }

  componentDidMount() {
    const { resetQuestionForm } = this.props
    resetQuestionForm()
  }

  render() {
    const { newDataInserted } = this.props
    const { changeQuestionForm, submitQuestionRequest } = this.props
    return (
      <Card className='text-center'>
        {newDataInserted && <Redirect to='/question' />}
        <Card.Header>
          <h3>Create New Question</h3>
        </Card.Header>
        <Card.Body>
          <h6 className='text-left'>Complete the question:</h6>
          <h4 className='text-left'>Would you rather ...</h4>
          <Form>
            <Form.Control
              type='text'
              placeholder='Enter Option One Text Here'
              onBlur={(e) => changeQuestionForm('optionOne', e.target.value)}
            />
            <h5>OR</h5>
            <Form.Control
              type='text'
              placeholder='Enter Option Two Text Here'
              onBlur={(e) => changeQuestionForm('optionTwo', e.target.value)}
            />
            <br />
            <Button
              variant='success'
              className='col-12'
              onClick={submitQuestionRequest}
            >
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  const { newQuestion } = state
  return { ...newQuestion }
}

export default connect(
  mapStateToProps,
  Actions,
)(NewQuestion)
