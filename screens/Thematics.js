import React, { useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";

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

const Thematics = ({ navigation }) => {
  const { user } = useContext(UserContext);
  return (
    <View>
      <Header headerName="Training" lvl={user.level} pt={user.point} />
      <Container alignItems="flex-start" paddingTop={30}>
        <ScrollView style={{ width: "100%", height: "100%" }}>
          <Query query={GET_ALL_THEMATICS} fetchPolicy="cache-and-network">
            {({ data, loading }) => {
              if (loading) {
                return (
                  <View>
                    <Loading />
                  </View>
                );
              }
              const thematicCard = data.allThematic.map(thematic => (
                <TouchableOpacity
                  style={styles.cardContainer}
                  key={thematic.id}
                  onPress={() =>
                    navigation.navigate("ExercicesList", {
                      exercicesList: thematic.exercice,
                      thematicName: thematic.name
                    })
                  }
                >
                  <Text style={styles.textCard}>{thematic.name}</Text>
                </TouchableOpacity>
              ));
              return thematicCard;
            }}
          </Query>
        </ScrollView>
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "40%",
    height: 150,
    borderRadius: 10,
    marginLeft: "5%",
    backgroundColor: COLORS.secondaryColor,
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
    fontFamily: FONT.primaryFont
  }
});

export default Thematics;
