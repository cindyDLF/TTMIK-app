import React from "react";
import { StyleSheet, View } from "react-native";

const Container = props => (
  <View
    {...props}
    style={[
      style.container,
      { paddingTop: props.paddingTop, alignItems: props.alignItems }
    ]}
  />
);

const style = StyleSheet.create({
  container: {
    //alignItems: "center"
    //flex: 1
  }
});

export default Container;
