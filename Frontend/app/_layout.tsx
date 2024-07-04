import { Stack } from "expo-router";
import { I18nextProvider } from "react-i18next";
import i18n from "../../Frontend/i18n.js";

export default function RootLayout() {
  return (
    <I18nextProvider i18n={i18n}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </I18nextProvider>
  );
}
