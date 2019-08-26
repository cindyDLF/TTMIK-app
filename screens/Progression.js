import React, { useContext } from "react";
import {
  Text,
  View,
  Dimensions,
  Image,
  StyleSheet,
  ScrollView
} from "react-native";
import * as Progress from "react-native-progress";

//import Components
import Container from "../components/Container";
import Title from "../components/Title";

import Header from "../components/Header";

//import hooks
import ProgressionContext from "../hooks/progressionContext";
import UserContext from "../hooks/userContext";

import { COLORS, FONT } from "../constants/Global";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const koala = require("../assets/koala.png");

const Progression = () => {
  const { progression } = useContext(ProgressionContext);
  const { user } = useContext(UserContext);
  calcProgression = progression => {
    return (
      (100 * progression.score) / progression.exercice.complete_point / 100
    );
  };

  displayProgression = () => {
    const progressions = progression.map((item, idx) => {
      return (
        <View key={idx} style={{ alignItems: "center", paddingTop: 50 }}>
          <Text style={styles.exerciceName}>{item.exercice.name}</Text>

          <View style={styles.container}>
            <Image style={{ width: 130, height: 150 }} source={koala} />
            <Progress.Circle
              progress={calcProgression(item)}
              size={70}
              thickness={8}
              showsText={true}
              color={COLORS.secondaryColor}
            />
            <Text style={styles.score}>
              {`score\n`}
              {item.score}
            </Text>
          </View>
        </View>
      );
    });
    return progressions;
  };
  return (
    <Container>
      <Header headerName={user.username} lvl={user.level} pt={user.point} />

      <View style={{ width, alignItems: "center", height }}>
        <ScrollView style={{ width }}>{displayProgression()}</ScrollView>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    width: width - 70,
    height: 100,
    padding: 10,
    borderRadius: 400,
    backgroundColor: COLORS.progressColor,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    marginTop: 30,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",

    alignItems: "center"
  },
  exerciceName: {
    fontSize: 23,
    textAlign: "center",
    fontFamily: FONT.primaryFont
  },
  score: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: FONT.primaryFont,
    color: "#fff"
  }
});

export default Progression;
