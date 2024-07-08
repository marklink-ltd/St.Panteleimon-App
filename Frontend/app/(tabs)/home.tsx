import { View, Text, Alert } from "react-native";
import React from "react";
import CustomButton from "components/CustomButton";
import useLogout from "../../hooks/useLogout";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "context/AuthContext";
import LogoutButton from "../../components/LogoutButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Home = () => {
  return (
    <SafeAreaView className="bg-accent h-full">
      <StatusBar style="auto" />
      <View className="bg-secondary h-screen justify-center items-center">
        <Text>Hello</Text>
        <LogoutButton />
      </View>
    </SafeAreaView>
  );
};

export default Home;
