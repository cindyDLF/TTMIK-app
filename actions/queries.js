import gql from "graphql-tag";

export const GET_ALL_EXERCICES = gql`
  {
    allExercices {
      name
    }
  }
`;

export const LOGIN = gql`
  query login($email: String!, $password: String!) {
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

/*export const GET_PROGRESSION = gql`
  query getProgression($userId: ID!) {
    getProgression(userId: $userId) {
      id
      time
      score
      exercice {
        name
        complete_point
      }
    }
  }
`;*/

export const GET_ALL_THEMATICS = gql`
  {
    allThematic {
      id
      name
      exercice {
        id
        name
      }
    }
  }
`;

export const EXERCICE_BY_ID = gql`
  query exerciceById($id: ID!) {
    exerciceById(id: $id) {
      id
      name
      complete_point
      step
      point_per_step
      data
    }
  }
`;
