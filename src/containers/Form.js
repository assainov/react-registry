import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getAllStudentData } from '../services/api/getAllStudentData';
import { studentSubmitAPI } from '../services/api/studentSubmit';
import { studentUpdateAPI } from '../services/api/studentUpdate';
import Form from 'react-bootstrap/Form';
import "react-datepicker/dist/react-datepicker.css";
import FamilyInfo from '../components/representational/FamilyInfo';
import BasicInfo from '../components/representational/BasicInfo';
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'



class newStudentForm extends Component {
    state = {
        familyMembers: [
            {
                ID: Date.now(),
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                nationalityID: ''
            }
        ],
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        nationalityID: '',
        validated: false,
        success: false,
        error: false,
        message: null
    }

    componentDidMount() {
        if (this.props.currentStudent.ID) {
            getAllStudentData(this.props.currentStudent.ID)
                .then(({firstName, lastName, dateOfBirth, nationality, familyMembers}) => (
                    this.setState({   
                        firstName, 
                        lastName, 
                        dateOfBirth,
                        nationalityID: nationality.ID,
                        studentID: this.props.currentStudent.ID, 
                        familyMembers,
                        DBFamilyMembers: familyMembers // needed for updating family member information
                    })));  
        }
    }

    postNewStudent = () => {
        const basicInfo = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            dateOfBirth: this.state.dateOfBirth
        };

        const nationalityID = this.state.nationalityID;

        const familyMembers = this.state.familyMembers;

        studentSubmitAPI(basicInfo, nationalityID, familyMembers)
            .then(student => {
                this.props.onPostStudent(student);

                this.setState({
                    familyMembers: [
                        {
                            ID: Date.now(), 
                            firstName: '', 
                            lastName: '',
                            dateOfBirth: '',
                            nationalityID: ''
                        }
                    ],
                    firstName: '',
                    lastName: '',
                    dateOfBirth: '',
                    nationalityID: '',
                    validated: false,
                    success: true,
                    error: false,
                    message: 'Student added successfully'
            })
        })
        .catch(error => {
            this.setState({
                success: false,
                error: true,
                message: 'Error adding the student: ' + JSON.stringify(error)
            })
        });
    }

    updateStudent = () => {
        const basicInfo = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            dateOfBirth: this.state.dateOfBirth
        };

        const nationalityID = this.state.nationalityID;

        const UIFamilyMembers = this.state.familyMembers.slice();
        const DBFamilyMembers = this.state.DBFamilyMembers.slice();

        
        studentUpdateAPI(this.state.studentID, basicInfo, nationalityID, UIFamilyMembers, DBFamilyMembers)
        .then(student => {
            this.props.onUpdateStudent(student);
            this.setState({
                success: true,
                error: false,
                message: 'Student updated successfully'
            })
        })
        .catch(error => {
            this.setState({
                success: false,
                error: true,
                message: 'Error adding the student: ' + JSON.stringify(error)
            })
        });

    }

    dateChangeFamilyHandler = (date, id) => {
        const familyMemberToUpdate = this.state.familyMembers.find(member => member.ID === id);
        familyMemberToUpdate.dateOfBirth = date.toISOString();
        const familyMemberIndex = this.state.familyMembers.findIndex(member => member.ID === id);
        const updatedFamilyMembers = this.state.familyMembers.slice();

        updatedFamilyMembers[familyMemberIndex] = familyMemberToUpdate;

        this.setState({
            familyMembers: updatedFamilyMembers
        });
    }


    dateChangeHandler = (date) => {
        this.setState({
            dateOfBirth: date.toISOString()
            });
    }

    addMemberHandler = () => {
        this.setState({
            familyMembers: this.state.familyMembers.concat({
                ID: Date.now(),
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                nationalityID: ''
            })
        });
    }

    removeMemberHandler = (id) => {
        this.setState({
            familyMembers: this.state.familyMembers.filter(member => member.ID !== id)
        });
    }

    onChangeFamilyHandler = (e, id) => {
        const familyMemberToUpdate = this.state.familyMembers.find(member => member.ID === id);
        familyMemberToUpdate[e.target.name] = e.target.value;
        const familyMemberIndex = this.state.familyMembers.findIndex(member => member.ID === id);
        const updatedFamilyMembers = this.state.familyMembers.slice();

        updatedFamilyMembers[familyMemberIndex] = familyMemberToUpdate;

        this.setState({
            familyMembers: updatedFamilyMembers
        });
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    nationalityChangeHandler = (e) => {
        this.setState({
            nationalityID: e.target.value
        })
    }

    renderRemoveBtn = (firstMember, ID) => {
        if (firstMember) return null;

        if (this.props.modalMode === 'view' && this.props.role === 'Admin Staff') {
            return null;
        }
        return (
            <span 
                onClick={() => this.removeMemberHandler(ID)}
                style={{
                    cursor: 'pointer', 
                    color: 'red',
                    margin: 'auto 10px'
            }}>&#10005;</span>
        );
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            this.props.modalMode === 'new' ? this.postNewStudent() : this.updateStudent();
        }
        this.setState({ validated: true });
    }

    renderMessage = (message, type) => {
        
        setTimeout(() => {
            this.setState({success: false, error: false, message: null})    
        }, 3000);
        return (
            <Alert variant={type}>
                {message}
            </Alert>
        )
    }

    render() {

        //  Conditionally Render Submit or Update Buttons
        let successButton = (
            <Button 
                variant="success" 
                type="submit"
                style={{float: 'right'}}
                className="mr-3" >
                Submit New Student
            </Button>
        );
        if (this.props.modalMode === 'view') {
            successButton = (
                <Button 
                    variant="primary" 
                    type="submit"
                    style={{float: 'right'}}
                    className="mr-3" >
                    Approve Changes
                </Button>
            );
        }

        //  Conditionally Render Control Buttons
        let controlButtons = (
            <React.Fragment>
                <Button
                    as="input" 
                    variant="outline-info"
                    className="mt-4 mb-4"
                    onClick={this.addMemberHandler}
                    value="+ Add Family Member"
                />
                <div className="mb-5">
                    <Button
                        style={{float: 'right'}} 
                        as="input" 
                        onClick={this.props.onCloseModal}
                        type="reset" 
                        value="Cancel" 
                        variant="secondary" 
                    />
                    { successButton }
                </div>
            </React.Fragment>
        );

        //  Disable control buttons for Admin Staff
        if (this.props.role === 'Admin Staff' && this.props.modalMode === 'view') {
            controlButtons = null;
        }

        return (
            <Form 
                noValidate
                validated={this.state.validated}
                onSubmit={e => this.formSubmitHandler(e)}
                className="mb-4"
            >
                <h5 className='mb-3'>Section 1: Basic Information</h5>
                <BasicInfo
                    isDisabled={this.props.role === 'Admin Staff' && this.props.modalMode === 'view'}
                    nationalities={this.props.nationalities}
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    dateOfBirth={this.state.dateOfBirth}
                    nationalityID={this.state.nationalityID}
                    onChange={(e) => this.onChangeHandler(e)}
                    dateChange={(date) => this.dateChangeHandler(date)} 
                />
                <h5 className='mb-3 mt-4'>Section 2: Family Information</h5>
                
                {this.state.familyMembers.map(
                    ({ID, firstName, lastName, relationship, dateOfBirth, nationalityID}, index) => (
                    <React.Fragment key={ID} >
                        <h6 className="mt-3">
                            Family Member {index + 1} 
                            {this.renderRemoveBtn(index === 0, ID)}
                        </h6>
                        <FamilyInfo 
                            isDisabled={this.props.role === 'Admin Staff' && this.props.modalMode === 'view'}
                            nationalities={this.props.nationalities}
                            details={{ID, firstName, lastName, relationship, dateOfBirth, nationalityID}}
                            onChange={(e, ID) => this.onChangeFamilyHandler(e, ID)}
                            dateChange={(date, ID) => this.dateChangeFamilyHandler(date, ID)}
                        />
                    </React.Fragment>
                ))}
                { controlButtons }
                { this.state.success ? this.renderMessage(this.state.message, 'success') : null }
                { this.state.error ? this.renderMessage(this.state.message, 'danger') : null }
            </Form>
        );
    }
}

const mapStateToProps = state => {
    return {
        role: state.role,
        nationalities: state.nationalities,
        currentStudent: state.currentStudent,
        modalMode: state.modalMode
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCloseModal: () => dispatch({type: 'CLOSE_MODAL'}),
        onPostStudent: (newStudent) => dispatch({type: 'POST_NEW_STUDENT', payload: { newStudent }}),
        onUpdateStudent: (student) => dispatch({type: 'UPDATE_STUDENT', payload: { student }})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(newStudentForm);