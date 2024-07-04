import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import FormField from "components/FormField";
import CustomButton from "components/CustomButton";
import { Link } from "expo-router";

const SignUp = () => {
  return (
    <SafeAreaView className="bg-accent flex-1 absolute w-full">
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="flex-1 w-full justify-center">
          <View className="h-28 bg-accent w-full p-4 items-center justify-center">
            <Text className="text-2xl text-secondary font-bold text-center">
              Създай акаунт
            </Text>
            <Text className="text-xs text-secondary font-bold text-center">
              и създавай и управлявай лесно и удобно своите резервации в хотел
              St Panteleimon
            </Text>
          </View>
          <View className="flex-1 bg-secondary w-full h-screen px-5 pt-4 pb-10">
            <View>
              <FormField
                titleStyles="text-gray-500"
                title="Име и Фамилия"
                placeholder="Въведи Име и Фамилия"
              />
            </View>
            <View className="mt-6">
              <FormField
                titleStyles="text-gray-500"
                title="Имейл"
                placeholder="Въведи Имейл"
              />
            </View>
            <View className="mt-6">
              <FormField
                title="Телефон"
                placeholder="Въведи Телефонен номер"
                titleStyles="text-gray-500"
              />
            </View>
            <View className="mt-6">
              <FormField
                title="Парола"
                placeholder="Въведи Парола"
                titleStyles="text-gray-500"
              />
            </View>
            <View className="mt-6">
              <FormField
                title="Потвърди Паролата"
                placeholder="Потвърди Парола"
                titleStyles="text-gray-500"
              />
            </View>
            <CustomButton
              title="Регистрирай се"
              containerStyles="bg-primary h-14 mt-6"
              textStyles="text-secondary"
              handlePress={() => {}}
            />
            <View className="flex items-center mt-4">
              <Text className="text-center w-56">
                с натискане на бутона “резервирай” се съгласяваш с нашата
                политика
              </Text>
            </View>
            <View className="flex items-center mt-4">
              <Text className="text-center w-64">
                Имаш Акаунт?
                <Link href="/sign-in" className="text-accent">
                  {" "}
                  Влез в профила си
                </Link>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
