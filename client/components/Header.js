import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router'
import query from '../queries/CurrentUser'
import mutation from '../mutation/Logout'

class Header extends Component {
  onLogoutClick() {
    this.props.mutate({
      refetchQueries: [{ query: query }]
    });
  }

  renderButtons() {
    const { loading, current_user } = this.props.data;

    if(loading) { return <div />; }

    if(current_user) {
      return (
        <li>
          <a onClick={this.onLogoutClick.bind(this)}>
            Logout
          </a>
        </li>
      )
    } else {
      return (
        <div>
          <li>
            <Link to="/signup">SignUp</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </div>
      )
    }
  }

  render() {
    return(
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">
            Home
          </Link>
          <ul className="right">
            {this.renderButtons()}
          </ul>
        </div>
      </nav>
    );
  }
};

export default graphql(mutation)(
  graphql(query)(Header)
);
