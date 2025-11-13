import { Ionicons } from "@expo/vector-icons";
import { Stack, useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";

export default function CarExploreLayout() {
  const navigation = useNavigation();

  // This hook reaches up to the parent Tab navigator
  // and configures the "explore" tab's appearance.
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Explore",
      tabBarIcon: ({ color }: { color: string }) => (
        <Ionicons name="search-outline" size={24} color={color} />
      ),
    });
  }, [navigation]);

  // This Stack component manages the navigation flow INSIDE the tab
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}