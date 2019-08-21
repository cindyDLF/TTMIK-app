import { AsyncStorage } from "react-native";

export const retrieveUser = async () => {
  try {
    const userStorage = await AsyncStorage.getItem("@TTMIK:user");
    if (userStorage !== null) {
      return JSON.parse(userStorage);
    } else {
      console.log("ERROR =====> application is in trouble");
    }
  } catch (err) {
    console.log(err);
  }
};
