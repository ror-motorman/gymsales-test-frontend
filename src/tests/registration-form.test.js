import React from 'react';
import RegistrationFormFormix, { RegistrationForm } from '../components/registration/registration-form';
import { mount } from 'enzyme';
import { execNext } from './helpers';

describe('RegistrationForm', () => {

  let defaultValues = {
    email: '',
    first_name: '',
    last_name: '',
    details: '',
    company: {
      name: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      email: '',
      phone: '',
    },
  }

  test('Show validation error on invalid values', () => {
    const onPreRegistrationSubmit = jest.fn();
    const wrapper = mount(
      <RegistrationFormFormix onSubmit={onPreRegistrationSubmit} values={defaultValues} />
    );
    const form = () => wrapper.update().find(RegistrationForm);

    form().props().submitForm();

    return execNext(() => {
      expect(onPreRegistrationSubmit).not.toHaveBeenCalled();
      expect(form().props().isValid).toBeFalsy();
    })
  });

  test('Submit on valid values', () => {
    const onPreRegistrationSubmit = jest.fn();
    const wrapper = mount(
      <RegistrationFormFormix onSubmit={onPreRegistrationSubmit} values={defaultValues} />
    );
    const form = () => wrapper.update().find(RegistrationForm);

    form().props().setValues({
      email: 'email@email.com',
      first_name: 'First',
      last_name: 'Name',
      details: 'Details',
      company: {
        name: 'Company name',
        address: 'Address',
        city: 'City',
        state: 'State',
        zip: '063215',
        country: 'USA',
        email: 'email@email.com',
        phone: '+106336879412',
      },
    })

    form().props().submitForm();

    return execNext(() => {
      expect(onPreRegistrationSubmit).toHaveBeenCalled();
      expect(form().props().errors).toEqual({});
    })
  });

})
