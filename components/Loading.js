import React from "react";
import { ActivityIndicator, Dimensions } from "react-native";
import { COLORS } from "../constants/Global";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

//import components
const Loading = () => (
  <ActivityIndicator
    style={{ display: "flex", justifyContent: "center", width, height }}
    size="large"
    color={COLORS.primaryColor}
  />
);

export default Loading;
