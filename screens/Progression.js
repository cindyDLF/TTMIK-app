import React, { useContext } from "react";
import { Text, View } from "react-native";

//import Components
import Container from "../components/Container";
//import hooks
import ProgressionContext from "../hooks/progressionContext";

const Progression = () => {
  const { progression } = useContext(ProgressionContext);

  displayProgression = () => {
    console.log(progression);
    const progressions = progression.map((item, idx) => {
      console.log(item);

      return (
        <View key={idx}>
          <Text>{item.id}</Text>
        </View>
      );
    });
    return progressions;
  };
  return <Container>{displayProgression()}</Container>;
};

export default Progression;
