import React from "react";
import { Dimensions } from "react-native";
import * as Progress from "react-native-progress";

import { COLORS, SIZE } from "../constants/Global";

const width = Dimensions.get("window").width;

const ProgressBar = ({ progress, indeterminateAnimationDuration }) => (
  <Progress.Bar
    progress={progress}
    width={width - 100}
    height={15}
    borderRadius={SIZE.primaryBorder}
    animated={true}
    color={COLORS.progressColor}
    borderWidth={3}
    borderRadius={10}
    indeterminateAnimationDuration={
      !indeterminateAnimationDuration ? null : indeterminateAnimationDuration
    }
  />
);

export default ProgressBar;
