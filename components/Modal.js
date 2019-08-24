import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import * as Animatable from "react-native-animatable";
//import hooks
import UserContext from "../hooks/userContext";
import ProgressionContext from "../hooks/progressionContext";
//graphql & call api
import { Mutation } from "react-apollo";
import { EXERCICE_END } from "../actions/mutations";
//import components
import Loading from "./Loading";

const Modal = ({ point, exerciceId }) => {
  const { user, setUser } = useContext(UserContext);
  const { progression, setProgression } = useContext(ProgressionContext);
  const [canUpdate, setCanUpdate] = useState(true);

  _calcPointUser = (oldPoint, exercicePoint) => {
    return oldPoint + exercicePoint;
  };
  _calcScore = (oldScore, point) => {
    return oldScore + point;
  };

  findProgression = array => {
    let id;
    array.forEach(item => {
      if (item.exercice.id === exerciceId) {
        id = item.score;
      }
    });
    return id;
  };

  updateStorage = data => {
    console.log("test-");
    AsyncStorage.getItem("@TTMIK:progression").then(value => {
      let progressions = JSON.parse(value);
      const oneProgression = progressions.findIndex(
        item => item.id === data.updateProgression.id
      );
      if (oneProgression !== -1) {
        progressions[oneProgression] = data.updateProgression;
      } else {
        progressions.push(data.updateProgression);
      }
      AsyncStorage.setItem("@TTMIK:progression", JSON.stringify(progressions));

      AsyncStorage.setItem("@TTMIK:user", JSON.stringify(data.updatePoint));

      setProgression(progressions);
      setUser(data.updatePoint);

      setCanUpdate(false);
    });
  };

  return (
    <View>
      <Mutation
        mutation={EXERCICE_END}
        onCompleted={data => canUpdate && updateStorage(data)}
      >
        {updateExerciceEnd => {
          const pointTot = _calcPointUser(user.point, point);

          const oldScore = findProgression(progression);
          const score = _calcScore(oldScore, point);
          updateExerciceEnd({
            variables: {
              id: user.id,
              point: pointTot,
              userId: user.id,
              exerciceId: exerciceId,
              score: score
            }
          });

          return (
            <View>
              <Animatable.View style={styles.container} animation="slideInUp">
                <Text>je suis une modal</Text>
              </Animatable.View>
              <Text>cooucou</Text>
            </View>
          );
        }}
      </Mutation>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff"
  }
});

export default Modal;
