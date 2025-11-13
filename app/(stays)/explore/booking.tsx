import { MaterialIcons } from "@expo/vector-icons"; // <-- CORRECTED IMPORT
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

// --- New Theme ---
const COLORS = {
  primary: "#df8020",
  backgroundLight: "#f8f7f6",
  componentBg: "#FFFFFF",
  textPrimary: "#171411",
  textSubtle: "#877564",
  white: "#FFFFFF",
  borderColor: "#EAEAEA",
  activeChipBg: "rgba(223, 128, 32, 0.15)",
};

// --- Calendar Type Definitions ---
interface MarkedDateEntry {
  color: string;
  textColor: string;
  starting: boolean;
  ending: boolean;
}

// --- Helper Functions for Date Logic (WITH BUG FIX) ---

function parseDateString(dateString: string) {
  const [year, month, day] = dateString.split('-').map(Number);
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
    const dateString = toLocalDateString(currentDate);
    dates[dateString] = {
      color: dateString === startDateString || dateString === endDateString ? COLORS.primary : COLORS.activeChipBg,
      textColor: dateString === startDateString || dateString === endDateString ? COLORS.white : COLORS.textPrimary,
      starting: dateString === startDateString,
      ending: dateString === endDateString,
    };
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

function calculateNights(startDateString: string | null, endDateString: string | null) {
  if (!startDateString || !endDateString) return 0;
  const startDate = parseDateString(startDateString);
  const endDate = parseDateString(endDateString);
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
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
const mockHomestay = {
  id: "k1",
  title: "The Himalayan Escape",
  location: "Mukteshwar, Kumaon",
  pricePerNight: 4500,
  rating: 4.9,
  reviewCount: 134,
};

export default function HomestayBookingScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { pricePerNight } = mockHomestay;
  const [guests, setGuests] = useState(2);

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
          color: COLORS.primary,
          textColor: COLORS.white,
        },
      });
    } else if (startDate && !endDate) {
      if (day.dateString < startDate) {
        setStartDate(day.dateString);
        setMarkedDates({
          [day.dateString]: {
            starting: true,
            color: COLORS.primary,
            textColor: COLORS.white,
          },
        });
      } else {
        setEndDate(day.dateString);
        setMarkedDates(getDatesBetween(startDate, day.dateString));
      }
    }
  };

  const nights = useMemo(
    () => calculateNights(startDate, endDate),
    [startDate, endDate]
  );
  
  const serviceFee = 850;
  const cleaningFee = 400;
  const baseFare = useMemo(
    () => pricePerNight * nights,
    [pricePerNight, nights]
  );
  const total = useMemo(
    () => (nights > 0 ? baseFare + serviceFee + cleaningFee : 0),
    [baseFare, serviceFee, cleaningFee, nights]
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
        >
          {/* CORRECTED ICON */}
          <MaterialIcons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerCopy}>
          <Text style={styles.headerTitle}>Confirm Your Stay</Text>
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
        {/* Homestay Info Card */}
        <MotiView {...cardAnimationProps} style={styles.card}>
          <Text style={styles.cardTitle}>Your Homestay</Text>
          <Text style={styles.homestayTitle}>{mockHomestay.title}</Text>
          <Text style={styles.homestayLocation}>{mockHomestay.location}</Text>
          <View style={styles.homestayRating}>
            <MaterialIcons name="star" size={16} color={COLORS.primary} />
            <Text style={styles.homestayRatingText}>
              {mockHomestay.rating} ({mockHomestay.reviewCount} reviews)
            </Text>
          </View>
        </MotiView>

        {/* Date Selection Card */}
        <MotiView
          {...cardAnimationProps}
          transition={{ duration: 400, delay: 100 }}
          style={styles.card}
        >
          <Text style={styles.cardTitle}>Your Dates</Text>
          <View style={styles.dateRow}>
            <View style={styles.dateBox}>
              <Text style={styles.dateLabel}>CHECK-IN</Text>
              <Text style={styles.dateValue}>{formatDate(startDate)}</Text>
            </View>
            {/* CORRECTED ICON */}
            <MaterialIcons name="arrow-forward" size={20} color={COLORS.primary} />
            <View style={styles.dateBox}>
              <Text style={styles.dateLabel}>CHECK-OUT</Text>
              <Text style={styles.dateValue}>{formatDate(endDate)}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setCalendarVisible(true)}
          >
            <Text style={styles.dateButtonText}>Change Dates</Text>
          </TouchableOpacity>
          <Text style={styles.totalNightsText}>
            Total stay: {nights} night{nights !== 1 ? "s" : ""}
          </Text>
        </MotiView>

        {/* Guest Counter Card */}
        <MotiView
          {...cardAnimationProps}
          transition={{ duration: 400, delay: 200 }}
          style={styles.card}
        >
          <Text style={styles.cardTitle}>Guests</Text>
          <View style={styles.counterCard}>
            <Text style={styles.counterLabel}>Number of guests</Text>
            <View style={styles.counterRow}>
              <TouchableOpacity
                onPress={() => setGuests(Math.max(1, guests - 1))}
                style={styles.counterBtn}
              >
                <Text style={styles.counterBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.counterValue}>{guests}</Text>
              <TouchableOpacity
                onPress={() => setGuests(guests + 1)}
                style={styles.counterBtn}
              >
                <Text style={styles.counterBtnText}>＋</Text>
              </TouchableOpacity>
            </View>
          </View>
        </MotiView>

        {/* Fare Breakdown Card */}
        <MotiView
          {...cardAnimationProps}
          transition={{ duration: 400, delay: 300 }}
          style={styles.card}
        >
          <Text style={styles.cardTitle}>Fare Breakdown</Text>
          {nights > 0 ? (
            <>
              <View style={styles.fareRow}>
                <Text style={styles.fareLabel}>
                  ₹{pricePerNight.toLocaleString("en-IN")} x {nights} nights
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
                <Text style={styles.fareLabel}>Cleaning fee</Text>
                <Text style={styles.fareValue}>
                  ₹{cleaningFee.toLocaleString("en-IN")}
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
              Please select your check-in and check-out dates.
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
            {/* CORRECTED ICON */}
            <MaterialIcons name="group" size={16} color={COLORS.textSubtle} />
            <Text style={styles.footerEta}>{guests} guest(s)</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/(stays)/explore/confirmation")}
          activeOpacity={0.88}
          style={styles.footerAction}
          disabled={total === 0}
        >
          <LinearGradient
            colors={total > 0 ? [COLORS.primary, "#b85b1a"] : ["#B0B0B0", "#909090"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.footerBtn}
          >
            <Text style={styles.paymentText}>Proceed to Payment 💳</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.footerNote}>
          Your Kumaon journey is just one step away! 🏔️
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
                calendarBackground: COLORS.componentBg,
                arrowColor: COLORS.primary,
                todayTextColor: COLORS.primary,
                selectedDayBackgroundColor: COLORS.primary,
                selectedDayTextColor: COLORS.white,
                monthTextColor: COLORS.textPrimary,
                dayTextColor: COLORS.textPrimary,
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
  container: { flex: 1, backgroundColor: COLORS.backgroundLight, paddingHorizontal: 24 },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  backBtn: {
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    backgroundColor: COLORS.componentBg,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 3,
  },
  headerCopy: { flex: 1, marginLeft: 12 },
  headerTitle: {
    fontSize: 22,
    fontFamily: "Poppins-SemiBold",
    color: COLORS.textPrimary,
  },
  headerSub: {
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    color: COLORS.textSubtle,
    marginTop: 4,
    lineHeight: 18,
  },
  card: {
    backgroundColor: COLORS.componentBg,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 5,
  },
  cardTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  homestayTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: COLORS.textPrimary,
  },
  homestayLocation: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: COLORS.textSubtle,
    marginTop: 4,
  },
  homestayRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
  },
  homestayRatingText: {
    fontFamily: "Poppins-Medium",
    fontSize: 13,
    color: COLORS.textSubtle,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.backgroundLight,
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
    color: COLORS.textSubtle,
    textTransform: "uppercase",
  },
  dateValue: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: COLORS.textPrimary,
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
    color: COLORS.primary,
  },
  totalNightsText: {
    fontFamily: "Poppins-Medium",
    fontSize: 13,
    color: COLORS.textSubtle,
    textAlign: "center",
    marginTop: 4,
  },
  counterCard: {
    borderRadius: 12,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  counterLabel: {
    fontFamily: "Poppins-Medium",
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  counterRow: { flexDirection: "row", alignItems: "center" },
  counterBtn: {
    backgroundColor: COLORS.backgroundLight,
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  counterBtnText: {
    fontSize: 20,
    color: COLORS.primary,
    fontFamily: "Poppins-SemiBold",
  },
  counterValue: {
    marginHorizontal: 14,
    fontSize: 16,
    color: COLORS.textPrimary,
    fontFamily: "Poppins-SemiBold",
  },
  fareRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  fareLabel: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: COLORS.textSubtle,
  },
  fareValue: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: COLORS.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.borderColor,
    marginVertical: 16,
  },
  fareTotal: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 17,
    color: COLORS.textPrimary,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.componentBg,
    borderTopWidth: 1,
    borderColor: COLORS.borderColor,
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
    color: COLORS.textSubtle,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  footerTotal: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 22,
    color: COLORS.textPrimary,
    marginTop: 4,
  },
  footerEtaPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  footerEta: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: COLORS.textSubtle,
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
    color: COLORS.white,
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
  footerNote: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: COLORS.textSubtle,
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
    backgroundColor: COLORS.componentBg,
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
    color: COLORS.textPrimary,
    marginBottom: 16,
    textAlign: "center",
  },
  modalDoneButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 14,
    marginTop: 20,
    alignItems: "center",
  },
  modalDoneText: {
    color: COLORS.white,
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
});