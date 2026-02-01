/* eslint-disable import/no-unresolved */
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { AuthLayout } from "@/components/ui/auth-layout";
import { GradientButton } from "@/components/ui/gradient-button";
import { ThemedInput } from "@/components/ui/themed-input";
import { authService } from "@/services/auth.service";
import { SignInData } from "@/types/auth.types";
import { showToast } from "@/utils/toast";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function LoginScreen() {
  const [formSignIn, setFormSignIn] = useState<SignInData>({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (field: keyof SignInData, value: string) => {
    setFormSignIn((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = async () => {
    if (!formSignIn.email || !formSignIn.password) {
      showToast.error("Make sure to fill in every field");
      return;
    }

    try {
      setIsLoading(true);
      await authService.signIn(formSignIn);
      showToast.success("Login successful");
      router.push("/(tabs)");
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      showToast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <ThemedInput
        placeholder="Email"
        value={formSignIn.email}
        onChangeText={(value) => handleChange("email", value)}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        editable={!isLoading}
      />

      <ThemedInput
        placeholder="Password"
        value={formSignIn.password}
        onChangeText={(value) => handleChange("password", value)}
        secureTextEntry
        autoCapitalize="none"
        autoComplete="password"
        editable={!isLoading}
      />

      <GradientButton
        title="Sign In"
        onPress={handleLogin}
        isLoading={isLoading}
      />

      <TouchableOpacity style={styles.linkContainer}>
        <ThemedText>Forgot Password?</ThemedText>
      </TouchableOpacity>

      <ThemedView style={styles.signupContainer}>
        <ThemedText>Don&apos;t have an account? </ThemedText>
        <TouchableOpacity onPress={() => router.push("/SignUp")}>
          <ThemedText style={styles.signupLink}>Sign Up</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  linkContainer: {
    alignItems: "center",
    marginTop: 15,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signupLink: {
    color: "#007AFF",
    fontWeight: "600",
  },
});
