import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import AppNav from './AppNav'
import { Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import './App.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Login from './Login'
import Home from './Home'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import Error404 from './Error404'
import { Actions as AuthActions } from './Login/action'
import { Actions as HomeActions } from './Home/action'

export class App extends Component {
  componentDidMount() {
    const { getUserListRequest, getQuestionListRequest } = this.props
    getUserListRequest()
    getQuestionListRequest()
  }

  render() {
    const { loginUser } = this.props
    return (
      <div className='App'>
        <AppNav />
        <Container>
          <Row className='row'>
            <Col xs={12}>
              {loginUser ? (
                <Fragment>
                  <Switch>
                    <Route
                      exact
                      path='/'
                      render={() => <Redirect to='/question' />}
                    />
                    <Route
                      exact
                      path='/question/:questionId?'
                      component={Home}
                    />
                    <Route exact path='/add' component={NewQuestion} />
                    <Route exact path='/leaderboard' component={LeaderBoard} />
                    <Route component={Error404} />
                  </Switch>
                </Fragment>
              ) : (
                <Login />
              )}
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

App.propTypes = {
  getQuestionListRequest: PropTypes.func,
  getUserListRequest: PropTypes.func,
  loginUser: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
}

const mapStateToProps = (state) => {
  const { auth } = state
  return { ...auth }
}

export default connect(
  mapStateToProps,
  { ...AuthActions, ...HomeActions },
)(App)
