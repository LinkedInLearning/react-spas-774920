// Import React
import React, { Component } from 'react';
import firebase from './Firebase.js';
import { Router, Link, navigate } from '@reach/router';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Nav from './Navigation';
import Register from './Register';
import Login from './Login';
import CheckIn from './CheckIn.js';
import WelcomeMessage from './WelcomeMessage.js';
import Attendees from './Attendees.js';
import Meetings from './Meetings.js';

class Home extends React.Component {
  render() {
    const biggerLead = {
      fontSize: 1.4 + 'em',
      fontWeight: 200
    };

    return (
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-10 col-md-10 col-lg-8 col-xl-7">
            <div
              className="display-4 text-primary mt-3 mb-2"
              style={{ fontSize: 2.8 + 'em' }}
            >
              Meeting Log
            </div>
            <p className="lead" style={biggerLead}>
              This simple app creates meetings, allows people to check
              in, and picks random users to award giveaways. It's a
              good example of a Single Page Application which includes
              connection to a database and routing. It's a practical
              way to learn <a href="https://reactjs.org/">React</a>{' '}
              with <a href="https://firebase.google.com">Firebase</a>.
            </p>

            {this.props.user == null && (
              <span>
                <Link
                  to="/register"
                  className="btn btn-outline-primary mr-2"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="btn btn-outline-primary mr-2"
                >
                  Log In
                </Link>
              </span>
            )}
            {this.props.user && (
              <Link to="/meetings" className="btn btn-primary">
                Meetings
              </Link>
            )}
          </div>
        </div>
        {/* columns */}
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      howManyMeetings: null,
      displayName: null,
      user: null,
      userID: null,
      meetings: []
    };
    this.registerUser = this.registerUser.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(FBUser => {
      if (FBUser) {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });

        const meetingsRef = firebase
          .database()
          .ref('meetings/' + FBUser.uid);

        meetingsRef.on('value', snapshot => {
          let meetings = snapshot.val();
          let meetingsList = [];
          for (let item in meetings) {
            meetingsList.push({
              meetingID: item,
              meetingName: meetings[item].meetingName
            });
          }
          this.setState({
            meetings: meetingsList,
            howManyMeetings: meetingsList.length
          });
        });
      } else {
        this.setState({ user: null });
      }
    });
  }

  logOutUser = e => {
    e.preventDefault();
    this.setState({
      displayName: null,
      userID: null,
      user: null
    });

    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate('/login');
      });
  };

  registerUser = userName => {
    firebase.auth().onAuthStateChanged(FBUser => {
      FBUser.updateProfile({
        displayName: userName
      }).then(() => {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
        navigate('/meetings');
      });
    });
  };

  addMeeting = meetingName => {
    const ref = firebase
      .database()
      .ref(`meetings/${this.state.user.uid}`);
    ref.push({ meetingName: meetingName });
  };

  checkInAttendee = (
    attendeeName,
    attendeeEmail,
    userID,
    meetingID
  ) => {
    const ref = firebase
      .database()
      .ref(`meetings/${userID}/${meetingID}/attendees`);
    ref.push({
      attendeeName: attendeeName,
      attendeeEmail: attendeeEmail,
      star: false
    });
  };

  deleteMeeting = (e, whichMeeting) => {
    e.preventDefault();
    const ref = firebase
      .database()
      .ref(`meetings/${this.state.user.uid}/${whichMeeting}`);
    ref.remove();
  };

  deleteAttendee = (e, whichMeeting, whichAttendee) => {
    e.preventDefault();
    const ref = firebase
      .database()
      .ref(
        `meetings/${
          this.state.user.uid
        }/${whichMeeting}/attendees/${whichAttendee}`
      );
    ref.remove();
  };

  toggleStar = (e, star, whichMeeting, whichAttendee) => {
    e.preventDefault();
    const ref = firebase
      .database()
      .ref(
        `meetings/${
          this.state.user.uid
        }/${whichMeeting}/attendees/${whichAttendee}/star`
      );
    ref.set(!star);
  };

  render() {
    return (
      <div className="App">
        <Nav
          meetingsQty={this.state.howManyMeetings}
          user={this.state.user}
          logOutUser={this.logOutUser}
        />
        {this.state.user && (
          <WelcomeMessage
            path="/"
            userName={this.state.user.displayName}
            logOutUser={this.logOutUser}
          />
        )}

        <Router>
          <Home path="/" user={this.state.user} />

          <Meetings
            path="/meetings"
            userID={this.state.userID}
            meetings={this.state.meetings}
            addMeeting={this.addMeeting}
            deleteMeeting={this.deleteMeeting}
          />
          <Login path="/login" />
          <CheckIn
            checkInAttendee={this.checkInAttendee}
            path="/checkin/:userID/:meetingID"
          />
          <Attendees
            path="/attendees/:userID/:meetingID"
            adminUser={this.state.userID}
            toggleStar={this.toggleStar}
            deleteAttendee={this.deleteAttendee}
          />
          <Register
            path="/register"
            registerUser={this.registerUser}
          />
        </Router>
      </div>
    );
  }
}

export default App;
