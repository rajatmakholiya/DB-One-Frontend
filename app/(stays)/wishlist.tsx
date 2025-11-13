import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const COLORS = { primary: "#df8020", text: "#171411" };
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f8f7f6" },
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontFamily: "Poppins-SemiBold", color: COLORS.text, marginTop: 16 },
});

export default function WishlistScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <MaterialIcons name="favorite" size={60} color={COLORS.primary} />
        <Text style={styles.title}>My Wishlist</Text>
      </View>
    </SafeAreaView>
  );
}