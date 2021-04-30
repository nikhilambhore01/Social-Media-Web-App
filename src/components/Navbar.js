/** @format */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutUser } from '../store/actions/auth';
import { searchUsers } from '../store/actions/search';

class Navbar extends React.Component {
  logOut = () => {
    localStorage.removeItem('token');
    this.props.dispatch(logoutUser());
  };

  handleSearch = (e) => {
    const searchText = e.target.value;

    this.props.dispatch(searchUsers(searchText));
  };

  render() {
    const { auth, results } = this.props;
    return (
      <div>
        <nav className="nav">
          <div className="left-div">
            {auth.isLoggedin && (
              <Link to="/">
                <img
                  // src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
                  src="https://www.newfoundlandpower.com/-/media/Unsorted/126-RATE-STABILZATION-PLAN--HERO-IMAGE/023SOCIALMEDIAHEROIMAGE.jpg?mw=768&hash=0A5CC41FD0DA7D24379CD810409A3224B3A8EBF8"
                  alt="logo"
                  id="logo"
                />
              </Link>
            )}
          </div>

          <div className="search-container">
            <img
              className="search-icon"
              src="https://image.flaticon.com/icons/svg/483/483356.svg"
              alt="search-icon"
            />
            <input placeholder="Search" onChange={this.handleSearch} />

            {results.length > 0 && (
              <div className="search-results">
                <ul>
                  {results.map((user) => (
                    <li className="search-results-row" key={user._id}>
                      <Link to={`/user/${user._id}`}>
                        <img
                          src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                          alt="user-dp"
                        />
                        <span>{user.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="right-nav">
            {auth.isLoggedin && (
              <div className="user">
                <Link to="/settings">
                  <img
                    src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                    alt="user-dp"
                    id="user-dp"
                  />
                </Link>
                <span>{auth.user.name}</span>
              </div>
            )}

            <div className="nav-links">
              <ul>
                {!auth.isLoggedin && (
                  <li>
                    <Link to="/login">
                      <img
                        src="https://www.seekpng.com/png/full/367-3670610_png-hd-login-green-login-button-png.png"
                        alt="Log in"
                        id="logout-icon"
                      />
                    </Link>
                  </li>
                )}

                {auth.isLoggedin && (
                  <li onClick={this.logOut}>
                    <img
                      src="https://cdn.imgbin.com/15/17/24/imgbin-shutdown-computer-icons-others-Dx5czGQRB8cTKKpXvDyHct6nK.jpg"
                      alt="Log out"
                      id="logout-icon"
                    />
                  </li>
                )}

                {!auth.isLoggedin && (
                  <li>
                    <Link to="/signup">
                      <img
                        src="https://www.mywebkc.com/wp-content/uploads/2014/12/Sign-up-Button.png"
                        alt="signup"
                        id="logout-icon"
                      />
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    results: state.search.results,
  };
}
export default connect(mapStateToProps)(Navbar);
