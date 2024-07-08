import { View, Text } from "react-native";
import React from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

const KeyboardAvoidingContainer = ({ children }) => {
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default KeyboardAvoidingContainer;
