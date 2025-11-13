import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import React, { useMemo, useState } from "react";
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// --- THEME COLORS ---
const COLORS = {
  primaryBg: "#FFFFFF",
  componentBg: "#F9F9F9",
  accent: "#FF6B6B", // Pinkish-orange
  darkText: "#557B83",
  lightText: "#FFFFFF",
  cardBorder: "#EDEDED",
  activeChipBg: "rgba(255, 107, 107, 0.15)", // Light pink
};

// --- Calendar Type Definitions ---
interface MarkedDateEntry {
  color: string;
  textColor: string;
  starting: boolean;
  ending: boolean;
}

// --- Helper Functions for Date Logic ---

function parseDateString(dateString: string) {
  const [year, month, day] = dateString.split('-').map(Number);
  // Create date in local time
  return new Date(year, month - 1, day);
}

function toLocalDateString(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getDatesBetween(startDateString: string | null, endDateString: string | null) {
  const dates: { [key: string]: MarkedDateEntry } = {};
  if (!startDateString || !endDateString) return dates;

  const startDate = parseDateString(startDateString);
  const endDate = parseDateString(endDateString);
  let currentDate = startDate;

  while (currentDate <= endDate) {
    // USE THE LOCAL DATE STRING AS THE KEY
    const dateString = toLocalDateString(currentDate);

    dates[dateString] = {
      color: dateString === startDateString || dateString === endDateString ? COLORS.accent : COLORS.activeChipBg,
      textColor: dateString === startDateString || dateString === endDateString ? COLORS.lightText : COLORS.darkText,
      starting: dateString === startDateString,
      ending: dateString === endDateString,
    };
    // Increment the local date
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

function calculateDays(startDateString: string | null, endDateString: string | null) {
  if (!startDateString || !endDateString) return 0;
  const startDate = parseDateString(startDateString);
  const endDate = parseDateString(endDateString);
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  // Add 1 to include both start and end day
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return diffDays;
}

function formatDate(dateString: string | null) {
  if (!dateString) return "Select Date";
  const date = parseDateString(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

// --- Mock data ---
const mockBike = {
  id: "b1",
  title: "Royal Enfield Classic 350",
  location: "Tapovan, Rishikesh",
  pricePerDay: 1800,
  rating: 4.8,
  reviewCount: 89,
};

export default function BikeBookingScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { pricePerDay } = mockBike;

  // --- State for Calendar ---
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [markedDates, setMarkedDates] = useState({});

  const onDayPress = (day: { dateString: string }) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day.dateString);
      setEndDate(null);
      setMarkedDates({
        [day.dateString]: {
          starting: true,
          color: COLORS.accent,
          textColor: COLORS.lightText,
        },
      });
    } else if (startDate && !endDate) {
      if (day.dateString < startDate) {
        setStartDate(day.dateString);
        setMarkedDates({
          [day.dateString]: {
            starting: true,
            color: COLORS.accent,
            textColor: COLORS.lightText,
          },
        });
      } else {
        setEndDate(day.dateString);
        setMarkedDates(getDatesBetween(startDate, day.dateString));
      }
    }
  };

  const rentalDays = useMemo(
    () => calculateDays(startDate, endDate),
    [startDate, endDate]
  );
  
  // --- Fare Calculation ---
  const serviceFee = 350;
  const helmetCharge = 100;
  const baseFare = useMemo(
    () => pricePerDay * rentalDays,
    [pricePerDay, rentalDays]
  );
  const total = useMemo(
    () => (rentalDays > 0 ? baseFare + serviceFee + helmetCharge : 0),
    [baseFare, serviceFee, helmetCharge, rentalDays]
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.darkText} />
        </TouchableOpacity>
        <View style={styles.headerCopy}>
          <Text style={styles.headerTitle}>Confirm Your Rental</Text>
          <Text style={styles.headerSub}>
            Review details before you pay
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: Math.max(insets.bottom + 200, 240),
        }}
      >
        {/* Bike Info Card */}
        <MotiView {...cardAnimationProps} style={styles.card}>
          <Text style={styles.cardTitle}>Your Bike</Text>
          <Text style={styles.bikeTitle}>{mockBike.title}</Text>
          <Text style={styles.bikeLocation}>{mockBike.location}</Text>
          <View style={styles.bikeRating}>
            <Ionicons name="star" size={14} color={COLORS.accent} />
            <Text style={styles.bikeRatingText}>
              {mockBike.rating} ({mockBike.reviewCount} reviews)
            </Text>
          </View>
        </MotiView>

        {/* Date Selection Card */}
        <MotiView
          {...cardAnimationProps}
          transition={{ duration: 400, delay: 100 }}
          style={styles.card}
        >
          <Text style={styles.cardTitle}>Rental Dates</Text>
          <View style={styles.dateRow}>
            <View style={styles.dateBox}>
              <Text style={styles.dateLabel}>START DATE</Text>
              <Text style={styles.dateValue}>{formatDate(startDate)}</Text>
            </View>
            <Ionicons name="arrow-forward" size={20} color={COLORS.accent} />
            <View style={styles.dateBox}>
              <Text style={styles.dateLabel}>END DATE</Text>
              <Text style={styles.dateValue}>{formatDate(endDate)}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setCalendarVisible(true)}
          >
            <Text style={styles.dateButtonText}>Change Dates</Text>
          </TouchableOpacity>
          <Text style={styles.totalDaysText}>
            Total duration: {rentalDays} day{rentalDays !== 1 ? "s" : ""}
          </Text>
        </MotiView>

        {/* Fare Breakdown Card */}
        <MotiView
          {...cardAnimationProps}
          transition={{ duration: 400, delay: 300 }}
          style={styles.card}
        >
          <Text style={styles.cardTitle}>Fare Breakdown</Text>
          {rentalDays > 0 ? (
            <>
              <View style={styles.fareRow}>
                <Text style={styles.fareLabel}>
                  ₹{pricePerDay.toLocaleString("en-IN")} x {rentalDays} days
                </Text>
                <Text style={styles.fareValue}>
                  ₹{baseFare.toLocaleString("en-IN")}
                </Text>
              </View>
              <View style={styles.fareRow}>
                <Text style={styles.fareLabel}>Kumaon service fee</Text>
                <Text style={styles.fareValue}>
                  ₹{serviceFee.toLocaleString("en-IN")}
                </Text>
              </View>
              <View style={styles.fareRow}>
                <Text style={styles.fareLabel}>Helmet & safety</Text>
                <Text style={styles.fareValue}>
                  ₹{helmetCharge.toLocaleString("en-IN")}
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.fareRow}>
                <Text style={styles.fareTotal}>Total</Text>
                <Text style={styles.fareTotal}>
                  ₹{total.toLocaleString("en-IN")}
                </Text>
              </View>
            </>
          ) : (
            <Text style={styles.fareLabel}>
              Please select your rental start and end dates.
            </Text>
          )}
        </MotiView>
      </ScrollView>

      {/* Footer */}
      <View
        style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}
      >
        <View style={styles.footerTopRow}>
          <View>
            <Text style={styles.footerLabel}>Total payable</Text>
            <Text style={styles.footerTotal}>
              ₹{total.toLocaleString("en-IN")}
            </Text>
          </View>
          <View style={styles.footerEtaPill}>
            <Ionicons name="calendar-outline" size={14} color={COLORS.darkText} />
            <Text style={styles.footerEta}>{rentalDays} day(s)</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/(bikes)/explore/confirmation")}
          activeOpacity={0.88}
          style={styles.footerAction}
          disabled={total === 0}
        >
          <LinearGradient
            colors={total > 0 ? [COLORS.accent, "#E65050"] : ["#B0B0B0", "#909090"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.footerBtn}
          >
            <Text style={styles.paymentText}>Proceed to Payment 💳</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.footerNote}>
          Your next adventure is one step away! 🏔️
        </Text>
      </View>

      {/* --- CALENDAR MODAL --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCalendarVisible}
        onRequestClose={() => setCalendarVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Your Dates</Text>
            <Calendar
              onDayPress={onDayPress}
              markingType="period"
              markedDates={markedDates}
              theme={{
                calendarBackground: COLORS.primaryBg,
                arrowColor: COLORS.accent,
                todayTextColor: COLORS.accent,
                selectedDayBackgroundColor: COLORS.accent,
                selectedDayTextColor: COLORS.lightText,
                monthTextColor: COLORS.darkText,
                dayTextColor: COLORS.darkText,
                textDisabledColor: "#C4C4C4",
              }}
            />
            <TouchableOpacity
              style={styles.modalDoneButton}
              onPress={() => setCalendarVisible(false)}
            >
              <Text style={styles.modalDoneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// --- Animation Props ---
const cardAnimationProps = {
  from: { opacity: 0, translateY: 10 },
  animate: { opacity: 1, translateY: 0 },
  transition: { duration: 400 },
};

// --- STYLES (Unchanged) ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primaryBg, paddingHorizontal: 24 },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  backBtn: {
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.componentBg,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 3,
  },
  headerCopy: { flex: 1, marginLeft: 12 },
  headerTitle: {
    fontSize: 22,
    fontFamily: "Poppins-SemiBold",
    color: COLORS.darkText,
  },
  headerSub: {
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    color: COLORS.darkText,
    marginTop: 4,
    lineHeight: 18,
  },
  card: {
    backgroundColor: COLORS.componentBg,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 5,
  },
  cardTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: COLORS.darkText,
    marginBottom: 12,
  },
  bikeTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: COLORS.darkText,
  },
  bikeLocation: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: COLORS.darkText,
    marginTop: 4,
  },
  bikeRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
  },
  bikeRatingText: {
    fontFamily: "Poppins-Medium",
    fontSize: 13,
    color: COLORS.darkText,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.primaryBg,
    borderRadius: 16,
    padding: 16,
  },
  dateBox: {
    alignItems: "center",
    flex: 1,
  },
  dateLabel: {
    fontFamily: "Poppins-Medium",
    fontSize: 11,
    color: COLORS.darkText,
    textTransform: "uppercase",
  },
  dateValue: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: COLORS.darkText,
    marginTop: 4,
  },
  dateButton: {
    marginTop: 12,
    alignItems: "center",
    padding: 10,
  },
  dateButtonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: COLORS.accent,
  },
  totalDaysText: {
    fontFamily: "Poppins-Medium",
    fontSize: 13,
    color: COLORS.darkText,
    textAlign: "center",
    marginTop: 4,
  },
  fareRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  fareLabel: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: COLORS.darkText,
  },
  fareValue: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: COLORS.darkText,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.cardBorder,
    marginVertical: 16,
  },
  fareTotal: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 17,
    color: COLORS.darkText,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.primaryBg,
    borderTopWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingTop: 16,
    alignItems: "center",
    paddingHorizontal: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  footerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width - 48,
    alignItems: "center",
  },
  footerLabel: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: COLORS.darkText,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  footerTotal: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 22,
    color: COLORS.darkText,
    marginTop: 4,
  },
  footerEtaPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: COLORS.componentBg,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  footerEta: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: COLORS.darkText,
  },
  footerAction: {
    width: width - 48,
    borderRadius: 22,
    marginTop: 16,
  },
  footerBtn: {
    width: width - 48,
    borderRadius: 22,
    paddingVertical: 16,
    alignItems: "center",
  },
  paymentText: {
    color: COLORS.lightText,
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
  footerNote: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: COLORS.darkText,
    marginTop: 12,
    textAlign: "center",
  },
  
  // --- Modal Styles ---
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: COLORS.primaryBg,
    borderRadius: 20,
    padding: 20,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: COLORS.darkText,
    marginBottom: 16,
    textAlign: "center",
  },
  modalDoneButton: {
    backgroundColor: COLORS.accent,
    borderRadius: 16,
    padding: 14,
    marginTop: 20,
    alignItems: "center",
  },
  modalDoneText: {
    color: COLORS.lightText,
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
});