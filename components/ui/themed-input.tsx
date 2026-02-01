import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

interface ThemedInputProps extends TextInputProps {
  placeholder: string;
}

export function ThemedInput({ placeholder, style, ...props }: ThemedInputProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <TextInput
      style={[
        styles.input,
        {
          backgroundColor: isDark ? "#1a1a1a" : "#f5f5f5",
          color: isDark ? "#fff" : "#000",
          borderColor: isDark ? "#333" : "#ddd",
        },
        style,
      ]}
      placeholder={placeholder}
      placeholderTextColor={isDark ? "#888" : "#999"}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
});
