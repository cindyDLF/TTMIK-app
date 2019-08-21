import React, { useContext } from "react";
import { Text, Image, Dimensions, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";

//import components
import Loading from "../components/Loading";
import Container from "../components/Container";
import Header from "../components/Header";
import ProgressBar from "../components/ProgressBar";
import Title from "../components/Title";

import { avatar } from "../assets/avatar";

import { COLORS, FONT } from "../constants/Global";

//import hooks
import UserContext from "../hooks/userContext";

const width = Dimensions.get("window").width;

const Profile = ({ navigation }) => {
  //const [user, setUser] = useState(null);
  const { user } = useContext(UserContext);

  if (user !== null) {
    return (
      <View>
        <Header headerName={user.username} lvl={user.level} pt={user.point} />
        <Container alignItems="center" paddingTop={40}>
          <Image
            style={{ width: width - 190, height: width - 190, margin: 10 }}
            source={avatar[user.avatar]}
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
              onPress={() =>
                navigation.navigate("UpdateUserInfo", {
                  user
                })
              }
            >
              <Icon
                name="gear"
                style={{ fontSize: 40, color: COLORS.primaryColor }}
              />
            </TouchableOpacity>
          </View>
          <Text>
            Start training {moment(user.date_register).format("MM/DD/YYYY")}
          </Text>
          <ProgressBar progress={0.46789} />
        </Container>
      </View>
    );
  } else {
    return <Loading />;
  }
};

export default Profile;
