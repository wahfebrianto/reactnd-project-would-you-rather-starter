import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Actions } from '../Login/action'
import { Link } from 'react-router-dom'

export class AppNav extends Component {
  static propTypes = {
    loginUser: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    logout: PropTypes.func,
  }

  render() {
    const { loginUser } = this.props
    const { logout } = this.props
    return (
      <Navbar bg='primary' variant='dark'>
        <Nav className='mr-auto' variant='pills'>
          <Nav.Item>
            <Link to='/question'>Home</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to='/add'>New Question</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to='/leaderboard'>Leader Board</Link>
          </Nav.Item>
        </Nav>
        {loginUser ? (
          <Nav variant='pills'>
            <Navbar.Text>Hello, {loginUser.name}</Navbar.Text>
            <Navbar.Text>
              <img
                src={loginUser.avatarURL}
                width='25'
                alt='avatar'
                className='avatar'
              />
            </Navbar.Text>
            <Navbar.Text onClick={logout}>Logout</Navbar.Text>
          </Nav>
        ) : (
          ''
        )}
      </Navbar>
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
)(AppNav)
