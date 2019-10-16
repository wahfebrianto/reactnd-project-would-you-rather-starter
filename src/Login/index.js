import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Actions } from './action'

export class Login extends Component {
  static propTypes = {
    fetchingUserList: PropTypes.bool,
    getUserListRequest: PropTypes.func,
    login: PropTypes.func,
    selectUser: PropTypes.func,
    selectedUser: PropTypes.object,
    userList: PropTypes.arrayOf(PropTypes.object),
  }

  componentDidMount() {
    const { getUserListRequest } = this.props
    getUserListRequest()
  }

  handleOnSelect = (e) => {
    const { userList, selectUser } = this.props
    const selectedId = e.target.value
    const selectedUser = userList.find((user) => user.id === selectedId)
    selectUser(selectedUser)
  }

  render() {
    const { userList, selectedUser, fetchingUserList } = this.props
    const { login } = this.props
    return (
      <Card className='login-card'>
        <Card.Header>
          <h5>Welcome to the Would You Rather App!</h5>
          Please sign in to continue
        </Card.Header>
        <Card.Body className='text-center'>
          <img src='/logo.svg' width='200' alt='logo' />
          {!fetchingUserList && userList && userList.length > 1 ? (
            <Form>
              <Form.Group>
                <Form.Control
                  as='select'
                  className='selectpicker'
                  onChange={this.handleOnSelect}
                  value={selectedUser && selectedUser.id}
                >
                  {userList.map((user, index) => (
                    <option
                      key={index}
                      data-thumbnail={user.avatarURL}
                      value={user.id}
                    >
                      {user.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button variant='success' className='col-12' onClick={login}>
                Login
              </Button>
            </Form>
          ) : (
            ''
          )}
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
)(Login)
