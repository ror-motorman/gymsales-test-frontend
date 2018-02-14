import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import Yup from 'yup';
import { FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';

const { func, string } = PropTypes;

export class PreRegistrationForm extends Component {

  static propTypes = {
    onSubmit: func.isRequired,
    className: string
  }

  static defaultProps = {
    className: ''
  }

  validationError = (field) => {
    const { errors, touched } = this.props;

    return touched[field] && errors[field];
  }

  validationState = (field) => {
    const { errors, touched } = this.props;

    if (touched[field]) {
      return !errors[field];
    }

    return null;
  }

  render = () => {
    const {
      values,
      handleChange,
      handleSubmit,
      className,
    } = this.props;

    return (
      <form onSubmit={handleSubmit} className={className}>

        <FormGroup>
          <Label>Your email</Label>
          <Input
            type="text"
            name="email"
            value={values.email}
            valid={this.validationState('email')}
            placeholder="Enter email"
            onChange={handleChange}
          />
          <FormFeedback>{this.validationError('email')}</FormFeedback>
        </FormGroup>

        <Button type="submit" color="success">Lets start</Button>
      </form>
    );
  }
}

export default withFormik({
  mapPropsToValues: () => ({ email: '' }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
  }),
  handleSubmit: (values, { props }) => {
    props.onSubmit(values);
  },
  displayName: 'PreRegistrationForm',
})(PreRegistrationForm);
