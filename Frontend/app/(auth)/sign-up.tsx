import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import FormField from "components/FormField";
import CustomButton from "components/CustomButton";
import { Link, Redirect, useRouter } from "expo-router";
import useRegistration from "../../hooks/useRegistration";
import KeyboardAvoidingContainer from "../../components/KeyboardAvoidingContainer";
import { useAuth } from "context/AuthContext";

const SignUp = () => {
  const { loading, error, success, registerUser } = useRegistration();
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const { login, authUser } = useAuth();
  if (!loading && authUser) return <Redirect href="/home" />;

  const router = useRouter();

  const submit = async () => {
    const { fullName, email, phoneNumber, password, confirmPassword } =
      userData;

    try {
      const response = await registerUser(
        fullName,
        email,
        phoneNumber,
        password,
        confirmPassword
      );

      if (response) {
        // Assuming successful registration
        console.log("User registered successfully:", response);
        Alert.alert(
          "Registration Successful",
          "You have successfully registered!"
        );
        login(response._id);
        router.push("/home");
      }
    } catch (error) {
      // Handle registration error
      console.error("Registration failed:", error);
      Alert.alert(
        "Registration Failed",
        "Failed to register. Please try again."
      );
    }
  };

  return (
    <View className="flex-1 bg-secondary">
      <StatusBar style="auto" />
      <View className="h-32 bg-accent w-full p-4 items-center justify-center flex pt-14">
        <Text className="text-2xl text-secondary font-bold text-center">
          Създай акаунт
        </Text>
        <Text className="text-xs text-secondary font-bold text-center">
          и създавай и управлявай лесно и удобно своите резервации в хотел St
          Panteleimon
        </Text>
      </View>
      <KeyboardAvoidingContainer style={{ backgroundColor: "#FFFFFF" }}>
        <View className="flex-1 bg-secondary w-full px-5 pt-4 pb-10">
          <View>
            <FormField
              titleStyles="text-gray-500"
              title="Име и Фамилия"
              placeholder="Въведи Име и Фамилия"
              value={userData.fullName}
              handleChangeText={(e) =>
                setUserData({ ...userData, fullName: e })
              }
            />
          </View>
          <View className="mt-6">
            <FormField
              titleStyles="text-gray-500"
              value={userData.email}
              handleChangeText={(e) => setUserData({ ...userData, email: e })}
              title="Имейл"
              placeholder="Въведи Имейл"
              keyboardType="email-address"
              autoCorrect={false}
              textContentType="none"
            />
          </View>
          <View className="mt-6">
            <FormField
              value={userData.phoneNumber}
              handleChangeText={(e) =>
                setUserData({ ...userData, phoneNumber: e })
              }
              title="Телефон"
              placeholder="Въведи Телефонен номер"
              titleStyles="text-gray-500"
              keyboardType="phone-pad"
              autoCorrect={false}
              textContentType="none"
            />
          </View>
          <View className="mt-6">
            <FormField
              value={userData.password}
              handleChangeText={(e) =>
                setUserData({ ...userData, password: e })
              }
              title="Парола"
              placeholder="Въведи Парола"
              titleStyles="text-gray-500"
            />
          </View>
          <View className="mt-6">
            <FormField
              value={userData.confirmPassword}
              handleChangeText={(e) =>
                setUserData({ ...userData, confirmPassword: e })
              }
              title="Потвърди Паролата"
              placeholder="Потвърди Парола"
              titleStyles="text-gray-500"
            />
          </View>
          <CustomButton
            title="Регистрирай се"
            containerStyles="bg-primary h-14 mt-6"
            textStyles="text-secondary"
            handlePress={() => submit()}
            disabled={loading}
          />
          {error && (
            <View className="mt-4 px-4 w-full text-center items-center">
              <Text className="text-red-500">{error}</Text>
            </View>
          )}
          <View className="flex items-center mt-4">
            <Text className="text-center w-56">
              с натискане на бутона “резервирай” се съгласяваш с нашата политика
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
      </KeyboardAvoidingContainer>
    </View>
  );
};

export default SignUp;
