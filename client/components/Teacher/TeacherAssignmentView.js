import React, {Component} from 'react'
import {getUserCoursesThunk} from '../../store/user'
import {connect} from 'react-redux'
import {
  getAssignmentsByCourseIdThunk,
  removeAssignmentThunk
} from '../../store/assignment'
import moment from 'moment' // so we can format the due date
import {ShowStudents} from '../index'

export class TeacherAssignmentView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 'all',
      allAssignments: [],
      showStudents: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  toggle(e) {
    e.preventDefault()
    this.setState({showStudents: !this.state.showStudents})
  }

  handleChange(e) {
    let selectedValue = e.target.value
    this.setState({
      selected: selectedValue
    })
  }

  async componentDidMount() {
    try {
      await this.props.getAssignmentsForCourse(this.props.courseIdInherited)
      this.setState({allAssignments: this.props.task.assignment.assignments})
    } catch (err) {
      console.log(err)
    }
  }

  componentDidUpdate() {
    if (
      this.state.allAssignments.length !==
      this.props.task.assignment.assignments.length
    ) {
      this.setState({allAssignments: this.props.task.assignment.assignments})
    }
  }

  render() {
    return (
      <div className="assignmentViewMainDiv">
        <div className="dropdownAssignment">
          Dropdown for assignment
          <select name="assignments" onChange={this.handleChange}>
            <option value="all">Show All</option>
            {this.state.allAssignments.map(element => {
              return (
                <option value={element.id} key={`Select${element.id}`}>
                  {element.assignmentName}
                </option>
              )
            })}
          </select>
        </div>

        <div>Assignments:</div>
        {this.state.allAssignments.length > 0 ? (
          this.state.allAssignments
            .filter(element => {
              if (this.state.selected === 'all') {
                return true
              } else {
                return element.id + '' === this.state.selected // to filter by the selected drop down menu value
              }
            })

            .map(element => {
              return (
                <div key={element.id} className="assignmentCheckBoxesSection">
                  {element.assignmentName}
                  <div className="assignmentCheckBoxes">
                    <div className="checkbox">
                      Description
                      <hr />
                      {element.description}
                    </div>
                    <div className="checkbox">
                      Due Date
                      <hr />
                      {moment(element.dueDate).format(
                        'dddd, MMMM Do YYYY, h:mm:ss a'
                      )}
                    </div>
                    <div className="checkbox">
                      Total Points
                      <hr />
                      {element.totalPoints}
                    </div>
                    <div className="checkbox">
                      Weight
                      <hr />
                      {element.weight}
                    </div>

                    <div className="checkbox">
                      <button
                        type="button"
                        onClick={evt => {
                          evt.preventDefault()
                          this.props.deleteAssignment(element.id)
                          this.props.getAssignmentsForCourse(
                            this.props.courseIdInherited
                          )
                        }}
                      >
                        Delete
                      </button>

                      <hr />

                      <button type="button" onClick={this.toggle}>
                        Submit Grade
                      </button>
                    </div>

                    {this.state.showStudents ? (
                      <ShowStudents assignmentId={element.id} />
                    ) : (
                      <div> </div>
                    )}
                  </div>
                </div>
              )
            })
        ) : (
          <div />
        )}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAssignmentsForCourse: courseId =>
      dispatch(getAssignmentsByCourseIdThunk(courseId)),
    deleteAssignment: assignmentId =>
      dispatch(removeAssignmentThunk(assignmentId))
  }
}

const mapStateToProps = state => {
  return {
    task: state
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherAssignmentView)
