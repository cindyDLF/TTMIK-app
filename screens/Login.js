import React, { useContext } from "react";
import { Text, Image, TouchableOpacity, AsyncStorage } from "react-native";
//graphql & call api
import { Mutation } from "react-apollo";
import { LOGIN } from "../actions/mutations";

//import components
import Loading from "../components/Loading";
import Container from "../components/Container";
import Button from "../components/Button";
import Input from "../components/Input";
import Title from "../components/Title";

//import hook
import useInput from "../hooks/useInput";
import UserContext from "../hooks/userContext";
import ProgressionContext from "../hooks/progressionContext";

const Login = ({ navigation }) => {
  const email = useInput("Eurika@gmail.com");
  const password = useInput("1234567");
  const { user, setUser } = useContext(UserContext);
  const { progression, setProgression } = useContext(ProgressionContext);

  return (
    <Container alignItems="center" paddingTop={50}>
      <Title title="TTMIK" />
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
        {(login, { loading }) => {
          if (loading) {
            return <Loading />;
          }
          return (
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
                  await AsyncStorage.setItem(
                    "@TTMIK:progression",
                    JSON.stringify(user.data.login.progression)
                  );

                  setUser(user.data.login);
                  setProgression(user.data.login.progression);

                  navigation.navigate("Profile");
                  return user;
                } catch (err) {
                  console.log("ERROR ======> wrong pawword or email");
                }
              }}
            />
          );
        }}
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
