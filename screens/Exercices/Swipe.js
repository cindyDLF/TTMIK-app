import React, { useState, useContext, useEffect } from "react";
import { Text, View, Image, Dimensions, StyleSheet } from "react-native";
import { Query } from "react-apollo";
//import query
import { EXERCICE_BY_ID } from "../../actions/queries";
//import components
import Loading from "../../components/Loading";
import Container from "../../components/Container";
import Header from "../../components/Header";
//import hooks
import UserContext from "../../hooks/userContext";
//import image
import { vocabularies } from "../../assets/vocabularies";
import { COLORS, FONT } from "../../constants/Global";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const Swipe = ({ navigation }) => {
  const exerciceId = navigation.getParam("exerciceId");
  const { user } = useContext(UserContext);
  const [randomBoolean, setRandomBoolean] = useState(false);

  const [exerciceData, setExerciceData] = useState({});

  _displayExerciceSwipe = () => {
    if (exerciceData.data !== undefined) {
      setRandomBoolean(Math.round(Math.random() * 1 + 0) === 0);
      const response =
        exerciceData.data[Math.floor(Math.random() * exerciceData.data.length)];
      let badResponse =
        exerciceData.data[Math.floor(Math.random() * exerciceData.data.length)];

      if (badResponse === response) {
        badResponse =
          exerciceData.data[
            Math.floor(Math.random() * exerciceData.data.length)
          ];
      }
      console.log(randomBoolean);

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
            <View style={styles.cardContainer}>
              <Image
                style={{ width: 140, height: 140, margin: 10 }}
                source={vocabularies[response.mean]}
              />
              <Text>{response.mean}</Text>
            </View>
            {randomBoolean ? (
              <Text style={styles.textKr}>{response.kr}</Text>
            ) : (
              <Text style={styles.textKr}>{badResponse.kr}</Text>
            )}
          </Container>
        </Container>
      );
    } else {
      return <Loading />;
    }
  };
  getData = data => {
    setExerciceData(data);
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
    marginTop: 70
  },
  textExplain: {
    fontFamily: FONT.primaryFont,
    fontSize: 15,
    marginTop: 10
  }
});

export default Swipe;
