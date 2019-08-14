import React from "react";
import { Text, StyleSheet } from "react-native";
import { FONT } from "../constants/Global";

const Title = ({ title }) => <Text style={styles.title}>{title}</Text>;

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontFamily: FONT.primaryFont,
    textAlign: "center",
    marginBottom: 40
  }
});
export default Title;
