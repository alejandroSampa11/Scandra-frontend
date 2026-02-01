import { ThemedText } from "@/components/themed-text";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps,
} from "react-native";

interface GradientButtonProps extends TouchableOpacityProps {
  title: string;
  isLoading?: boolean;
  onPress: () => void;
}

export function GradientButton({
  title,
  isLoading = false,
  onPress,
  disabled,
  style,
  ...props
}: GradientButtonProps) {
  return (
    <TouchableOpacity
      style={[isLoading && styles.buttonDisabled, style]}
      onPress={onPress}
      disabled={isLoading || disabled}
      {...props}
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
          <ThemedText style={styles.buttonText}>{title}</ThemedText>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
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
});
