import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, AsyncStorage, Dimensions } from "react-native";
import * as Animatable from "react-native-animatable";
//import hooks
import UserContext from "../hooks/userContext";
import ProgressionContext from "../hooks/progressionContext";
//graphql & call api
import { Mutation } from "react-apollo";
import { EXERCICE_END } from "../actions/mutations";
//import components
import Title from "./Title";
import Loading from "./Loading";
import ModalNextLevel from "./ModalNextLevel";
import ProgressBar from "./ProgressBar";

import { calcPtLevel, calcRank } from "../utils";

const width = Dimensions.get("window").width;

const Modal = ({ point, exerciceId }) => {
  const { user, setUser } = useContext(UserContext);
  const { progression, setProgression } = useContext(ProgressionContext);
  const [canUpdate, setCanUpdate] = useState(true);
  const [visible] = useState(false);

  _calcPointUser = (oldPoint, exercicePoint) => {
    return oldPoint + exercicePoint;
  };
  _calcScore = (oldScore, point) => {
    return oldScore + point;
  };

  const ptLevel = calcPtLevel(user.level);
  const rankLevel = calcRank(user.point, ptLevel);

  findProgression = array => {
    let id;
    array.forEach(item => {
      if (item.exercice.id === exerciceId) {
        id = item.score;
      }
    });
    return id;
  };

  updateStorage = async data => {
    await AsyncStorage.getItem("@TTMIK:progression").then(value => {
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
  if (point !== 0) {
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
                <Animatable.View style={styles.container} animation="bounceIn">
                  <View style={{ alignItems: "center", width }}>
                    <Title title="You Win" />
                    <Text>+ {point} points</Text>
                    <ProgressBar progress={rankLevel} />
                  </View>
                </Animatable.View>
                {user.point >= ptLevel ? (
                  <ModalNextLevel visible={visible} />
                ) : null}
              </View>
            );
          }}
        </Mutation>
      </View>
    );
  } else {
    return (
      <Animatable.View style={styles.container} animation="bounceIn">
        <View style={{ alignItems: "center", width }}>
          <Text>Bad</Text>
        </View>
      </Animatable.View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    width,
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center"
  }
});

export default Modal;
