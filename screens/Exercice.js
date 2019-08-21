import React, { useContext, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions
} from "react-native";
import * as Speech from "expo-speech";

//import Components
import Loading from "../components/Loading";
import Header from "../components/Header";
import Container from "../components/Container";
import Button from "../components/Button";

//import hooks
import UserContext from "../hooks/userContext";

//graphql & call api
import { Query } from "react-apollo";
import { EXERCICE_BY_ID } from "../actions/queries";

import { COLORS, FONT } from "../constants/Global";

const height = Dimensions.get("window").height;

const Exercice = ({ navigation }) => {
  const exerciceId = navigation.getParam("exerciceId");
  const { user } = useContext(UserContext);
  const [switchExercice, setSwitchExercice] = useState(false);

  _speak = kr => {
    Speech.speak(kr, { language: "ko", rate: 0.4 });
  };

  _displayBtnExercice = () => {
    if (switchExercice === false) {
      return (
        <TouchableOpacity
          style={styles.btnGotIt}
          onPress={() => setSwitchExercice(true)}
        >
          <Text style={styles.textBtnGotIt}>GOT IT</Text>
        </TouchableOpacity>
      );
    }
  };
  return (
    <Container>
      <Query query={EXERCICE_BY_ID} variables={{ id: exerciceId }}>
        {({ data, loading }) => {
          if (loading) {
            return <Loading />;
          }

          displayExercice = () => {
            if (!switchExercice) {
              const cardLesson = data.exerciceById.data.map((item, idx) => {
                return (
                  <TouchableOpacity
                    key={idx}
                    style={styles.cardContainer}
                    onPress={() => _speak(item.kr)}
                  >
                    <Image
                      source={require("../assets/megaphone.png")}
                      style={{
                        width: 25,
                        height: 25,
                        position: "absolute",
                        right: 10,
                        top: 10
                      }}
                    />
                    <Text style={styles.letterKr}>{item.kr}</Text>
                    <Text>{item.rom}</Text>
                  </TouchableOpacity>
                );
              });
              return cardLesson;
            } else {
              return <Text>Exercice</Text>;
            }
          };

          return (
            <View>
              <Header
                headerName={data.exerciceById.name}
                lvl={user.level}
                pt={user.point}
              />

              <ScrollView
                style={{
                  marginBottom: 370
                }}
              >
                <View style={styles.card}>{displayExercice()}</View>
              </ScrollView>
              {_displayBtnExercice()}
            </View>
          );
        }}
      </Query>
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    flex: 1
  },
  cardContainer: {
    width: "42.5%",
    height: 150,
    borderRadius: 10,
    marginLeft: "5%",
    marginTop: 30,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65
  },
  letterKr: {
    fontSize: 40,
    fontFamily: FONT.primaryFont
  },
  btnGotIt: {
    position: "absolute",
    top: height - 150,
    backgroundColor: COLORS.primaryColor,
    width: "100%",
    padding: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  textBtnGotIt: {
    color: "#fff",
    fontFamily: FONT.primaryFont,
    fontSize: 20
  }
});

export default Exercice;
