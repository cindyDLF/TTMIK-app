import gql from "graphql-tag";

export const REGISTER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
    $avatar: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      avatar: $avatar
    )
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      username
      avatar
      email
      level
      point
      date_register
      progression {
        id
        score
        exercice {
          name
          complete_point
        }
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($id: Int!, $username: String!, $email: String!) {
    updateUserInfo(id: $id, username: $username, email: $email) {
      id
      username
      avatar
      email
      level
      point
      date_register
      progression {
        id
        score
        exercice {
          name
          complete_point
        }
      }
    }
  }
`;

export const UPDATE_PROGRESSION = gql`
  mutation updateProgression($userId: ID!, $exerciceId: ID!, $score: Int!) {
    updateProgression(userId: $userId, exerciceId: $exerciceId, score: $score) {
      id
      score
    }
  }
`;

export const UPDATE_POINT = gql`
  mutation updatePoint($id: ID!, $point: In!) {
    updatePoint(id: $id, point: $point) {
      point
    }
  }
`;

export const UPDATE_LEVEL = gql`
  mutation updateLevel($id: ID!, $level: Int!) {
    updateLevel(id: $id, level: $level) {
      level
    }
  }
`;
