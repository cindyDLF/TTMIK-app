import React from "react";
import { Text, View } from "react-native";
import { Query } from "react-apollo";
import { GET_ALL_EXERCICES } from "../actions/queries";

//import Components
import Container from "../components/Container";
import Button from "../components/Button";

const ExercicesList = ({ navigation }) => (
  <Container>
    <Query query={GET_ALL_EXERCICES} fetchPolicy="cache-and-network">
      {({ loading, data }) => {
        if (loading) {
          return (
            <View>
              <Text>... loading ...</Text>
            </View>
          );
        }
        console.log(data);

        return (
          <View>
            <Text>ExercicesList</Text>
            <Button
              text="go to lesson"
              action={() => navigation.navigate("Lesson")}
            />
          </View>
        );
      }}
    </Query>
  </Container>
);

export default ExercicesList;
