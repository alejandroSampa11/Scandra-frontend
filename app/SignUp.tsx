/* eslint-disable import/no-unresolved */
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { authService } from "@/services/auth.service";
import { SignUpData } from "@/types/auth.types";
import { showToast } from "@/utils/toast";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function SignUp() {
  const [formData, setFormData] = useState<SignUpData>({
    fullName: "",
    email: "",
    passwordHash: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const colorScheme = useColorScheme();
  const router = useRouter();

  const isDark = colorScheme === "dark";

  const handleChange = (field: keyof SignUpData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignUp = async (): Promise<void> => {
    if (!formData.fullName || !formData.email || !formData.passwordHash) {
      showToast.error("Make sure to fill in every field");
      return;
    }

    if (formData.passwordHash !== confirmPassword) {
      showToast.error("Passwords do not match. Please try again");
      return;
    }

    try {
      setIsLoading(true);
      await authService.signUp(formData);
      showToast.success("User created succesfully");
      router.push("/login");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      showToast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ThemedView style={styles.content}>
        {/* Logo/Título */}
        <ThemedView style={styles.header}>
          <Image
            source={require("@/assets/images/ScandraLogo1.png")}
            contentFit="contain"
            style={styles.logo}
          />
        </ThemedView>

        {/* Formulario */}
        <ThemedView style={styles.form}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDark ? "#1a1a1a" : "#f5f5f5",
                color: isDark ? "#fff" : "#000",
                borderColor: isDark ? "#333" : "#ddd",
              },
            ]}
            placeholder="Name"
            placeholderTextColor={isDark ? "#888" : "#999"}
            value={formData.fullName}
            onChangeText={(value) => handleChange("fullName", value)}
            keyboardType="default"
            autoCapitalize="none"
            editable={!isLoading}
          />

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDark ? "#1a1a1a" : "#f5f5f5",
                color: isDark ? "#fff" : "#000",
                borderColor: isDark ? "#333" : "#ddd",
              },
            ]}
            placeholder="Email"
            placeholderTextColor={isDark ? "#888" : "#999"}
            value={formData.email}
            onChangeText={(value) => handleChange("email", value)}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!isLoading}
          />

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDark ? "#1a1a1a" : "#f5f5f5",
                color: isDark ? "#fff" : "#000",
                borderColor: isDark ? "#333" : "#ddd",
              },
            ]}
            placeholder="Password"
            placeholderTextColor={isDark ? "#888" : "#999"}
            value={formData.passwordHash}
            onChangeText={(value) => handleChange("passwordHash", value)}
            secureTextEntry
            autoCapitalize="none"
            editable={!isLoading}
          />

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDark ? "#1a1a1a" : "#f5f5f5",
                color: isDark ? "#fff" : "#000",
                borderColor: isDark ? "#333" : "#ddd",
              },
            ]}
            placeholder="Confirm Password"
            placeholderTextColor={isDark ? "#888" : "#999"}
            value={confirmPassword}
            onChangeText={(value) => setConfirmPassword(value)}
            secureTextEntry
            autoCapitalize="none"
            editable={!isLoading}
          />

          <TouchableOpacity
            style={[isLoading && styles.buttonDisabled]}
            disabled={isLoading}
            onPress={handleSignUp}
          >
            <LinearGradient
              colors={["#273b7f", "#6dd0c6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ThemedText style={styles.buttonText}>Sign Up</ThemedText>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <ThemedView style={styles.signupContainer}>
            <ThemedText>Already have an account? </ThemedText>
            <TouchableOpacity>
              <ThemedText style={styles.signupLink}>Sign In</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
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
  title: {
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  form: {
    width: "100%",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  linkContainer: {
    alignItems: "center",
    marginTop: 15,
  },
  link: {
    color: "#007AFF",
    fontSize: 14,
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
  logo: {
    width: 300,
    height: 100,
  },
});
