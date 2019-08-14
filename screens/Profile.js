import React from "react";
import moment from "moment";
import { Text, Image, Dimensions, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

//import components
import Button from "../components/Button";
import Container from "../components/Container";
import Header from "../components/Header";

import { COLORS, FONT } from "../constants/Global";

const width = Dimensions.get("window").width;

let user = {
  username: "Eurika",
  email: "eurika@gmail.com",
  gender: "female",
  level: 1,
  point: 0,
  date_register: moment().format("MMMM Do YYYY, h:mm:ss a")
};

const Profile = ({ navigation }) => {
  const img =
    user.gender === "female"
      ? require("../assets/woman.png")
      : require("../assets/man.png");
  return (
    <View>
      <Header headerName={user.username} lvl={user.level} pt={user.point} />
      <Container alignItems="center" paddingTop={40}>
        <Image
          style={{ width: width - 190, height: width - 190, margin: 10 }}
          source={img}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: width - 70,
            justifyContent: "center",
            marginTop: 20
          }}
        >
          <Text style={{ fontSize: 18, fontFamily: FONT.primaryFont }}>
            {user.email}
          </Text>
          <TouchableOpacity
            style={{ position: "absolute", right: 0 }}
            onPress={() => navigation.navigate("UpdateUserInfo")}
          >
            <Icon
              name="gear"
              style={{ fontSize: 40, color: COLORS.primaryColor }}
            />
          </TouchableOpacity>
        </View>
        <Text>Start training {user.date_register}</Text>
      </Container>
    </View>
  );
};

export default Profile;
