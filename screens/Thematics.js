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
      <TouchableOpacity
        key={item.id}
        style={styles.cardContainer}
        onPress={() =>
          navigation.navigate("ExercicesList", {
            exercicesList: item.exercice,
            thematicName: item.name
          })
        }
      >
        <Text style={styles.textCard}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <Header headerName="Training" lvl={user.level} pt={user.point} />
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

            // const thematicCard = data.allThematic.map(thematic => {
            //   return (
            //     <TouchableOpacity
            //       style={styles.cardContainer}
            //       key={thematic.id}
            //       onPress={() =>
            //         navigation.navigate("ExercicesList", {
            //           exercicesList: thematic.exercice,
            //           thematicName: thematic.name
            //         })
            //       }
            //     >
            //       <Text style={styles.textCard}>{thematic.name}</Text>
            //     </TouchableOpacity>
            //   );
            // });
            return (
              <Carousel
                ref={c => {
                  this._carousel = c;
                }}
                data={data.allThematic}
                renderItem={_renderItem}
                sliderWidth={width}
                itemWidth={width - 50}
                sliderHeight={height}
                itemHeight={height}
                activeAnimationType="spring"
              />
            );
          }}
        </Query>
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: width - 80,
    width: width - 80,
    borderRadius: 10,
    marginLeft: "5%",
    marginBottom: 20,
    backgroundColor: COLORS.progressColor,
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
  textCard: {
    fontSize: 25,
    fontFamily: FONT.primaryFont,
    color: "#fff"
  }
});

export default Thematics;
