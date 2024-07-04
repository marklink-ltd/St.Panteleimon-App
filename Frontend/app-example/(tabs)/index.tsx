import { Link, router } from "expo-router";
import { Text, View, SafeAreaView, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import CustomButton from "../components/CustomButton";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-darkBlue">
      <StatusBar style="light" backgroundColor="#261C38" />
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
      </View>
    </SafeAreaView>
  );
}
