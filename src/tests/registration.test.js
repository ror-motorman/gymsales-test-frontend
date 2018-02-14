import React from 'react';
import Registration from '../components/registration/registration';
import RegistrationForm from '../components/registration/registration-form';
import PreRegistrationForm from '../components/registration/pre-registration-form';
import ModalExample from '../components/registration/name-modal';
import { shallow } from 'enzyme';
import { execNext } from './helpers';
import * as clearbit from '../utils/clearbit';
import * as google from '../utils/google';
import * as geolocation from "../utils/geolocation";

jest.mock('../utils/clearbit');

describe('Registration', () => {

  let preRegistrationValues = { email: 'email@email.com' };

  let clearbitValues = {
    email: 'email@email.com',
    name: {
      givenName: 'Given',
      familyName: 'Family',
    },
    aboutme: { bio: 'Bio' },
    employment: { name: 'Company name' },
  };

  let clearbitRegistrationValues = {
    first_name: 'Given',
    last_name: 'Family',
    details: 'Bio',
    email: 'email@email.com',
    company: {
      name: 'Company name',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      email: '',
      phone: ''
    }
  };

  let googleValues = [{
    name: 'Company name',
  }];

  let googleRegistrationValues = {
    first_name: 'Given',
    last_name: '',
    details: '',
    email: '',
    company: {
      name: 'Company name',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      email: '',
      phone: ''
    }
  };

  let nameModalValues = { first_name: 'Given' }

  let geolocationData = {
    coords: {
      latitude: 0,
      longitude: 0,
    }
  }

  test('Preload clearbit data when preregistration form is filled', () => {
    clearbit.find = jest.fn(values => {
      expect(values).toEqual(preRegistrationValues);

      return new Promise(resolve => resolve(clearbitValues))
    });

    const wrapper = shallow(<Registration />);

    wrapper.find(PreRegistrationForm).props().onSubmit(preRegistrationValues);

    return execNext(() => {
      expect(wrapper.update().find(RegistrationForm).props().values).toEqual(clearbitRegistrationValues);
    })
  });

  test('Preload google data when clearbit data is not founded', () => {
    // Mock geolocation request
    geolocation.getLocation = jest.fn(() => (
      new Promise(resolve => resolve(geolocationData))
    ));

    // Mock google places search request
    google.places = jest.fn(searchParams => {
      expect(searchParams).toEqual({
        lat: 0,
        lng: 0,
        types: ['establishment'],
      });

      return new Promise(resolve => resolve(googleValues))
    });

    // Mock clearbit request with empty result
    clearbit.find = jest.fn(values => {
      expect(values).toEqual(preRegistrationValues);

      return new Promise(resolve => resolve(null))
    });

    const wrapper = shallow(<Registration />);

    wrapper.find(PreRegistrationForm).props().onSubmit(preRegistrationValues);

    return execNext(() => {
      expect(wrapper.update().state().isNameModalOpen).toBeTruthy();
      wrapper.update().find(ModalExample).props().onSubmit(nameModalValues);

      expect(wrapper.update().find(RegistrationForm).props().values).toEqual(googleRegistrationValues);
    })
  });

})
