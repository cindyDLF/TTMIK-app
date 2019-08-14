import React from "react";
import { StyleSheet, View } from "react-native";

const Container = props => <View {...props} style={style.container} />;

const style = StyleSheet.create({
  container: {
    //justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingTop: 100
  }
});

export default Container;
