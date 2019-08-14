import React from "react";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../constants/Global";
const Back = ({ back }) => (
  <TouchableOpacity onPress={back} style={styles.back}>
    <Image
      style={{ width: 30, height: 30 }}
      source={require("../assets/go-back.png")}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  back: {
    backgroundColor: COLORS.primaryColor,
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Back;
