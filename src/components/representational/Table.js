import React from 'react';

import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container';

const studentsTable = (props) => {
    let action = 'View';
    if (props.role === 'Registrar') {
        action = 'Edit';
    }
    return (
        <Container>
            <Table striped bordered hover responsive size="sm">
                <thead>
                    <tr>
                    <th>No</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Date of Birth</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {props.students.map(
                        ({ID, firstName, lastName, dateOfBirth}, index) => 
                        <tr key={ID}
                            style={{cursor: 'pointer'}}
                            onClick={() => props.onViewStudent({ID, firstName, lastName, dateOfBirth})}
                        >
                            <td>{index + 1}</td>
                            <td>{firstName}</td>
                            <td>{lastName}</td>
                            <td>{dateOfBirth}</td>
                            <td>
                                <span 
                                    onClick={() => props.onViewStudent({ID, firstName, lastName, dateOfBirth})}
                                >{ action }</span>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
}


export default studentsTable;