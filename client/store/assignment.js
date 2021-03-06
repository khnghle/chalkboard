import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_ASSIGNMENTS = 'GET_ALL_ASSIGNMENTS'
const GET_SINGLE_ASSIGNMENT = 'GET_SINGLE_ASSIGNMENT'
const ADD_ASSIGNMENT = 'ADD_ASSIGNMENT'
const UPDATE_ASSIGNMENT = 'UPDATE_ASSIGNMENT'
const REMOVE_ASSIGNMENT = 'REMOVE_ASSIGNMENT'
const GET_ASSIGNMENTS_FOR_COURSE = 'GET_ASSIGNMENTS_FOR_COURSE'
const GET_ALL_STUDENTS_WITH_ASSIGNMENT = 'GET_ALL_STUDENTS_WITH_ASSIGNMENT'
const SUBMIT_GRADE = 'SUBMIT_GRADE'
/**
 * ACTION CREATORS
 */
const getAllAssignments = assignments => ({
  type: GET_ALL_ASSIGNMENTS,
  assignments
})
const getSingleAssignment = assignment => ({
  type: GET_SINGLE_ASSIGNMENT,
  assignment
})
const getAssignmentsForCourse = assignments => ({
  type: GET_ASSIGNMENTS_FOR_COURSE,
  assignments
})
const addAssignment = assignment => ({type: ADD_ASSIGNMENT, assignment})
const updateAssignment = assignment => ({type: UPDATE_ASSIGNMENT, assignment})

const removeAssignment = assignmentId => ({
  type: REMOVE_ASSIGNMENT,
  assignmentId
})

const getAllStudents = students => ({
  type: GET_ALL_STUDENTS_WITH_ASSIGNMENT,
  students
})

const updateGrade = () => ({
  type: SUBMIT_GRADE
})

/**
 * THUNK CREATORS
 */
export const updateGradeThunk = payload => {
  return async dispatch => {
    try {
      await axios.put(
        `/api/assignments/grade/${payload.assignmentId}/${payload.userId}`,
        payload
      )
      dispatch(updateGrade)
    } catch (error) {
      console.error(error)
    }
  }
}

export const getAllAssignmentsThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/assignments')
      dispatch(getAllAssignments(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const getSingleAssignmentThunk = assignmentId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/assignments/${assignmentId}`)
      dispatch(getSingleAssignment(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const getAssignmentsByCourseIdThunk = courseId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/assignments/byCourseId/${courseId}`)
      dispatch(getAssignmentsForCourse(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const addAssignmentThunk = assignment => {
  return async dispatch => {
    try {
      const {data} = await axios.post('../api/assignments', assignment)
      dispatch(addAssignment(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const updateAssignmentThunk = (assignmentId, assignment) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(
        `/api/assignments/${assignmentId}`,
        assignment
      )
      dispatch(updateAssignment(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const removeAssignmentThunk = assignmentId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/assignments/${assignmentId}`)
      dispatch(removeAssignment(assignmentId))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const getAllStudentsThunk = assignmentId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/assignments/users/${assignmentId}`)
      dispatch(getAllStudents(data))
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 * INITIAL STATE
 */
const initialState = {
  all: [],
  single: {},
  assignments: [],
  students: []
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ASSIGNMENTS:
      return {...state, all: action.assignments}
    case GET_SINGLE_ASSIGNMENT:
      return {...state, single: action.assignment}
    case ADD_ASSIGNMENT:
      return {...state, all: [...state.all, action.assignment]}
    case UPDATE_ASSIGNMENT:
      return {
        ...state,
        single: action.assignment,
        all: state.all.map(assignment => {
          if (assignment.id === action.assignment.id)
            assignment = action.assignment
          return assignment
        })
      }
    case REMOVE_ASSIGNMENT:
      return {
        ...state,
        all: state.all.filter(
          assignment => assignment.id !== action.assignmentId
        )
      }
    case GET_ASSIGNMENTS_FOR_COURSE:
      return {
        ...state,
        assignments: action.assignments
      }
    case GET_ALL_STUDENTS_WITH_ASSIGNMENT:
      return {
        ...state,
        students: action.students
      }
    case SUBMIT_GRADE:
      return {...state}
    default:
      return state
  }
}
