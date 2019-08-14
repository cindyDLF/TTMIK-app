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
//import hook
import useInput from "../hooks/useInput";

const width = Dimensions.get("window").width;

const Register = ({ navigation }) => {
  const [chooseAvatar, setchooseAvatar] = useState(false);
  const [gender, setGender] = useState(false);
  const username = useInput();
  const email = useInput();
  const password = useInput();
  const passwordConfirm = useInput();
  stepCreateAccount = () => {
    if (!chooseAvatar) {
      return (
        <View>
          <Title title="Hi, new member !" />
          <Input
            placeholder="username"
            value={username.value}
            onChange={text => username.onChange(text)}
          />
          <Input
            placeholder="email"
            value={email.value}
            onChange={text => email.onChange(text)}
          />
          <Input
            placeholder="password"
            value={password.value}
            onChange={text => password.onChange(text)}
          />
          <Input
            placeholder="password confirm"
            value={passwordConfirm.value}
            onChange={text => passwordConfirm.onChange(text)}
          />
          <Button text="Next" action={() => setchooseAvatar(true)} />
        </View>
      );
    } else {
      return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Title title="Almost done !" />
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
            <Text style={{ fontSize: 20 }}>Choose your avatar</Text>
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
  console.log(
    username.value,
    email.value,
    password.value,
    passwordConfirm.value,
    gender
  );

  return (
    <Container alignItems="center" paddingTop={50}>
      {stepCreateAccount()}
      {submitAccount()}
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text>already an account ?</Text>
      </TouchableOpacity>
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
