import React from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import { SIZE, COLORS } from "../constants/Global";

const width = Dimensions.get("window").width;

const Button = ({ text, action }) => (
  <TouchableOpacity onPress={action} style={styles.button}>
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: width - 70,
    height: SIZE.primaryHeight,
    borderRadius: SIZE.primaryBorder,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primaryColor,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginTop: 40
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20
  }
});
export default Button;
