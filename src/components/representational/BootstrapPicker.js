import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

//  Custom input component in react-datepicker can't be Stateless Functional Component (SFC) due to unavailability of refs in SFC
class BootstrapPicker extends Component {
    render() {
        return (
            <Form.Control 
                required
                disabled={this.props.isDisabled}
                defaultValue={this.props.value}
                onClick={this.props.onClick}
                placeholder="Choose date" />
        );
    }
}

BootstrapPicker.propTypes = {
    onClick: PropTypes.func,
    value: PropTypes.string
};

export default BootstrapPicker;