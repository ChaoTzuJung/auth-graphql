import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';

import AuthForm from './AuthForm';
import SignupMutation from '../mutation/Signup'
import query from '../queries/CurrentUser'

class SignupForm extends Component {
  constructor(props){
    super(props);

    this.state = { errors: [] };
  }

  componentWillUpdate(nextProps){
    if(!this.props.data.current_user && nextProps.data.current_user) {
      hashHistory.push('/dashboard')
    }
  }

  onSubmit({ email, password }) {
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query }]
    }).catch(res => { 
      const errors = res.graphQLErrors.map(error => error.message);
      this.setState({ errors });
     });
  }
  
  render() {
    return (
      <div>
        <h3>Sign Up</h3>
        <AuthForm 
          errors={ this.state.errors }
          onSubmit={ this.onSubmit.bind(this)} />
      </div>
    );
  }
}

export default graphql(query)(
  graphql(SignupMutation)(SignupForm)
)