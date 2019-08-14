import React, { useState } from "react";
import { TextInput, StyleSheet, Dimensions } from "react-native";

//import Constants
import { COLORS, SIZE } from "../constants/Global";

const width = Dimensions.get("window").width;

const Input = ({ placeholder, value, onChange }) => {
  const [borderColor, setBorderColor] = useState({
    borderColor: COLORS.primaryColor
  });
  return (
    <TextInput
      placeholder={placeholder}
      style={[styles.input, borderColor]}
      onFocus={() =>
        setBorderColor({
          borderColor: COLORS.secondaryColor
        })
      }
      onBlur={() =>
        setBorderColor({
          borderColor: COLORS.primaryColor
        })
      }
      secureTextEntry={
        placeholder === "password" || placeholder === "password confirm"
          ? true
          : false
      }
      value={value}
      onChangeText={text => onChange(text)}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    width: width - 70,
    height: SIZE.primaryHeight,
    borderRadius: SIZE.primaryBorder,
    padding: 10,
    fontSize: 18,
    marginBottom: 30
  }
});

export default Input;
