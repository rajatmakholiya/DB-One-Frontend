import { Ionicons } from "@expo/vector-icons";
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

const COLORS = {
  primaryBg: "#FFFFFF",
  componentBg: "#F9F9F9",
  accent: "#FF6B6B",
  darkText: "#557B83",
  lightText: "#FFFFFF",
  cardBorder: "#EDEDED",
  successBg: "rgba(255, 107, 107, 0.15)",
};

export default function BikeBookingConfirmationScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
          <Ionicons name="checkmark-done-circle" size={80} color={COLORS.accent} />
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500, delay: 500 }}
        >
          <Text style={styles.title}>Rental Confirmed!</Text>
          <Text style={styles.subtitle}>
            Your Royal Enfield Classic 350 is all set. We've
            sent a confirmation and receipt to your email.
          </Text>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500, delay: 700 }}
          style={styles.card}
        >
          <Text style={styles.cardTitle}>Booking Summary</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Bike</Text>
            <Text style={styles.detailValue}>Royal Enfield Classic 350</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Pickup</Text>
            <Text style={styles.detailValue}>Tapovan, Rishikesh</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Start Date</Text>
            <Text style={styles.detailValue}>Fri, Nov 15, 2025</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>End Date</Text>
            <Text style={styles.detailValue}>Mon, Nov 18, 2025</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Duration</Text>
            <Text style={styles.detailValue}>4 Days</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <Text style={styles.totalLabel}>Total Paid</Text>
            <Text style={styles.totalValue}>₹7,650</Text>
          </View>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500, delay: 900 }}
          style={styles.buttonContainer}
        >
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.9}
            onPress={() => router.replace("/(bikes)/explore/index")} // CORRECTED PATH
          >
            <Text style={styles.primaryButtonText}>Rent Another Bike</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.8}
            onPress={() => router.replace("/(bikes)/bookings")} // CORRECTED PATH
          >
            <Text style={styles.secondaryButtonText}>View My Bookings</Text>
          </TouchableOpacity>
        </MotiView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primaryBg },
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
    color: COLORS.darkText,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "Poppins-Regular",
    color: COLORS.darkText,
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
    borderColor: COLORS.cardBorder,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
  },
  cardTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: COLORS.darkText,
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
    color: COLORS.darkText,
  },
  detailValue: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: COLORS.darkText,
    textAlign: "right",
    flex: 1,
    marginLeft: 16,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.cardBorder,
    marginVertical: 10,
  },
  totalLabel: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: COLORS.darkText,
  },
  totalValue: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: COLORS.darkText,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 32,
  },
  primaryButton: {
    backgroundColor: COLORS.accent,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: COLORS.accent,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  primaryButtonText: {
    color: COLORS.lightText,
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
  secondaryButton: {
    backgroundColor: COLORS.primaryBg,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 12,
    borderWidth: 1.5,
    borderColor: COLORS.accent,
  },
  secondaryButtonText: {
    color: COLORS.accent,
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
});