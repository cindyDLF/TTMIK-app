import React from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { withNavigation } from "react-navigation";

//import Components
import Title from "./Title";
import Back from "./Back";

import { COLORS, FONT } from "../constants/Global";

const width = Dimensions.get("window").width;

const Header = ({ headerName, lvl, pt, goBack, navigation }) => {
  if (goBack) {
    return (
      <View style={styles.headerBack}>
        <Back back={() => navigation.goBack()} position={true} />
        <Text style={styles.headerTitle}>{headerName}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.text}>level {lvl}</Text>
        <Text style={styles.headerTitle}>{headerName}</Text>
        <Text style={styles.text}>{pt} point</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerContainer: {
    width,
    height: 160,
    backgroundColor: COLORS.primaryColor,
    paddingTop: 60,
    padding: 30,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51
  },
  headerBack: {
    width,
    backgroundColor: COLORS.primaryColor,
    paddingTop: 60,
    padding: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: FONT.primaryFont
  },
  headerTitle: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  }
});

export default withNavigation(Header);
