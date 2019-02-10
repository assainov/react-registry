const initialState = {
    role: 'Admin Staff',
    students: [],
    nationalities: [],
    modalOpen: false,
    modalMode: 'new',
    currentStudent: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_ROLE':
            return {
                ...state,
                role: action.payload.role
            }
        case 'LOAD_STUDENTS':
            return {
                ...state,
                students: action.payload.students
            }
        case 'LOAD_NATIONALITIES':
            return {
                ...state,
                nationalities: action.payload.nationalities
            }
        case 'CLOSE_MODAL':
            return {
                ...state,
                modalOpen: false,
                currentStudent: {}
            }
        case 'OPEN_MODAL':
            return {
                ...state,
                modalOpen: true,
                modalMode: 'new'
            }
        case 'POST_NEW_STUDENT':
            const students = state.students.concat([action.payload.newStudent]);
            return {
                ...state,
                students
            }
        case 'UPDATE_STUDENT':
            const newStudentsArray = state.students.slice();
            const studentIndex = newStudentsArray.findIndex(({ ID }) => ID === action.payload.student.ID);
            newStudentsArray[studentIndex] = action.payload.student;
            return {
                ...state,
                students: newStudentsArray
            }
        case 'VIEW_STUDENT':
            return {
                ...state,
                modalOpen: true,
                modalMode: 'view',
                currentStudent: action.payload.student
            }
        default:
            return state;
    }
}

export default reducer;