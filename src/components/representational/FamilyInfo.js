import React from 'react';
import DatePicker from "react-datepicker";

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "react-datepicker/dist/react-datepicker.css";
import "./customDatePickerWidth.css";
import BootstrapPicker from './BootstrapPicker';

const FamilyInfo = (props) => {
    
    let dateOfBirth = null;
    if (props.details.dateOfBirth !== '') {
        dateOfBirth = new Date(props.details.dateOfBirth);
    }

    return (
        <React.Fragment>
            <Row className="mb-3">
                <Col>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                        required
                        disabled={props.isDisabled}
                        placeholder="E.g. James"
                        name="firstName"
                        value={props.details.firstName}
                        onChange={(e) => props.onChange(e, props.details.ID)} />
                        <Form.Control.Feedback type="invalid">
                            Mandatory field
                        </Form.Control.Feedback>
                </Col>
                <Col>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                        required
                        disabled={props.isDisabled}
                        placeholder="E.g. Doe"
                        name="lastName"
                        value={props.details.lastName}
                        onChange={(e) => props.onChange(e, props.details.ID)} />
                        <Form.Control.Feedback type="invalid">
                            Mandatory field
                        </Form.Control.Feedback>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <Form.Label>Relationship</Form.Label>
                    <Form.Control 
                        required
                        disabled={props.isDisabled}
                        as="select" 
                        name="relationship"
                        onChange={(e) => props.onChange(e, props.details.ID)}
                        value={props.details.relationship} >
                        <option value='' defaultValue disabled>Choose Relationship</option>
                        <option value='Parent'>Parent</option>
                        <option value='Sibling'>Sibling</option>
                        <option value='Spouse'>Spouse</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Mandatory field
                    </Form.Control.Feedback>
                </Col>
                <Col>
                    <div className="customDatePickerWidth">
                        <Form.Label>Date of Birth</Form.Label>
                        <DatePicker
                            required
                            disabled={props.isDisabled}
                            customInput={<BootstrapPicker isDisabled={props.isDisabled} />}
                            dateFormat="dd/MM/yyyy"
                            onChange={(date) => props.dateChange(date, props.details.ID)}
                            selected={dateOfBirth}
                            maxDate={new Date()}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                        />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 6 }}>
                    <Form.Label>Nationality</Form.Label>
                    <Form.Control 
                        required
                        disabled={props.isDisabled}
                        as="select"
                        name="nationalityID"
                        value={props.details.nationalityID}
                        onChange={(e) => props.onChange(e, props.details.ID)} >
                        <option value='' defaultValue disabled>Choose Nationality</option>
                        {props.nationalities.map(({ID, Title}) => (
                            <option key={ID} value={ID}>{Title}</option>
                        ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Mandatory field
                    </Form.Control.Feedback>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default FamilyInfo;