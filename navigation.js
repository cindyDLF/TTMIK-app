import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";

//import screens
import Login from "./screens/Login";
import Register from "./screens/Register";
import Welcome from "./screens/Welcome";
import Profile from "./screens/Profile";
import UpdateUserInfo from "./screens/UpdateUserInfo";
import Progression from "./screens/Progression";
import Thematics from "./screens/Thematics";
import ExercicesList from "./screens/ExercicesList";
import Lesson from "./screens/Lesson";
import Exercice from "./screens/Exercice";
import ExerciceEnd from "./screens/ExerciceEnd";

const LoginNavigator = createSwitchNavigator(
  {
    Login: {
      screen: Login
    },
    Register: { screen: Register }
  },
  {
    headerMode: "none"
  }
);

const WelcomeNavigator = createStackNavigator(
  {
    Welcome: { screen: Welcome }
  },
  {
    headerMode: "none"
  }
);

const ProfileNavigator = createStackNavigator(
  {
    Profile: { screen: Profile },
    UpdateUserInfo: { screen: UpdateUserInfo }
  },
  {
    headerMode: "none"
  }
);

const TrainingNavigator = createStackNavigator(
  {
    Thematics: { screen: Thematics },
    ExercicesList: { screen: ExercicesList },
    Lesson: { screen: Lesson },
    Exercice: { screen: Exercice },
    ExerciceEnd: { screen: ExerciceEnd }
  },
  {
    headerMode: "none"
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Training: TrainingNavigator,
    Progression: Progression,
    Profile: ProfileNavigator
  },
  {
    initialRouteName: "Profile"
  }
);

const Navigation = createAppContainer(
  createSwitchNavigator({
    LoginNavigator,
    WelcomeNavigator,
    TabNavigator
  })
);

export default Navigation;
