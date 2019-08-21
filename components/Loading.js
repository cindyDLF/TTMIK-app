import React from "react";
import { ActivityIndicator } from "react-native";
import { COLORS } from "../constants/Global";

//import components
const Loading = () => (
  <ActivityIndicator size="large" color={COLORS.primaryColor} />
);

export default Loading;
