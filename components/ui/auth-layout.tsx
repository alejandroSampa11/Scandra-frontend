import { ThemedView } from "@/components/themed-view";
import { Image } from "expo-image";
import React, { ReactNode } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
} from "react-native";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ThemedView style={styles.content}>
        <ThemedView style={styles.header}>
          <Image
            source={require("@/assets/images/ScandraLogo1.png")}
            contentFit="contain"
            style={styles.logo}
          />
        </ThemedView>

        <ThemedView style={styles.form}>{children}</ThemedView>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  form: {
    width: "100%",
  },
  logo: {
    width: 300,
    height: 100,
  },
});
