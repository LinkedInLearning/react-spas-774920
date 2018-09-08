// Import React
import React, { Component } from 'react';
import FormError from './FormError';
import { navigate } from '@reach/router';

class CheckIn extends Component {
  constructor() {
    super();
    this.state = {
      attendeeName: '',
      attendeeEmail: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.checkInAttendee(
      this.state.attendeeName,
      this.state.attendeeEmail,
      this.props.userID,
      this.props.meetingID
    );
    navigate(`/attendees/${this.props.userID}/${this.props.meetingID}`);
  }

  render() {
    return (
      <form className="mt-3" onSubmit={this.handleSubmit}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="card bg-light">
                <div className="card-body">
                  <h3 className="font-weight-light mb-3 text-center">
                    Check in
                  </h3>
                  <section className="form-group">
                    <label
                      className="form-control-label sr-only"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      required
                      className="form-control"
                      type="text"
                      id="attendeeName"
                      name="attendeeName"
                      placeholder="Name"
                      onChange={this.handleChange}
                    />
                  </section>
                  <section className="form-group">
                    <label
                      className="form-control-label sr-only"
                      htmlFor="Email"
                    >
                      Email
                    </label>
                    <input
                      required
                      className="form-control"
                      type="email"
                      id="attendeeEmail"
                      name="attendeeEmail"
                      placeholder="Email"
                      onChange={this.handleChange}
                    />
                  </section>
                  <div className="form-group text-right mb-0">
                    <button className="btn btn-primary" type="submit">
                      Check in
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default CheckIn;
