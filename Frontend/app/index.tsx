import { Link, Redirect, router } from "expo-router";
import { Text, View, SafeAreaView, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import CustomButton from "../components/CustomButton";
import { AuthProvider, useAuth } from "context/AuthContext";
import { useEffect } from "react";

export default function Index() {
  const { authUser, loading } = useAuth();
  if (!loading && authUser) return <Redirect href="/home" />;
  return (
    <SafeAreaView className="flex-1 bg-darkBlue">
      <StatusBar style="light" />
      <View className="flex-1 justify-center items-center px-4">
        <Image
          className="w-48 h-48 mb-10 mr-2"
          source={require("../assets/images/st panteleimon-02 1.png")}
          resizeMode="contain"
        />
        <Text className="text-3xl text-accent mb-6">Welcome to</Text>
        <Text className="text-xl text-white mb-2">Hotel</Text>
        <Text className="text-xl text-white mb-10">St. Panteleimon</Text>
        <CustomButton
          title="Continue"
          handlePress={() => router.push("/sign-in")}
          containerStyles="w-full bg-secondary"
          textStyles="text-primary"
        />
        {/* <Text className="text-white">{t("welcome")}</Text>
          <Button title="English" onPress={() => handleLanguageChange("en")} />
          <Button
            title="Bulgarian"
            onPress={() => handleLanguageChange("bg")}
          /> */}
      </View>
    </SafeAreaView>
  );
}
