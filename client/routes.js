import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import {me} from './store'
import MainClass from './components/MainClass'
import Attendance from './components/Attendance'
import {
  StudentDashboard,
  studentClassDashboard,
  moreClassInformationComponent,
  TeacherDashboard,
  TeacherClassboard,
  TeacherDash
} from './components' //already exported default in index.js

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/studentDashboard" component={StudentDashboard} />
        <Route path='/teacherDashboard' component={TeacherDashboard}/>
        <Route
          path="/studentClassDashboard"
          component={studentClassDashboard}
        />
        <Route
          path="/moreClassInformationComponent"
          component={moreClassInformationComponent}
        />
        <Route path="/TeacherClassboard" component={TeacherClassboard} />
        <Route path="/TeacherDash" component={TeacherDash} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />

            <Route path="/main" component={MainClass} />
            <Route path="/attendance" component={Attendance} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
