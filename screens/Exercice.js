import React from "react";
import { Text } from "react-native";

//import Components
import Container from "../components/Container";
import Button from "../components/Button";

const Exercice = ({ navigation }) => (
  <Container>
    <Text>Exercice</Text>
    <Button
      text="go to end"
      action={() => navigation.navigate("ExerciceEnd")}
    />
  </Container>
);

export default Exercice;
