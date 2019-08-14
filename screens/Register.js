import React, { useState } from "react";
import {
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";
//import Components
import Input from "../components/Input";
import Container from "../components/Container";
import Button from "../components/Button";
import Title from "../components/Title";
import Back from "../components/Back";
import { COLORS } from "../constants/Global";

const width = Dimensions.get("window").width;

const Register = () => {
  const [chooseAvatar, setchooseAvatar] = useState(false);
  const [gender, setGender] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  stepCreateAccount = () => {
    if (!chooseAvatar) {
      return (
        <View>
          <Text>Enter your information</Text>
          <Input
            placeholder="username"
            value={username}
            onChange={text => setUsername(text)}
          />
          <Input
            placeholder="email"
            value={email}
            onChange={text => setEmail(text)}
          />
          <Input
            placeholder="password"
            value={password}
            onChange={text => setPassword(text)}
          />
          <Input
            placeholder="password confirm"
            value={passwordConfirm}
            onChange={text => setPasswordConfirm(text)}
          />
          <Button text="Next" action={() => setchooseAvatar(true)} />
        </View>
      );
    } else {
      return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              width: width - 70,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <Back back={() => setchooseAvatar(false)} />
            <Text>Choose your avatar</Text>
          </View>
          <TouchableOpacity
            onPress={() => setGender("male")}
            style={[
              styles.borderGender,
              gender === "male" ? styles.border : styles.noneBorder
            ]}
          >
            <Image
              style={{ width: width - 190, height: width - 190, margin: 10 }}
              source={require("../assets/man.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setGender("female")}
            style={[
              styles.borderGender,
              gender === "female" ? styles.border : styles.noneBorder
            ]}
          >
            <Image
              style={{
                width: width - 190,
                height: width - 190,
                margin: 10
              }}
              source={require("../assets/woman.png")}
            />
          </TouchableOpacity>
        </View>
      );
    }
  };

  submitAccount = () => {
    if (
      username !== "" &&
      email !== "" &&
      password !== "" &&
      passwordConfirm !== "" &&
      passwordConfirm === password &&
      gender !== false
    )
      return (
        <Button
          text="Create your account"
          action={() => setchooseAvatar(true)}
        />
      );
  };
  console.log(username, email, password, passwordConfirm, gender);

  return (
    <Container>
      <Title title="Hi, new member !" />
      {stepCreateAccount()}
      {submitAccount()}
    </Container>
  );
};

const styles = StyleSheet.create({
  borderGender: {
    borderRadius: 200,
    borderWidth: 5
  },
  noneBorder: {
    borderColor: "transparent"
  },
  border: {
    borderColor: COLORS.primaryColor
  }
});

export default Register;
