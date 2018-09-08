// Import React
import React from 'react';
import { FaUsers } from 'react-icons/fa';
import { Link } from '@reach/router';

class Nav extends React.Component {
  render() {
    const { meetingsQty, user } = this.props;
    const isActive = ({ isCurrent }) => {
      return isCurrent
        ? { className: 'nav-item nav-link active' }
        : { className: 'nav-item nav-link' };
    };
    const { logOutUser } = this.props;
    return (
      <nav className="site-nav family-sans navbar navbar-expand bg-primary navbar-dark higher">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <FaUsers className="mr-1" /> Meeting Log
          </Link>
          <div className="navbar-nav ml-auto">
            {user && (
              <Link getProps={isActive} to="/meetings">
                meetings
                {meetingsQty ? (
                  <span className="badge badge-light ml-1">
                    {meetingsQty}
                  </span>
                ) : null}
              </Link>
            )}

            {!user && (
              <Link to="login" getProps={isActive}>
                log in
              </Link>
            )}
            {!user && (
              <Link getProps={isActive} to="/register">
                register
              </Link>
            )}
            {user && (
              <Link
                to="/login"
                getProps={isActive}
                onClick={e => logOutUser(e)}
              >
                log out
              </Link>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
