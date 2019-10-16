import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class RankCard extends Component {
  static propTypes = {
    user: PropTypes.object,
  }

  render() {
    const { user } = this.props
    return (
      <Card>
        <Card.Body className='text-center'>
          <Row>
            <Col
              sm={3}
              className='leaderboard-avatar-container d-flex justify-content-center'
            >
              <img src={user && user.avatarURL} width='150' alt='avatar' />
            </Col>
            <Col
              sm={6}
              className='leaderboard-detail-container d-flex flex-column justify-content-between'
            >
              <h3>{user && user.name}</h3>
              <Row>
                <Col sm={10}>
                  <h5>Answered Questions</h5>
                </Col>
                <Col sm={2}>
                  <h5>{user && user.totalAnswers}</h5>
                </Col>
              </Row>
              <Row>
                <Col sm={10}>
                  <h5>Created Questions</h5>
                </Col>
                <Col sm={2}>
                  <h5>{user && user.totalQuestions}</h5>
                </Col>
              </Row>
            </Col>
            <Col
              sm={3}
              className='leaderboard-score-container d-flex justify-content-center'
            >
              <Card>
                <Card.Header>Score</Card.Header>
                <Card.Body>
                  <h1>{user && user.totalScore}</h1>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
  }
}
