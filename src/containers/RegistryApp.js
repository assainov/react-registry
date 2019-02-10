import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../components/representational/Header';
import Table from '../components/representational/Table';
import Modal from '../components/representational/Modal';
import { getNationalities } from '../services/api/getNationalities';
import { getStudentList } from '../services/api/getStudentList';

class RegistryApp extends Component {
  
  componentDidMount() {
    getStudentList()
      .then(students => this.props.onStudentsLoad(students));
    
    getNationalities()
      .then(nationalities => this.props.onLoadNationalities(nationalities));
  }

  render() {
    return (
        <React.Fragment>
          <Header 
            currentRole={this.props.currentRole}
            onRoleChange={(role) => this.props.onRoleChange(role)}
            onOpenModal={this.props.onOpenModal} />
          <Table 
            students={this.props.students}
            role={this.props.currentRole}
            onViewStudent={(student) => this.props.onViewStudent(student)} />
          <Modal
            mode={this.props.modalMode}
            modalOpen={this.props.modalOpen}
            onCloseModal={this.props.onCloseModal} />
        </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentRole: state.role, 
    modalOpen: state.modalOpen,
    modalMode: state.modalMode,
    students: state.students
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRoleChange: (role) => dispatch({ type: 'CHANGE_ROLE', payload: {role} }),
    onOpenModal: () => dispatch({ type: 'OPEN_MODAL' }),
    onCloseModal: () => dispatch({ type: 'CLOSE_MODAL' }),
    onStudentsLoad: (students) => dispatch({ type: 'LOAD_STUDENTS',  payload: {students} }),
    onLoadNationalities: (nationalities) => dispatch({ type: 'LOAD_NATIONALITIES',  payload: {nationalities} }),
    onViewStudent: (student) => dispatch({ type: 'VIEW_STUDENT', payload: { student } })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistryApp);
