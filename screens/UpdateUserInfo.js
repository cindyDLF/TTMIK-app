import React from "react";
import { Text } from "react-native";

//import Components
import Container from "../components/Container";
import Button from "../components/Button";

const UpdateUserInfo = ({ navigation }) => (
  <Container>
    <Text>UpdateUserInfo</Text>
    <Button text="Go back" action={() => navigation.goBack()} />
  </Container>
);

export default UpdateUserInfo;
