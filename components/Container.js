import React from "react";
import { StyleSheet, View } from "react-native";

const Container = props => (
  <View
    {...props}
    style={[
      style.container,
      {
        paddingTop: props.paddingTop,
        alignItems: props.alignItems,
        justifyContent: props.justifyContent
      }
    ]}
  />
);

const style = StyleSheet.create({
  container: {
    //alignItems: "center",
    width: "100%"
  }
});

export default Container;
