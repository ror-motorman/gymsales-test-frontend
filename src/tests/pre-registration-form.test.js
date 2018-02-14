import React from 'react';
import PreRegistrationFormFormix, { PreRegistrationForm } from '../components/registration/pre-registration-form';
import { mount } from 'enzyme';
import { execNext } from './helpers';

describe('PreRegistrationForm', () => {
  test('Show validation error on invalid values', () => {
    const onPreRegistrationSubmit = jest.fn();
    const wrapper = mount(
      <PreRegistrationFormFormix onSubmit={onPreRegistrationSubmit} />
    );
    const form = wrapper.find(PreRegistrationForm);

    form.props().setValues({ email: 'demo' });
    form.props().submitForm();

    return execNext(() => {
      expect(onPreRegistrationSubmit).not.toHaveBeenCalled();
      expect(wrapper).toIncludeText('Invalid email address');
    })
  });

  test('Submit on valid values', () => {
    const onPreRegistrationSubmit = jest.fn();
    const wrapper = mount(
      <PreRegistrationFormFormix onSubmit={onPreRegistrationSubmit} />
    );
    const form = () => wrapper.update().find(PreRegistrationForm);

    form().props().setValues({ email: 'demo@demo.com' });
    form().props().submitForm();

    return execNext(() => {
      expect(onPreRegistrationSubmit).toHaveBeenCalled();
      expect(form().props().errors).toEqual({});
    })
  });
})
