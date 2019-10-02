import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, AsyncStorage } from "react-native";
import Modal from "react-native-modal";
//graphql & call api
import { Mutation } from "react-apollo";
import { UPDATE_LEVEL } from "../actions/mutations";
//import hooks
import UserContext from "../hooks/userContext";
//import components
import Title from "./Title";

const ModalNextLevel = () => {
  const { user, setUser } = useContext(UserContext);
  const [canUpdate, setCanUpdate] = useState(true);

  updateStorage = data => {
    AsyncStorage.setItem("@TTMIK:user", JSON.stringify(data.updateLevel));
    setUser(data.updateLevel);
    setCanUpdate(false);
  };

  return (
    <Mutation
      mutation={UPDATE_LEVEL}
      onCompleted={data => canUpdate && updateStorage(data)}
    >
      {(updateLevel, { data, loading }) => {
        updateLevel({ variables: { id: user.id, level: user.level + 1 } });
        return (
          <View>
            <Modal style={styles.container} isVisible={true}>
              <Title>Level Up</Title>
              <Text>You're now level {user.level + 1}</Text>
            </Modal>
          </View>
        );
      }}
    </Mutation>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "50%",
    height: "50%",
    backgroundColor: "#fff"
  }
});
export default ModalNextLevel;
