import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TrekLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={({ route }) => {
        const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
          dashboard: "home-outline",
          explore: "compass-outline",
          community: "people-outline",
          profile: "person-outline",
        };

        return {
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: "#184E77",
          tabBarInactiveTintColor: "#888",
          tabBarStyle: {
            position: "absolute",
            left: 20,
            right: 20,
            bottom: insets.bottom > 0 ? insets.bottom : 20,
            elevation: 4,
            backgroundColor: "rgba(255,255,255,0.9)",
            borderRadius: 20,
            height: Platform.OS === "ios" ? 85 : 65,
            paddingBottom: Platform.OS === "ios" ? 25 : 10,
            paddingTop: 5,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 2 },
          },
          tabBarIcon: ({ color, focused }) => {
            const baseIcon = icons[route.name] || "ellipse-outline";
            const iconName = focused
              ? (baseIcon.replace(
                  "-outline",
                  ""
                ) as keyof typeof Ionicons.glyphMap)
              : baseIcon;
            return <Ionicons name={iconName} size={24} color={color} />;
          },
        };
      }}
    >
      <Tabs.Screen name="dashboard" options={{ title: "Dashboard" }} />
      <Tabs.Screen name="explore" options={{ title: "Explore" }} />
      <Tabs.Screen name="community" options={{ title: "Community" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
