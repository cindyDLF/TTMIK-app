import gql from "graphql-tag";

export const GET_ALL_EXERCICES = gql`
  {
    allExercices {
      name
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
