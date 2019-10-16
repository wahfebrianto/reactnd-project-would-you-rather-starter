import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RankCard from './RankCard'
import { Actions } from '../Login/action'

export class LeaderBoard extends Component {
  static propTypes = {
    getUserListRequest: PropTypes.func,
    userList: PropTypes.arrayOf(PropTypes.object),
  }

  componentDidMount() {
    const { getUserListRequest } = this.props
    getUserListRequest()
  }

  render() {
    const { userList } = this.props
    return (
      <Fragment>
        {userList &&
          userList.map((user) => <RankCard user={user} key={user.id} />)}
      </Fragment>
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
)(LeaderBoard)
