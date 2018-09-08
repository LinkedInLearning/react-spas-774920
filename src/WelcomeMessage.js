import React from 'react';
import { Link } from '@reach/router';

class WelcomeMessage extends React.Component {
  render() {
    const { userName, logOutUser } = this.props;
    return (
      <div className="text-center mt-4">
        Welcome
        <span className="text-secondary font-weight-bold pl-1">
          {userName}
        </span>
        ,
        <Link
          to="/"
          className="font-weight-bold text-primary pl-1"
          onClick={e => logOutUser(e)}
        >
          log out
        </Link>
      </div>
    );
  }
}

export default WelcomeMessage;
