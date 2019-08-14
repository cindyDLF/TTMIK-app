import React from "react";
import { Text, StyleSheet } from "react-native";
import { FONT } from "../constants/Global";

const Title = ({ title, color }) => (
  <Text style={[styles.title, { color: !color ? "#000" : color }]}>
    {title}
  </Text>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontFamily: FONT.primaryFont,
    textAlign: "center",
    marginBottom: 30
  }
});
export default Title;
