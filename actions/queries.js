import gql from "graphql-tag";

export const GET_ALL_EXERCICES = gql`
  {
    allExercices {
      name
      access_level
      exercice_type
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
        access_level
        exercice_type
      }
    }
  }
`;

export const EXERCICE_BY_ID = gql`
  query($id: Int!) {
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
