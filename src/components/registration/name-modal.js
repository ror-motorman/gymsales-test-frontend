import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import Yup from 'yup';
import {
  Button,
  FormGroup,
  FormFeedback,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from 'reactstrap';

const { func } = PropTypes;

class ModalExample extends React.Component {

  static propTypes = {
    onSubmit: func.isRequired,
  }

  onSubmit = (e) => {
    const { handleSubmit } = this.props;

    handleSubmit(e);
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

  render() {
    const {
      values,
      handleChange,
      isOpen,
    } = this.props;

    return (
      <Modal isOpen={isOpen}>
        <form>
          <ModalHeader>Please, enter your name</ModalHeader>

          <ModalBody>
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
          </ModalBody>

          <ModalFooter>
            <Button color="primary" type="submit" onClick={this.onSubmit}>Confirm</Button>
          </ModalFooter>
        </form>
      </Modal>
    );
  }
}

export default withFormik({
  mapPropsToValues: () => ({ first_name: '' }),
  validationSchema: Yup.object().shape({
    first_name: Yup.string().required('Name is required!'),
  }),
  handleSubmit: (values, { props }) => {
    props.onSubmit(values);
  },
  displayName: 'NameForm',
})(ModalExample);
