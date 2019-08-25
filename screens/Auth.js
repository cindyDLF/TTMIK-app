import React, { useContext, useEffect } from "react";
import { AsyncStorage, View } from "react-native";
import Loading from "../components/Loading";

//import hook
import UserContext from "../hooks/userContext";
import ProgressionContext from "../hooks/progressionContext";
import * as Font from "expo-font";

const Auth = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const { progression, setProgression } = useContext(ProgressionContext);

  useEffect(() => {
    Font.loadAsync({
      "Roboto-Black": require("../assets/fonts/Roboto-Black.ttf")
    });
    checkConntetionUser();
  }, []);

  checkConntetionUser = async () => {
    try {
      const userStorage = await AsyncStorage.getItem("@TTMIK:user");
      console.log(JSON.parse(userStorage));
      const progressionStorage = await AsyncStorage.getItem(
        "@TTMIK:progression"
      );
      if (userStorage != null && progressionStorage !== null) {
        setUser(JSON.parse(userStorage));
        setProgression(JSON.parse(progressionStorage));
        navigation.navigate("Profile");
      } else {
        navigation.navigate("Login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Loading />
    </View>
  );
};

export default Auth;
