import gql from 'graphql-tag';

export default gql`
  {
    current_user {
      id
      email
    }
  }
`;