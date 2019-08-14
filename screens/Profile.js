import React from "react";
import { Text } from "react-native";

//import components
import Button from "../components/Button";
import Container from "../components/Container";

const Profile = ({ navigation }) => (
  <Container>
    <Text>Profile</Text>
    <Button
      text="setting"
      action={() => navigation.navigate("UpdateUserInfo")}
    />
  </Container>
);

export default Profile;
