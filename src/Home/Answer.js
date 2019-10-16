import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import ProgressBar from 'react-bootstrap/ProgressBar'

export default class Answer extends Component {
  static propTypes = {
    label: PropTypes.string,
    selected: PropTypes.bool,
    totalVotes: PropTypes.number,
    votes: PropTypes.number,
  }

  render() {
    const { label, votes, totalVotes, selected } = this.props
    const percentage = (votes / totalVotes) * 100
    return (
      <Card className={`answer-option ${selected && 'selected'}`}>
        <Card.Body>
          <Card.Title>{`Would you rather ${label}`}</Card.Title>
          <Card.Subtitle>
            <ProgressBar
              animated
              striped
              variant='success'
              label={`${percentage.toFixed(2)}%`}
              now={percentage}
            />
          </Card.Subtitle>
          <Card.Text
            className={'text-center'}
          >{`${votes} out of ${totalVotes} votes`}</Card.Text>
        </Card.Body>
      </Card>
    )
  }
}
