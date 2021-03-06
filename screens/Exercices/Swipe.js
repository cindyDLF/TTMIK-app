import React, { useState, useContext, useEffect } from "react";
import { Text, View, Image, Dimensions, StyleSheet } from "react-native";
import { Query } from "react-apollo";
//import query
import { EXERCICE_BY_ID } from "../../actions/queries";
//import components
import Loading from "../../components/Loading";
import Container from "../../components/Container";
import Header from "../../components/Header";
import Modal from "../../components/Modal";
//import hooks
import UserContext from "../../hooks/userContext";
//import images
import { vocabularies } from "../../assets/vocabularies";
//import lib
import SwipeCards from "react-native-swipe-cards";
import * as Animatable from "react-native-animatable";

import { FONT } from "../../constants/Global";

const width = Dimensions.get("window").width;

const Swipe = ({ navigation }) => {
  const exerciceId = navigation.getParam("exerciceId");
  const { user } = useContext(UserContext);
  const [exerciceData, setExerciceData] = useState({});
  const [arrExercice, setArrExercice] = useState([]);
  const [step, setStep] = useState(0);
  const [point, setPoint] = useState(0);

  handleRight = card => {
    if (card.answer) {
      console.log("good game");
      if (step < exerciceData.step) {
        setStep(step + 1);
        setPoint(point + exerciceData.point_per_step);
      }
    } else {
      console.log("lost");
      if (step < exerciceData.step) {
        setStep(step + 1);
      }
    }
  };
  handleLeft = card => {
    if (!card.answer) {
      console.log("good game");
      if (step < exerciceData.step) {
        setStep(step + 1);
        setPoint(point + exerciceData.point_per_step);
      }
    } else {
      console.log("lost");
      if (step < exerciceData.step) {
        setStep(step + 1);
      }
    }
  };

  _card = data => {
    return (
      <View style={styles.cardContainer}>
        <Image
          style={{ width: 140, height: 140, margin: 10 }}
          source={vocabularies[data.img]}
        />
        <Text>{data.img}</Text>
      </View>
    );
  };

  _displayExerciceSwipe = () => {
    console.log(point);
    if (exerciceData.data !== undefined) {
      if (step !== exerciceData.step) {
        return (
          <Container>
            <Header
              headerName={exerciceData.name}
              lvl={user.level}
              pt={user.point}
              avatarUser={user.avatar}
            />
            <Container
              paddingTop={40}
              alignItems="center"
              justifyContent="center"
            >
              <Text style={styles.textExplain}>
                Swipe to the right if you think this translation is correct, to
                the left if you think it's incorrect
              </Text>
              <SwipeCards
                cards={arrExercice}
                renderCard={cardData => _card(cardData)}
                handleYup={handleRight}
                handleNope={handleLeft}
                showNope={false}
                showYup={false}
              />
              <Text style={styles.textKr}>{arrExercice[step].proposition}</Text>
            </Container>
          </Container>
        );
      } else {
        return (
          <Animatable.View>
            <Modal point={point} exerciceId={exerciceData.id} />
          </Animatable.View>
        );
      }
    } else {
      return <Loading />;
    }
  };
  getData = async data => {
    setExerciceData(data);

    const arr = [];
    let goodResponse;
    let badResponse;
    let getRandom;
    for (let i = 0; i <= data.step; i++) {
      goodResponse = data.data[Math.floor(Math.random() * data.data.length)];
      badResponse = data.data[Math.floor(Math.random() * data.data.length)];
      getRandom = Math.round(Math.random() * 1 + 0) === 0;
      arr.push({
        img: goodResponse.mean,
        proposition: getRandom ? goodResponse.kr : badResponse.kr,
        answer: getRandom
      });
    }
    setArrExercice(arr);
  };
  return (
    <Query
      query={EXERCICE_BY_ID}
      variables={{ id: exerciceId }}
      onCompleted={data => getData(data.exerciceById)}
    >
      {({ data, loading }) => {
        if (loading) {
          return <Loading />;
        } else {
          return _displayExerciceSwipe();
        }
      }}
    </Query>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: width - 140,
    height: width - 140,
    borderRadius: 10,
    marginTop: 50,
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
  textKr: {
    fontFamily: FONT.primaryFont,
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 350
  },
  textExplain: {
    fontFamily: FONT.primaryFont,
    fontSize: 15,
    marginTop: 10
  }
});

export default Swipe;
