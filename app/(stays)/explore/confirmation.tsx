import { MaterialIcons } from "@expo/vector-icons"; // <-- Corrected import
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import React from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

// --- New Theme ---
const COLORS = {
  primary: "#df8020",
  backgroundLight: "#f8f7f6",
  componentBg: "#FFFFFF",
  textPrimary: "#171411",
  textSubtle: "#877564",
  white: "#FFFFFF",
  borderColor: "#EAEAEA",
  successBg: "rgba(223, 128, 32, 0.15)", // Light orange
};

export default function HomestayBookingConfirmationScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Animated Checkmark */}
        <MotiView
          from={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            damping: 15,
            stiffness: 100,
            delay: 300,
          }}
          style={styles.iconContainer}
        >
          {/* --- THIS IS THE FIX --- */}
          <MaterialIcons name="check-circle" size={80} color={COLORS.primary} />
        </MotiView>

        {/* Header Text */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500, delay: 500 }}
        >
          <Text style={styles.title}>Booking Confirmed!</Text>
          <Text style={styles.subtitle}>
            Your stay at The Himalayan Escape is all set. We've
            sent a confirmation and receipt to your email.
          </Text>
        </MotiView>

        {/* Booking Details Card */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500, delay: 700 }}
          style={styles.card}
        >
          <Text style={styles.cardTitle}>Booking Summary</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Homestay</Text>
            <Text style={styles.detailValue}>The Himalayan Escape</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Location</Text>
            <Text style={styles.detailValue}>Mukteshwar, Kumaon</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Check-in</Text>
            <Text style={styles.detailValue}>Fri, Nov 15, 2025</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Check-out</Text>
            <Text style={styles.detailValue}>Mon, Nov 18, 2025</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Guests</Text>
            <Text style={styles.detailValue}>2 Guests</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.totalLabel}>Total Paid</Text>
            <Text style={styles.totalValue}>₹14,750</Text>
          </View>
        </MotiView>

        {/* Action Buttons */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500, delay: 900 }}
          style={styles.buttonContainer}
        >
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.9}
            onPress={() => router.replace("/(stays)/explore/index")}
          >
            <Text style={styles.primaryButtonText}>Book Another Stay</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.8}
            onPress={() => router.replace("/(stays)/bookings")}
          >
            <Text style={styles.secondaryButtonText}>View My Booknings</Text>
          </TouchableOpacity>
        </MotiView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.backgroundLight },
  scrollContent: {
    paddingHorizontal: 24,
    alignItems: "center",
    paddingTop: height * 0.1,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.successBg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontFamily: "Poppins-SemiBold",
    color: COLORS.textPrimary,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "Poppins-Regular",
    color: COLORS.textSubtle,
    textAlign: "center",
    marginTop: 12,
    lineHeight: 23,
  },
  card: {
    backgroundColor: COLORS.componentBg,
    borderRadius: 20,
    padding: 24,
    width: "100%",
    marginTop: 32,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
  },
  cardTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: 16,
    textAlign: "center",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  detailLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: COLORS.textSubtle,
  },
  detailValue: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: COLORS.textPrimary,
    textAlign: "right",
    flex: 1,
    marginLeft: 16,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.borderColor,
    marginVertical: 10,
  },
  totalLabel: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  totalValue: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 32,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
  secondaryButton: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 12,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
});