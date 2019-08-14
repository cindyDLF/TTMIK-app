import React, { useEffect } from "react";
import { Text, Image } from "react-native";

//import Components
import Container from "../components/Container";
import Title from "../components/Title";

const Welcome = ({ navigation }) => {
  useEffect(() => {
    console.log("welcome");
    setTimeout(() => navigation.navigate("Profile"), 3000);
  });
  return (
    <Container>
      <Title title="Welcome" />
    </Container>
  );
};

export default Welcome;
