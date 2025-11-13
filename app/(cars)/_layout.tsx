import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

const ACCENT_COLOR = "#007C91"; // New Cyan Dark Blue Accent
const INACTIVE_COLOR = "#888";

export default function CarsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: ACCENT_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#EEE",
        },
        tabBarLabelStyle: {
          fontFamily: "Poppins-Medium",
        },
      }}
    >
      {/* This "explore" screen is created by the directory
        app/(cars)/explore/
      */}
      <Tabs.Screen
        name="bookings" // The "My Bookings" screen
        options={{
          title: "Bookings",
          tabBarIcon: ({ color }) => (
            <Ionicons name="calendar-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile" // The "Profile" screen
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-circle-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}