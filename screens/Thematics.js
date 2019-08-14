import React from "react";
import { Text } from "react-native";

//import Components
import Container from "../components/Container";
import Button from "../components/Button";

const Thematics = ({ navigation }) => (
  <Container>
    <Text>Thematics</Text>
    <Button
      text="go to list exercice"
      action={() => navigation.navigate("ExercicesList")}
    />
  </Container>
);

export default Thematics;
