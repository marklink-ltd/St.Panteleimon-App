import { Stack } from "expo-router";
import { I18nextProvider } from "react-i18next";
import i18n from "../../Frontend/i18n.js";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <I18nextProvider i18n={i18n}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </I18nextProvider>
    </AuthProvider>
  );
}
