import React from 'react';
import DatePicker from "react-datepicker";

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "react-datepicker/dist/react-datepicker.css";
import "./customDatePickerWidth.css";
import BootstrapPicker from './BootstrapPicker';

const BasicInfo = (props) => {

    let dateOfBirth = null;
    if (props.dateOfBirth !== '') {
        dateOfBirth = new Date(props.dateOfBirth);
    }

    return (
        <React.Fragment>
            <Row className="mb-3">
                <Col>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        required
                        disabled={props.isDisabled}
                        placeholder="E.g. John"
                        name="firstName" 
                        value={props.firstName}
                        onChange={(e) => props.onChange(e)} 
                    />
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
                        value={props.lastName}
                        onChange={(e) => props.onChange(e)} 
                    />
                    <Form.Control.Feedback type="invalid">
                        Mandatory field
                    </Form.Control.Feedback>
                </Col>
            </Row>
            <Row>
                <Col>
                <div className="customDatePickerWidth">
                    <Form.Label>Date of Birth</Form.Label>
                    <DatePicker
                        required
                        disabled={props.isDisabled}
                        customInput={<BootstrapPicker isDisabled={props.isDisabled} />}
                        dateFormat="dd/MM/yyyy"
                        onChange={props.dateChange}
                        selected={dateOfBirth}
                        maxDate={new Date()}
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                    />
                </div>
                </Col>
                <Col>
                    <Form.Label>Nationality</Form.Label>
                    <Form.Control 
                        required
                        disabled={props.isDisabled}
                        as="select"
                        name="nationalityID"
                        value={props.nationalityID}
                        onChange={(e) => props.onChange(e)} >
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


export default BasicInfo;
