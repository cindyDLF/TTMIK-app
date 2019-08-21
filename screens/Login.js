import React from "react";
import { Text, Image, TouchableOpacity, AsyncStorage } from "react-native";
//graphql & call api
import { Mutation } from "react-apollo";
import { LOGIN } from "../actions/mutations";

//import components
import Container from "../components/Container";
import Button from "../components/Button";
import Input from "../components/Input";
import Title from "../components/Title";

//import hook
import useInput from "../hooks/useInput";

const Login = ({ navigation }) => {
  const email = useInput();
  const password = useInput();
  return (
    <Container alignItems="center" paddingTop={50}>
      <Title title="TTMIK">Login</Title>
      <Input
        placeholder="email"
        onChange={text => email.onChange(text)}
        value={email.value}
      />
      <Input
        placeholder="password"
        onChange={text => password.onChange(text)}
        value={password.value}
      />
      <Mutation mutation={LOGIN}>
        {(login, { data }) => (
          <Button
            text="Sign In"
            action={async () => {
              try {
                const user = await login({
                  variables: { email: email.value, password: password.value }
                });
                await AsyncStorage.setItem(
                  "@TTMIK:user",
                  JSON.stringify(user.data.login)
                );
                navigation.navigate("Profile");
                return user;
              } catch (err) {
                console.log("ERROR ======> wrong pawword or email");
              }
            }}
          />
        )}
      </Mutation>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text>Not already member ? </Text>
      </TouchableOpacity>
      <Image
        style={{ width: 250, height: 250, marginTop: 40 }}
        source={require("../assets/bikecycle.gif")}
      />
    </Container>
  );
};

export default Login;
