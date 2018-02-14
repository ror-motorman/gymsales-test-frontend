import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import Yup from 'yup';
import _ from 'lodash';
import { FormGroup, Label, Input, Button, FormFeedback, Col } from 'reactstrap';

const { func, string, object } = PropTypes;

export class RegistrationForm extends Component {

  static propTypes = {
    onSubmit: func.isRequired,
    values: object.isRequired,
    className: string
  }

  static defaultProps = {
    className: ''
  }

  validationError = (field) => {
    const { errors, touched } = this.props;

    return _.get(touched, field) && _.get(errors, field);
  }

  validationState = (field) => {
    const { errors, touched } = this.props;

    if (_.get(touched, field)) {
      return !_.get(errors, field);
    }

    return null;
  }

  render = () => {
    const {
      values,
      handleChange,
      handleSubmit,
    } = this.props;

    return (
      <form onSubmit={handleSubmit} className="row">
        <Col md={6}>
          <h4>User</h4>
          <FormGroup>
            <Label>First name</Label>
            <Input
              type="text"
              name="first_name"
              value={values.first_name}
              valid={this.validationState('first_name')}
              placeholder="Enter first name"
              onChange={handleChange}
            />
            <FormFeedback>{this.validationError('first_name')}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label>Last name</Label>
            <Input
              type="text"
              name="last_name"
              value={values.last_name}
              valid={this.validationState('last_name')}
              placeholder="Enter last name"
              onChange={handleChange}
            />
            <FormFeedback>{this.validationError('last_name')}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
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
          <FormGroup>
            <Label>Details</Label>
            <Input
              type="textarea"
              name="details"
              value={values.details}
              valid={this.validationState('details')}
              placeholder="Enter details"
              onChange={handleChange}
            />
            <FormFeedback>{this.validationError('details')}</FormFeedback>
          </FormGroup>
        </Col>

        <Col md={6}>
          <h4>Company</h4>
          <FormGroup>
            <Label>Name</Label>
            <Input
              type="text"
              name="company.name"
              value={values.company.name}
              valid={this.validationState('company.name')}
              placeholder="Enter name"
              onChange={handleChange}
            />
            <FormFeedback>{this.validationError('company.name')}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="text"
              name="company.email"
              value={values.company.email}
              valid={this.validationState('company.email')}
              placeholder="Enter email"
              onChange={handleChange}
            />
            <FormFeedback>{this.validationError('company.email')}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label>Phone</Label>
            <Input
              type="text"
              name="company.phone"
              value={values.company.phone}
              valid={this.validationState('company.phone')}
              placeholder="Enter phone"
              onChange={handleChange}
            />
            <FormFeedback>{this.validationError('company.phone')}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label>Address</Label>
            <Input
              type="text"
              name="company.address"
              value={values.company.address}
              valid={this.validationState('company.address')}
              placeholder="Enter address"
              onChange={handleChange}
            />
            <FormFeedback>{this.validationError('company.address')}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label>City</Label>
            <Input
              type="text"
              name="company.city"
              value={values.company.city}
              valid={this.validationState('company.city')}
              placeholder="Enter city"
              onChange={handleChange}
            />
            <FormFeedback>{this.validationError('company.city')}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label>State</Label>
            <Input
              type="text"
              name="company.state"
              value={values.company.state}
              valid={this.validationState('company.state')}
              placeholder="Enter state"
              onChange={handleChange}
            />
            <FormFeedback>{this.validationError('company.state')}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label>ZIP</Label>
            <Input
              type="text"
              name="company.zip"
              value={values.company.zip}
              valid={this.validationState('company.zip')}
              placeholder="Enter zip"
              onChange={handleChange}
            />
            <FormFeedback>{this.validationError('company.zip')}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label>Country</Label>
            <Input
              type="text"
              name="company.country"
              value={values.company.country}
              valid={this.validationState('company.country')}
              placeholder="Enter country"
              onChange={handleChange}
            />
            <FormFeedback>{this.validationError('company.country')}</FormFeedback>
          </FormGroup>
        </Col>

        <Col>
          <Button type="submit" color="success">Submit information</Button>
        </Col>
      </form>
    );
  }
}

export default withFormik({
  mapPropsToValues: ({ values }) => values,
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required!'),
    first_name: Yup.string().required('First name is required!'),
    last_name: Yup.string().required('Last name is required!'),
    details: Yup.string().required('Details is required!'),
    company: Yup.object().shape({
      name: Yup.string().required('Name is required!'),
      address: Yup.string().required('Address is required!'),
      city: Yup.string().required('City is required!'),
      state: Yup.string().required('State is required!'),
      zip: Yup.string().required('ZIP is required!'),
      country: Yup.string().required('Country is required!'),
      email: Yup.string().email('Invalid email address').required('Name is required!'),
      phone: Yup.string().required('Phone is required!'),
    }),
  }),
  handleSubmit: (values, { props }) => {
    props.onSubmit(values);
  },
  displayName: 'RegistrationForm',
})(RegistrationForm);
