import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const colorScheme = useColorScheme();
  const router = useRouter();

  const isDark = colorScheme === "dark";

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    setIsLoading(true);

    // Simulación de login - reemplaza esto con tu lógica de autenticación
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("Éxito", "Login exitoso", [
        { text: "OK", onPress: () => router.push("/(tabs)") },
      ]);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ThemedView style={styles.content}>
        <ThemedView style={styles.header}>
          <Image
            source={require("@/assets/images/ScandraLogo1.png")}
            style={styles.logo}
            contentFit="contain"
          />
        </ThemedView>

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
            placeholder="Email"
            placeholderTextColor={isDark ? "#888" : "#999"}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
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
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoComplete="password"
            editable={!isLoading}
          />

          <TouchableOpacity
            style={[isLoading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
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
                <ThemedText style={styles.buttonText}>Sign In</ThemedText>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Links adicionales */}
          <TouchableOpacity style={styles.linkContainer}>
            <Text style={{ color: isDark ? "#fff" : "#213883", fontSize: 16 }}>
              Forgot Password?{" "}
            </Text>
          </TouchableOpacity>

          <ThemedView style={styles.signupContainer}>
            <Text style={{ color: isDark ? "#fff" : "#213883", fontSize: 16 }}>
              Don&apos;t have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/SignUp")}>
              <Text
                style={[
                  styles.signupLink,
                  { color: isDark ? "#6dd0c6" : "#69b1aa", fontSize: 16 },
                ]}
              >
                Sign Up
              </Text>
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
    backgroundColor: "#6dd0c6",
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
