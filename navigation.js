import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";

//import screens
import Auth from "./screens/Auth";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Welcome from "./screens/Welcome";
import Profile from "./screens/Profile";
import UpdateUserInfo from "./screens/UpdateUserInfo";
import Progression from "./screens/Progression";
import Thematics from "./screens/Thematics";
import ExercicesList from "./screens/ExercicesList";
import Lesson from "./screens/Lesson";
import ExerciceEnd from "./screens/ExerciceEnd";

//import Exercice
import Qcm from "./screens/Exercices/Qcm";
import Swipe from "./screens/Exercices/Swipe";

const LoginNavigator = createSwitchNavigator(
  {
    Auth: { screen: Auth },
    Login: { screen: Login },
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
    qcm: { screen: Qcm },
    swipe: { screen: Swipe },
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
