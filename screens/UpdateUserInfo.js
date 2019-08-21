import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  AsyncStorage
} from "react-native";
//graphql & call api
import { Mutation } from "react-apollo";
import { UPDATE_USER } from "../actions/mutations";

//import Components
import Container from "../components/Container";
import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";

//import hooks
import useInput from "../hooks/useInput";
import { COLORS } from "../constants/Global";
import Loading from "../components/Loading";

const width = Dimensions.get("window").width;

const UpdateUserInfo = ({ navigation }) => {
  const user = navigation.getParam("user");

  const [resetPassword, setResetPassword] = useState(false);
  const idUser = user.id;
  const username = useInput();
  const email = useInput();
  const password = useInput();
  const passwordConfirm = useInput();

  useEffect(() => {
    username.onChange(user.username);
    email.onChange(user.email);
    password.onChange(user.password);
    passwordConfirm.onChange(user.password);
  }, []);

  switchViewInfoAccount = () => {
    if (!resetPassword) {
      return (
        <View>
          <Input
            value={username.value}
            onChange={text => username.onChange(text)}
          />
          <Input value={email.value} onChange={text => email.onChange(text)} />
          <Mutation mutation={UPDATE_USER}>
            {(updateUser, { loading, data }) => {
              if (loading) {
                return <Loading />;
              }
              return (
                <Button
                  text="Change information"
                  action={async () => {
                    try {
                      const user = await updateUser({
                        variables: {
                          id: idUser,
                          username: username.value,
                          email: email.value
                        }
                      });
                      console.log(user.data.UpdateUserInfo);
                      await AsyncStorage.setItem(
                        "@TTMIK:user",
                        JSON.stringify(user.data)
                      );
                      navigation.navigate("Profile");

                      return user;
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                />
              );
            }}
          </Mutation>
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
