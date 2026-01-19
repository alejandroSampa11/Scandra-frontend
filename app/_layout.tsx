/* eslint-disable import/no-unresolved */
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: "#6dd0c6",
          borderLeftWidth: 7,
          backgroundColor: colorScheme === "dark" ? "#1a1a1a" : "#fff",
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 16,
          fontWeight: "600",
          color: colorScheme === "dark" ? "#fff" : "#000",
        }}
        text2Style={{
          fontSize: 14,
          color: colorScheme === "dark" ? "#ccc" : "#666",
        }}
      />
    ),
    error: (props: any) => (
      <ErrorToast
        {...props}
        style={{
          borderLeftColor: "#ff4757",
          borderLeftWidth: 7,
          backgroundColor: colorScheme === "dark" ? "#1a1a1a" : "#fff",
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 16,
          fontWeight: "600",
          color: colorScheme === "dark" ? "#fff" : "#000",
        }}
        text2Style={{
          fontSize: 14,
          color: colorScheme === "dark" ? "#ccc" : "#666",
        }}
      />
    ),
    info: (props: any) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: "#273b7f",
          borderLeftWidth: 7,
          backgroundColor: colorScheme === "dark" ? "#1a1a1a" : "#fff",
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 16,
          fontWeight: "600",
          color: colorScheme === "dark" ? "#fff" : "#000",
        }}
        text2Style={{
          fontSize: 14,
          color: colorScheme === "dark" ? "#ccc" : "#666",
        }}
      />
    ),
  };

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style="auto" />
      <Toast config={toastConfig} />
    </ThemeProvider>
  );
}
