import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";

//import Components
import Container from "../components/Container";
import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";

//import hooks
import useInput from "../hooks/useInput";
import { COLORS } from "../constants/Global";

const width = Dimensions.get("window").width;

const UpdateUserInfo = ({ navigation }) => {
  const [resetPassword, setResetPassword] = useState(false);
  const username = useInput();
  const email = useInput();
  const password = useInput();
  const passwordConfirm = useInput();

  useEffect(() => {
    const user = navigation.getParam("user");
    username.onChange(user.username);
    email.onChange(user.email);
    password.onChange(user.password);
    passwordConfirm.onChange(user.password);
  });

  switchViewInfoAccount = () => {
    if (!resetPassword) {
      return (
        <View>
          <Input
            value={username.value}
            onChange={text => username.onChange(text)}
          />
          <Input value={email.value} onChange={text => email.onChange(text)} />
        </View>
      );
    } else {
      return (
        <View>
          <Input
            value={password.value}
            onChange={text => password.onChange(text)}
          />
          <Input
            value={passwordConfirm.value}
            onChange={text => passwordConfirm.onChange(text)}
          />
        </View>
      );
    }
  };
  return (
    <View>
      <Header goBack={true} headerName="Edit" />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          margin: 30,
          width: width - 70
        }}
      >
        <TouchableOpacity
          style={[
            styles.btnSwitch,
            !resetPassword
              ? { backgroundColor: COLORS.primaryColor, color: "#fff" }
              : { backgroundColor: COLORS.secondaryColor, color: "#000" }
          ]}
          onPress={() => setResetPassword(false)}
        >
          <Text
            style={[
              styles.btnSwitchText,
              !resetPassword ? { color: "#fff" } : { color: "#000" }
            ]}
          >
            {" "}
            your information
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btnSwitch,
            resetPassword
              ? { backgroundColor: COLORS.primaryColor, color: "#fff" }
              : { backgroundColor: COLORS.secondaryColor, color: "#000" }
          ]}
          onPress={() => setResetPassword(true)}
        >
          <Text
            style={[
              styles.btnSwitchText,
              !resetPassword ? { color: "#000" } : { color: "#fff" }
            ]}
          >
            reset your password
          </Text>
        </TouchableOpacity>
      </View>
      <Container alignItems="center" paddingTop={50}>
        {switchViewInfoAccount()}
        <Button text="Go back" action={() => navigation.goBack()} />
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  btnSwitch: {
    padding: 10
  },
  btnSwitchText: {
    color: "#fff"
  }
});

export default UpdateUserInfo;
