import { Ionicons } from "@expo/vector-icons";
import { Stack, useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";

export default function BikeExploreLayout() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Explore",
      tabBarIcon: ({ color }: { color: string }) => (
        <Ionicons name="search-outline" size={24} color={color} />
      ),
    });
  }, [navigation]);
  
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}