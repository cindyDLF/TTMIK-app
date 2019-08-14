import React from "react";
import { Text, Image, TouchableOpacity } from "react-native";

//import components
import Container from "../components/Container";
import Button from "../components/Button";
import Input from "../components/Input";
import Title from "../components/Title";

const Login = ({ navigation }) => (
  <Container>
    <Title title="TTMIK">Login</Title>
    <Input placeholder="email" />
    <Input placeholder="password" />
    <Button
      text="go to profile"
      action={() => navigation.navigate("Welcome")}
    />
    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
      <Text>Not already member ? </Text>
    </TouchableOpacity>
    <Image
      style={{ width: 250, height: 250, marginTop: 40 }}
      source={require("../assets/bikecycle.gif")}
    />
  </Container>
);

export default Login;
