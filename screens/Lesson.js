import React from "react";
import { Text } from "react-native";

//import Components
import Container from "../components/Container";
import Button from "../components/Button";
const Lesson = ({ navigation }) => (
  <Container>
    <Text>Lesson</Text>
    <Button
      text="go to exercice"
      action={() => navigation.navigate("Exercice")}
    />
  </Container>
);

export default Lesson;
