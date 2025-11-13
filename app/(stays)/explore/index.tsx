import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const COLORS = {
  backgroundLight: "#F5F5DC",
  primary: "#E2725B",
};

export default function HomestayIndexScreen() {
  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      const checkOnboarding = async () => {
        try {
          const hasSeen = await AsyncStorage.getItem("hasSeenHomestayOnboarding");
          
          if (hasSeen === "true") {
            // User has seen it, go to main browse page
            router.replace("/(stays)/explore/browse"); // <-- UPDATED PATH
          } else {
            // User has NOT seen it, go to onboarding
            router.replace("/(stays)/explore/onboarding"); // <-- UPDATED PATH
          }
        } catch (e) {
          console.error("Failed to read AsyncStorage", e);
          router.replace("/(stays)/explore/onboarding"); // <-- UPDATED PATH
        }
      };

      checkOnboarding();
    }, [router])
  );

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.backgroundLight,
  },
});