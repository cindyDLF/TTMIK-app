import React, { useContext, useEffect } from "react";
import { AsyncStorage, View } from "react-native";
import Loading from "../components/Loading";

//import hook
import UserContext from "../hooks/userContext";
import ProgressionContext from "../hooks/progressionContext";
import * as Font from "expo-font";

const Auth = ({ navigation }) => {
  const { setUser } = useContext(UserContext);
  const { setProgression } = useContext(ProgressionContext);

  useEffect(() => {
    checkConntetionUser();
  }, []);

  checkConntetionUser = async () => {
    try {
      await Font.loadAsync({
        "Roboto-Black": require("../assets/fonts/Roboto-Black.ttf")
      });
      const userStorage = await AsyncStorage.getItem("@TTMIK:user");
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
