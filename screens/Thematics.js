import React, { useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from "react-native";
import Carousel from "react-native-snap-carousel";

//graphql & call api
import { Query } from "react-apollo";
import { GET_ALL_THEMATICS } from "../actions/queries";

//import hooks
import UserContext from "../hooks/userContext";

//import Components
import Loading from "../components/Loading";
import Container from "../components/Container";
import Header from "../components/Header";

import { FONT, COLORS } from "../constants/Global";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Thematics = ({ navigation }) => {
  const { user } = useContext(UserContext);

  _renderItem = ({ item, index }) => {
    return (
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.cardThematic}
          key={item.id}
          onPress={() =>
            navigation.navigate("ExercicesList", {
              exercicesList: item.exercice,
              thematicName: item.name
            })
          }
        >
          <Text style={styles.textCard}>{item.name}</Text>
        </TouchableOpacity>

        <ScrollView>
          <View style={styles.cardExerciceContainer}>
            {item.exercice.map((element, idx) => {
              if (element.access_level <= user.level) {
                return (
                  <TouchableOpacity
                    key={idx}
                    style={styles.cardExercice}
                    onPress={() =>
                      navigation.navigate(element.exercice_type, {
                        exerciceId: element.id
                      })
                    }
                  >
                    <Text style={styles.textCardExercice}>{element.name}</Text>
                  </TouchableOpacity>
                );
              } else {
                return (
                  <TouchableOpacity
                    key={idx}
                    style={styles.cardExercice}
                    onPress={() => console.log("need", element.access_level)}
                  >
                    <Text>Not access</Text>
                  </TouchableOpacity>
                );
              }
            })}
          </View>
        </ScrollView>
      </View>
    );
  };
  return (
    <View>
      <Header
        headerName="Training"
        lvl={user.level}
        pt={user.point}
        avatarUser={user.avatar}
      />
      <Container alignItems="flex-start" paddingTop={30}>
        <Query query={GET_ALL_THEMATICS} fetchPolicy="cache-and-network">
          {({ data, loading }) => {
            if (loading) {
              return (
                <View>
                  <Loading />
                </View>
              );
            }

            return (
              <View>
                <Carousel
                  ref={c => {
                    this._carousel = c;
                  }}
                  loop={true}
                  data={data.allThematic}
                  renderItem={_renderItem}
                  sliderWidth={width}
                  itemWidth={width - 50}
                  sliderHeight={height}
                  itemHeight={height}
                  activeAnimationType="spring"
                />
              </View>
            );
          }}
        </Query>
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: height - 300,

    width: "100%"
  },
  cardThematic: {
    height: height - 600,
    backgroundColor: COLORS.progressColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    //marginLeft: "5%",
    //marginBottom: 20,

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
    color: "#fff"
  },
  cardExercice: {
    width: width / 3,
    height: width / 3,
    margin: 10,
    backgroundColor: COLORS.secondaryColor,
    borderRadius: 10,
    //marginLeft: "5%",
    //marginBottom: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    alignItems: "center",
    justifyContent: "center"
  },
  cardExerciceContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 60,
    padding: 10
  },
  textCardExercice: {
    fontFamily: FONT.primaryFont
  }
});

export default Thematics;
