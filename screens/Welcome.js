import React, { useEffect, useState } from "react";
import { AsyncStorage } from "react-native";
//import Components
import Container from "../components/Container";
import Title from "../components/Title";

const Welcome = ({ navigation }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    retrieveUser();
    console.log(user);
  }, []);

  retrieveUser = async () => {
    try {
      const userStorage = await AsyncStorage.getItem("@TTMIK:user");
      if (userStorage !== null) {
        return setUser(JSON.parse(userStorage));
      } else {
        console.log("ERROR =====> application is in trouble");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (user !== null) {
    console.log(user);
    return (
      <Container>
        <Title title={user.username} />
      </Container>
    );
  } else {
    return <Title title="loading" />;
  }
};

export default Welcome;
