import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

//import Components
import Container from "../components/Container";
import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";

const UpdateUserInfo = ({ navigation }) => (
  <View>
    <Header goBack={true} headerName="Edit" />
    <View style={{ display: "flex", flexDirection: "row" }}>
      <TouchableOpacity>
        <Text> your information</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>you password</Text>
      </TouchableOpacity>
    </View>
    <Container alignItems="center" paddingTop={50}>
      <Text>UpdateUserInfo</Text>
      <Input />
      <Input />
      <Button text="Go back" action={() => navigation.goBack()} />
    </Container>
  </View>
);

export default UpdateUserInfo;
