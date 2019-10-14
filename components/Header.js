import React from "react";
import { StyleSheet, View, Dimensions, Text, Image } from "react-native";
import { withNavigation } from "react-navigation";

//import Components
import Title from "./Title";
import Back from "./Back";

//import assets
import { avatar } from "../assets/avatar";

import { COLORS, FONT } from "../constants/Global";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Header = ({ headerName, lvl, pt, goBack, navigation, avatarUser }) => {
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
        <Image source={avatar[avatarUser]} style={styles.avatar} />

        <Text style={styles.headerTitle}>{headerName}</Text>
        <View>
          <Text style={styles.text}>{lvl} lvl</Text>
          <Text style={styles.text}>{pt} pt</Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerContainer: {
    width,
    height: height - 1000,
    backgroundColor: COLORS.primaryColor,
    paddingTop: 60,
    padding: 10,
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
  },
  avatar: {
    width: 70,
    height: 70
  }
});

export default withNavigation(Header);
