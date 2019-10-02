import React, { useContext, useState, useEffect } from "react";
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
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";

//import Components
import Loading from "../components/Loading";
import Header from "../components/Header";
import Container from "../components/Container";
import Modal from "../components/Modal";
import Title from "../components/Title";

//import hooks
import UserContext from "../hooks/userContext";

//graphql & call api
import { Query } from "react-apollo";
import { EXERCICE_BY_ID } from "../actions/queries";

import { COLORS, FONT } from "../constants/Global";

import { shuffle } from "../utils";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const Exercice = ({ navigation }) => {
  const exerciceId = navigation.getParam("exerciceId");
  const { user } = useContext(UserContext);
  const [switchExercice, setSwitchExercice] = useState(false);
  const [dataExercice, setDataExercice] = useState(null);
  const [goodItem, setGoodItem] = useState(null);
  const [randomItem, setRandomItem] = useState(null);
  const [completeStep, setCompleteStep] = useState(null);
  const [step, setStep] = useState(0);
  const [userPoint, setUserPoint] = useState(0);
  const [responseSentence, setResponseSentence] = useState("");

  _speak = kr => {
    Speech.speak(kr, { language: "ko", rate: 0.4 });
  };

  _renderChoose = () => {
    if (randomItem !== null) {
      const render = randomItem.map((item, idx) => {
        return (
          <TouchableOpacity
            style={styles.choose}
            key={idx}
            onPress={() => checkResponse(item)}
          >
            <Text style={styles.titleExercice}>{item.rom}</Text>
          </TouchableOpacity>
        );
      });
      return render;
    } else {
      return <Loading />;
    }
  };

  getData = data => {
    setDataExercice(data.data);
    setCompleteStep(data.step);
    displayRandomItem(data.data);
  };

  checkResponse = item => {
    if (step <= completeStep) {
      if (item.kr === goodItem.kr) {
        setUserPoint(userPoint + 5);
        setResponseSentence("Good response +5");
      } else {
        setResponseSentence("Bad response");
      }
      setStep(step + 1);
      displayRandomItem(dataExercice);
    }
  };

  displayRandomItem = array => {
    const setgooditem = array[Math.floor(Math.random() * array.length)];
    setGoodItem(setgooditem);

    let arr = [];

    arr.push(setgooditem);

    while (arr.length !== 4) {
      const item = array[Math.floor(Math.random() * array.length)];
      if (!arr.includes(item)) {
        arr.push(item);
      }
    }

    setRandomItem(shuffle(arr));
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
      <Query
        query={EXERCICE_BY_ID}
        variables={{ id: exerciceId }}
        onCompleted={data => getData(data.exerciceById)}
      >
        {({ data, loading }) => {
          if (loading) {
            return <Loading />;
          }

          displayExercice = () => {
            if (!switchExercice) {
              if (dataExercice !== null) {
                const cardLesson = dataExercice.map((item, idx) => {
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
                <Loading />;
              }
            } else {
              if (dataExercice !== null) {
                return (
                  <Container
                    paddingTop={40}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text style={styles.titleExercice}>
                      Choose the right response
                    </Text>
                    <Progress.Bar
                      progress={step / 10}
                      width={width - 60}
                      color="#fff"
                      unfilledColor={COLORS.progressColor}
                      borderColor={COLORS.progressColor}
                      borderWidth={3}
                      height={10}
                      borderRadius={10}
                      style={{ marginTop: 50 }}
                    />

                    <View
                      style={{
                        width: "100%",
                        alignItems: "center",
                        marginTop: 40
                      }}
                    >
                      <View style={[styles.cardContainer, { width: "45%" }]}>
                        <Text style={styles.letterKr}>{goodItem.kr}</Text>
                      </View>
                      <View style={styles.chooseContainer}>
                        {_renderChoose()}
                      </View>
                    </View>
                    <Text
                      style={[
                        { marginTop: 40 },
                        responseSentence === "Bad response"
                          ? { color: "#D60100" }
                          : { color: "#14A431" }
                      ]}
                    >
                      {responseSentence}
                    </Text>
                  </Container>
                );
              } else {
                <Loading />;
              }
            }
          };
          return (
            <View>
              {step !== 10 ? (
                <Header
                  headerName={data.exerciceById.name}
                  lvl={user.level}
                  pt={user.point}
                  avatarUser={user.avatar}
                />
              ) : null}

              <ScrollView
                style={{
                  marginBottom: 370
                }}
              >
                <View style={styles.card}>{displayExercice()}</View>
              </ScrollView>
              {_displayBtnExercice()}
              <Animatable.View>
                {step === 10 ? (
                  <Modal point={userPoint} exerciceId={data.exerciceById.id} />
                ) : null}
              </Animatable.View>
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
    backgroundColor: COLORS.progressColor,
    width: "100%",
    padding: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  textBtnGotIt: {
    color: "#fff",
    fontFamily: FONT.primaryFont,
    fontSize: 20
  },
  chooseContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 30
  },
  choose: {
    padding: 10,
    margin: 20
  },
  titleExercice: {
    fontFamily: FONT.primaryFont,
    fontSize: 20
  }
});

export default Exercice;
