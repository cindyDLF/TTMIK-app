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

export const UPDATE_USER = gql`
  mutation updateUser(
    $id: ID!
    $username: String!
    $email: String!
    $newPassword: String!
  ) {
    updateUserInfo(
      id: $id
      username: $username
      email: $email
      newPassword: $newPassword
    ) {
      id
      username
      avatar
      email
      level
      point
      date_register
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
