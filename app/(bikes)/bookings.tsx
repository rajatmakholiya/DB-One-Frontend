import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BikeBookingsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Ionicons name="calendar-outline" size={60} color="#FF6B6B" />
        <Text style={styles.title}>My Bike Rentals</Text>
        <Text style={styles.subtitle}>
          Your upcoming and past bike bookings will appear here.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: "Poppins-SemiBold",
    color: "#557B83",
    marginTop: 16,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "Poppins-Regular",
    color: "#557B83",
    textAlign: "center",
    marginTop: 8,
  },
});