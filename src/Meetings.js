import React, { Component } from 'react';
import { GoListUnordered, GoTrashcan } from 'react-icons/go';
import { FaLink } from 'react-icons/fa';
import { navigate } from '@reach/router';

class Meetings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meetingName: ''
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
    this.props.addMeeting(this.state.meetingName);
    this.setState({ meetingName: '' });
  }

  render() {
    var meetingList = this.props.meetings.map(item => {
      return (
        <div className="list-group-item d-flex" key={item.meetingID}>
          <section
            className="btn-group align-self-center"
            role="group"
            aria-label="Meeting Options"
          >
            <button
              className="btn btn-sm btn-outline-secondary"
              data-toggle="tooltip"
              title="Delete Meeting"
              onClick={e =>
                this.props.deleteMeeting(e, item.meetingID)
              }
            >
              <GoTrashcan />
            </button>
            <button
              className="btn btn-sm btn-outline-secondary"
              title="Check In Link"
              onClick={() =>
                navigate(
                  `/checkin/${this.props.userID}/${item.meetingID}`
                )
              }
            >
              <FaLink />
            </button>
            <button
              className="btn btn-sm btn-outline-secondary"
              title="Attendee List"
              onClick={() =>
                navigate(
                  `/attendees/${this.props.userID}/${item.meetingID}`
                )
              }
            >
              <GoListUnordered />
            </button>
          </section>
          <section className="pl-3 text-left align-self-center">
            {item.meetingName}
          </section>
        </div>
      );
    });

    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h1 className="font-weight-light">Add a Meeting</h1>
            <div className="card bg-light">
              <div className="card-body text-center">
                <form
                  className="formgroup"
                  onSubmit={this.handleSubmit}
                >
                  <div className="input-group input-group-lg">
                    <input
                      type="text"
                      name="meetingName"
                      value={this.state.meetingName}
                      placeholder="Meeting name"
                      className="form-control"
                      aria-describedby="buttonAdd"
                      onChange={this.handleChange}
                    />
                    <div className="input-group-append">
                      <button
                        type="submit"
                        className="btn btn-sm btn-info"
                        id="buttonAdd"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-11 col-md-6 text-center">
            <div className="card border-top-0 rounded-0">
              {this.props.meetings.length ? (
                <div className="card-body  py-2">
                  <h4 className="card-title font-weight-light m-0">
                    Your Meetings
                  </h4>
                </div>
              ) : null}

              <div className="list-group list-group-flush">
                {meetingList}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Meetings;
