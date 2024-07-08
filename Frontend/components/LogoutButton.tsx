import { View, Text } from "react-native";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "expo-router";
import useLogout from "../hooks/useLogout";
import CustomButton from "./CustomButton";

const LogoutButton = () => {
  const { error, success, loading, logoutUser } = useLogout();
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    await logout();
    router.replace("/");
  };
  return (
    <View>
      <CustomButton
        title="Logout"
        handlePress={handleLogout}
        isLoading={loading}
        containerStyles="bg-accent w-32"
        textStyles="text-secondary"
      />
    </View>
  );
};

export default LogoutButton;
