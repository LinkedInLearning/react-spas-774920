import React, { Component } from 'react';
import { GoMail, GoStar, GoTrashcan } from 'react-icons/go';
import { FaRandom, FaUndo } from 'react-icons/fa';
import firebase from './Firebase.js';

class Attendees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      starOnly: false,
      random: null,
      allAttendees: [],
      displayAttendees: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.chooseRandom = this.chooseRandom.bind(this);
    this.resetQuery = this.resetQuery.bind(this);
  }

  componentDidMount() {
    const attendeesRef = firebase
      .database()
      .ref(
        `meetings/${this.props.userID}/${
          this.props.meetingID
        }/attendees`
      );

    attendeesRef.on('value', snapshot => {
      let attendees = snapshot.val();
      let attendeesList = [];
      for (let item in attendees) {
        attendeesList.push({
          attendeeID: item,
          attendeeName: attendees[item].attendeeName,
          attendeeEmail: attendees[item].attendeeEmail,
          star: attendees[item].star
        });
      }
      this.setState({
        allAttendees: attendeesList,
        displayAttendees: attendeesList,
        howManyAttendees: attendeesList.length
      });
    });
  }

  handleChange(e) {
    const itemValue = e.target.value;

    this.setState({
      searchQuery: itemValue
    });
  }

  chooseRandom() {
    const randomAttendee = Math.floor(
      Math.random() * this.state.howManyAttendees
    );
    this.resetQuery();
    this.setState({
      displayAttendees: [this.state.allAttendees[randomAttendee]]
    });
  }

  resetQuery() {
    this.setState({
      displayAttendees: this.state.allAttendees,
      searchQuery: ''
    });
  }

  render() {
    const admin =
      this.props.adminUser === this.props.userID ? true : false;

    const dataFilter = item =>
      item.attendeeName
        .toLowerCase()
        .match(this.state.searchQuery.toLowerCase()) && true;

    const myAttendees = this.state.displayAttendees
      .filter(dataFilter)
      .map(item => {
        return (
          <div
            className="col-8 col-sm-6 col-md-4 col-lg-3 mb-2 p-0 px-1"
            key={item.attendeeID}
          >
            <div className="card ">
              <div
                className={
                  'card-body px-3 py-2 d-flex align-items-center ' +
                  (admin ? '' : 'justify-content-center')
                }
              >
                {admin && (
                  <div className="btn-group pr-2">
                    <button
                      className={
                        'btn btn-sm  ' +
                        (item.star
                          ? 'btn-info'
                          : 'btn-outline-secondary')
                      }
                      title="Give user star"
                      onClick={e =>
                        this.props.toggleStar(
                          e,
                          item.star,
                          this.props.meetingID,
                          item.attendeeID
                        )
                      }
                    >
                      <GoStar className="fillred" />
                    </button>
                    <a
                      href={`mailto:${item.attendeeEmail}`}
                      className="btn btn-sm btn-outline-secondary"
                      title="Mail Attendee"
                    >
                      <GoMail />
                    </a>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      title="Delete Attendee"
                      onClick={e =>
                        this.props.deleteAttendee(
                          e,
                          this.props.meetingID,
                          item.attendeeID
                        )
                      }
                    >
                      <GoTrashcan />
                    </button>
                  </div>
                )}

                <div>{item.attendeeName}</div>
              </div>
            </div>
          </div>
        );
      });

    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className="font-weight-light text-center">
              Attendees
            </h1>
            <div className="card bg-light mb-4">
              <div className="card-body text-center">
                <div className="input-group input-group-lg">
                  <input
                    type="text"
                    name="searchQuery"
                    value={this.state.searchQuery}
                    placeholder="Search Attendees"
                    className="form-control"
                    aria-describedby="buttonAdd"
                    onChange={this.handleChange}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-sm btn-outline-info"
                      title="Pick a Random Attendee"
                      onClick={() => this.chooseRandom()}
                    >
                      <FaRandom />
                    </button>
                    <button
                      className="btn btn-sm btn-outline-info "
                      title="Reset Search"
                      onClick={() => this.resetQuery()}
                    >
                      <FaUndo />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {myAttendees}
        </div>
      </div>
    );
  }
}

export default Attendees;
