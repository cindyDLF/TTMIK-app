import React from "react";
import { Text } from "react-native";

//import Components
import Container from "../components/Container";
import Button from "../components/Button";

const ExercicesList = ({ navigation }) => (
  <Container>
    <Text>ExercicesList</Text>
    <Button text="go to lesson" action={() => navigation.navigate("Lesson")} />
  </Container>
);

export default ExercicesList;
