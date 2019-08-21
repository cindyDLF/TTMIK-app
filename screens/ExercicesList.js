import React, { useContext } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";

//import Components
import Container from "../components/Container";
import Header from "../components/Header";
import Button from "../components/Button";

//import hooks
import UserContext from "../hooks/userContext";

import { COLORS, FONT } from "../constants/Global";

const ExercicesList = ({ navigation }) => {
  const { user } = useContext(UserContext);

  const exercicesList = navigation.getParam("exercicesList");
  const thematicName = navigation.getParam("thematicName");

  displayExercices = () => {
    if (exercicesList) {
      const cardExercice = exercicesList.map(exercice => {
        return (
          <TouchableOpacity
            key={exercice.id}
            style={styles.cardContainer}
            onPress={() =>
              navigation.navigate("Exercice", { exerciceId: exercice.id })
            }
          >
            <Text style={styles.textCard}>{exercice.name}</Text>
          </TouchableOpacity>
        );
      });
      return cardExercice;
    }
  };

  return (
    <View>
      <Header headerName={thematicName} lvl={user.level} pt={user.point} />
      <Container alignItems="center">
        <ScrollView style={{ width: "100%", height: "100%" }}>
          {displayExercices()}
        </ScrollView>
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    height: 80,
    marginTop: 40,
    backgroundColor: COLORS.secondaryColor,
    alignItems: "flex-start",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65
  },
  textCard: {
    fontSize: 25,
    fontFamily: FONT.primaryFont,
    marginLeft: 20
  }
});
export default ExercicesList;
