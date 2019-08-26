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
          id
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
          id
          name
          complete_point
        }
      }
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation updatePassword($id: Int!, $newPassword: String!) {
    updatePassword(id: $id, newPassword: $newPassword)
  }
`;

export const UPDATE_PROGRESSION = gql`
  mutation updateProgression($userId: ID!, $exerciceId: ID!, $score: Int!) {
    updateProgression(userId: $userId, exerciceId: $exerciceId, score: $score) {
      id
      score
      exercice {
        complete_point
        id
        name
      }
    }
  }
`;

export const UPDATE_POINT = gql`
  mutation updatePoint($id: Int!, $point: Int!) {
    updatePoint(id: $id, point: $point) {
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
          id
          name
          complete_point
        }
      }
    }
  }
`;

export const UPDATE_LEVEL = gql`
  mutation updateLevel($id: Int!, $level: Int!) {
    updateLevel(id: $id, level: $level) {
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
          id
          name
          complete_point
        }
      }
    }
  }
`;

export const EXERCICE_END = gql`
  mutation updateExerciceEnd(
    $id: Int!
    $point: Int!
    $userId: ID!
    $exerciceId: ID!
    $score: Int!
  ) {
    updatePoint(id: $id, point: $point) {
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
          id
          name
          complete_point
        }
      }
    }
    updateProgression(userId: $userId, exerciceId: $exerciceId, score: $score) {
      id
      score
      exercice {
        complete_point
        id
        name
      }
    }
  }
`;
