import React from "react";
import { View, Text, SafeAreaView, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import CustomButton from "components/CustomButton";
import FormField from "components/FormField";

const SignIn = () => {
  return (
    <SafeAreaView className="flex-1 bg-darkBlue h-full">
      <StatusBar style="light" />
      <ImageBackground
        source={require("../../assets/images/woman-eating-breakfast-in-the-hotel-room-room-ser-2023-11-27-05-24-27-utc 1.png")}
        className="flex-1 h-screen"
        resizeMode="cover"
      >
        <View className="flex-1 items-center w-full">
          <View className="flex-row align-items-center mt-1">
            <View className="flex-1 h-0.5 w-full bg-secondary mt-10 ml-12" />
            <Text className="text-secondary text-4xl mt-6">HOTEL</Text>
            <View className="flex-1 h-0.5 w-full bg-secondary mt-10 mr-12" />
          </View>
          <Text className="text-white text-2xl mb-6">
            ST. PANTELEIMON BEACH
          </Text>

          {/* ENTER EMAIL FORM */}
          <View className="mt-32 px-4 w-full">
            <FormField
              titleStyles="text-secondary"
              placeholder="Въведи имейл или телефонен номер"
              title="Имейл или телефонен номер"
            />
          </View>

          {/* ENTER PASSWORD FORM */}
          <View className="mt-7 px-4 w-full">
            <FormField
              placeholder="Въведи парола"
              title="Парола"
              titleStyles="text-secondary"
            />
          </View>

          {/* FORGOT PASSWORD IMPLEMENT LATER! */}
          <View className="mt-4 px-4 w-full">
            <Text className="text-darkBlue underline">Забравена парола</Text>
          </View>

          {/* SING IN BUTTON */}
          <View className="mt-10 w-full px-4">
            <CustomButton
              title="Вход"
              containerStyles="bg-primary w-full h-12"
              textStyles="text-secondary"
              handlePress={() => {}}
            />
          </View>
          <View className="flex-row align-items-center mt-1">
            <View className="flex-1 h-0.5 w-full bg-secondary mt-9 ml-12" />
            <Text className="text-secondary text-base mt-6 px-6">Вход с:</Text>
            <View className="flex-1 h-0.5 w-full bg-secondary mt-9 mr-12" />
          </View>

          {/* IMPLEMENT GOOGLE AND FACEBOOK LOGIN */}
          <View className="flex-1 mt-8 flex-row">
            <View className="mr-3">
              <FontAwesome5 name="facebook" size={42} color="white" />
            </View>
            <View className="ml-3">
              <FontAwesome name="google" size={42} color="white" />
            </View>
          </View>

          <View className="flex-1 justify-end mb-10">
            <View>
              <Text className="text-center text-secondary">
                Нямаш регистрация?
                <Link href="/sign-up">
                  <Text className="text-accent"> Регистрирай се СЕГА!</Text>
                </Link>
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignIn;
