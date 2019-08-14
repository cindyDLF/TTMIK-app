import React from "react";
import { Text } from "react-native";

//import Components
import Container from "../components/Container";
import Button from "../components/Button";

const ExerciceEnd = ({ navigation }) => (
  <Container>
    <Text>ExerciceEnd</Text>
    <Button
      text="go back to thematic"
      action={() => navigation.navigate("Thematics")}
    />
  </Container>
);

export default ExerciceEnd;
