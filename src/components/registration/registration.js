import React from 'react';
import Container from "../layout/container";
import PreRegistrationForm from "./pre-registration-form";
import RegistrationForm from "./registration-form";
import NameModal from "./name-modal";
import * as clearbit from "../../utils/clearbit";
import * as google from "../../utils/google";
import * as geolocation from "../../utils/geolocation";

export default class Registration extends Container {

  constructor(props) {
    super(props);

    this.state = {
      values: null,
      isNameModalOpen: false,
      googlePlacesData: {}
    };
  }

  onPreRegistrationSubmit = values => {
    clearbit.find(values).then(data => {
      if (!data) {
        geolocation.getLocation().then((position) => {

          google.places({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            types: ['establishment'],
          }).then(data => {
            if (data[0]) {
              this.setState({ googlePlacesData: data[0] });
            }

            this.setState({ isNameModalOpen: true });
          })
        });
        return;
      }

      const values = this.formatClearbitData(data);

      this.setState({ values })
    })
  }

  onNameFormSubmit = values => {
    const { googlePlacesData } = this.state;

    this.setState({
      isNameModalOpen: false,
      values: {
        first_name: values.first_name,
        last_name: '',
        details: '',
        email: '',
        company: {
          name: googlePlacesData.name || '',
          address: googlePlacesData.street || '',
          city: googlePlacesData.city || '',
          state: '',
          zip: googlePlacesData.postal_code || '',
          country: googlePlacesData.country || '',
          email: '',
          phone: '',
        },
      }
    })
  }

  onRegistrationSubmit = values => {
    // todo wait for customer answer
    alert('Not implemented yet! Waiting for customer answer.');
  }

  formatClearbitData = data => ({
    first_name: data.name.givenName,
    last_name: data.name.familyName,
    details: data.aboutme.bio,
    email: data.email,
    company: {
      name: data.employment.name,
      address: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      email: '',
      phone: '',
    },
  })

  renderHead = () => {
    const { values } = this.state;

    return values === null ? (
      <h1>Lets get started with GymSales</h1>
    ) : ([
      <h1 key={1}>Thanks {values.first_name}!</h1>,
      <h2 key={2}>Does this look right?</h2>
    ])
  }

  renderFooter = () => {
    const { isNameModalOpen } = this.state;

    return (
      <NameModal isOpen={isNameModalOpen} onSubmit={this.onNameFormSubmit} />
    )
  }

  renderContent = () => {
    const { values } = this.state;

    return (
      values === null ? (
        <div className="d-flex justify-content-center">
          <PreRegistrationForm onSubmit={this.onPreRegistrationSubmit} className="col-md-6" />
        </div>
      ) : (
        <RegistrationForm values={values} onSubmit={this.onRegistrationSubmit} />
      )
    )
  }

}
