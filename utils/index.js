import { AsyncStorage } from "react-native";

const baseRankLevel = 150;

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

export const shuffle = arra1 => {
  let ctr = arra1.length;
  let temp;
  let index;

  // While there are elements in the array
  while (ctr > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * ctr);
    // Decrease ctr by 1
    ctr--;
    // And swap the last element with it
    temp = arra1[ctr];
    arra1[ctr] = arra1[index];
    arra1[index] = temp;
  }
  return arra1;
};

export const calcPtLevel = level => level * baseRankLevel;
export const calcRank = (pt, ptLevel) => pt / ptLevel;
export const calcDiff = (pt, ptLevel) => pt - ptLevel;
