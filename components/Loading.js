import React from "react";
import { StyleSheet, ActivityIndicator } from "react-native";

//import components
const Loading = () => <ActivityIndicator size="large" color="#0000ff" />;

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100
  }
});

export default Loading;
