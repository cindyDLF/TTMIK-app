import React, { useState } from "react";
import {
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";
//graphql & call api
import { Mutation } from "react-apollo";
import { REGISTER } from "../actions/mutations";
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
  const [avatar, setAvatar] = useState("");
  const username = useInput();
  const email = useInput();
  const password = useInput();
  const passwordConfirm = useInput();
  stepCreateAccount = () => {
    if (!chooseAvatar) {
      return (
        <Container alignItems="center">
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
        </Container>
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
            onPress={() => setAvatar("male")}
            style={[
              styles.borderGender,
              avatar === "male" ? styles.border : styles.noneBorder
            ]}
          >
            <Image
              style={{ width: width - 190, height: width - 190, margin: 10 }}
              source={require("../assets/avatar/man.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setAvatar("female")}
            style={[
              styles.borderGender,
              avatar === "female" ? styles.border : styles.noneBorder
            ]}
          >
            <Image
              style={{
                width: width - 190,
                height: width - 190,
                margin: 10
              }}
              source={require("../assets/avatar/woman.png")}
            />
          </TouchableOpacity>
        </View>
      );
    }
  };

  submitAccount = () => {
    if (
      username.value !== "" &&
      email.value !== "" &&
      password.value !== "" &&
      passwordConfirm.value === password.value &&
      avatar !== ""
    ) {
      return (
        <Mutation mutation={REGISTER}>
          {(addUser, { error, data }) => {
            return (
              <Button
                text="Create your account"
                action={async () => {
                  try {
                    const user = await addUser({
                      variables: {
                        username: username.value,
                        email: email.value,
                        password: password.value,
                        avatar: avatar
                      }
                    });
                    if (user) {
                      navigation.navigate("Login");
                    }
                  } catch (err) {
                    console.log("ERROR ====> please retry");
                  }
                }}
              />
            );
          }}
        </Mutation>
      );
    }
  };

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
