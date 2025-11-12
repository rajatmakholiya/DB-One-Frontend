import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function BookingSummaryScreen() {
  const insets = useSafeAreaInsets();
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [loyaltyUsed, setLoyaltyUsed] = useState(false);

  // Mock base data
  const baseFare = 95;
  const platformFee = 10;
  const travelInsurance = 5;
  const addOns = [
    { title: "Photo Package", price: 200 },
    { title: "Kumaoni Treats", price: 68 },
  ];
  const discountByTravellerType = 30; // Discount for early traveller
  const couponDiscount = appliedCoupon === "NEW50" ? 50 : 0;
  const loyaltyPoints = 40;
  const loyaltyCash = loyaltyUsed ? 40 : 0;

  const router = useRouter();

  const totalBeforeDiscounts =
    baseFare +
    platformFee +
    travelInsurance +
    addOns.reduce((sum, x) => sum + x.price, 0);

  const totalAfterDiscounts =
    totalBeforeDiscounts -
    discountByTravellerType -
    couponDiscount -
    loyaltyCash;

  const eta = "12 mins";
  const journeyDuration = "2.5 hours";
  const passengerCount = 1;
  const journeyDate = "Fri, 12 Jul • 9:30 AM";

  const handleApplyCoupon = () => {
    if (coupon.trim().toUpperCase() === "NEW50") {
      setAppliedCoupon("NEW50");
    } else {
      setAppliedCoupon("");
      alert("Invalid coupon code");
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>
        <View style={styles.headerCopy}>
          <Text style={styles.headerTitle}>Booking Summary</Text>
          <Text style={styles.headerSub}>
            Review your journey details before confirming
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: Math.max(insets.bottom + 200, 240),
        }}
      >
        {/* Journey Route */}
        <MotiView
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 400 }}
          style={styles.card}
        >
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.cardTitle}>Journey Route</Text>
            <View style={styles.statusChip}>
              <Ionicons name="time-outline" size={14} color="#E46C1E" />
              <Text style={styles.statusChipText}>ETA {eta}</Text>
            </View>
          </View>
          <View style={styles.routeTimeline}>
            <View style={styles.routePoint}>
              <View style={styles.routeDotGreen} />
              <View>
                <Text style={styles.routeLabel}>Pickup</Text>
                <Text style={styles.routeValue}>Bhimtal, Nainital</Text>
              </View>
            </View>
            <View style={styles.routeConnector} />
            <View style={styles.routePoint}>
              <View style={styles.routeDotRed} />
              <View>
                <Text style={styles.routeLabel}>Destination</Text>
                <Text style={styles.routeValue}>Ranikhet Bus Stand</Text>
              </View>
            </View>
          </View>
          <View style={styles.routeMetaRow}>
            <View style={styles.routeMetaChip}>
              <Ionicons name="calendar-outline" size={14} color="#d45b12" />
              <Text style={styles.routeMetaText}>{journeyDate}</Text>
            </View>
            <View style={styles.routeMetaChip}>
              <Ionicons name="person-outline" size={14} color="#d45b12" />
              <Text style={styles.routeMetaText}>
                {passengerCount} passenger
              </Text>
            </View>
            <View style={styles.routeMetaChip}>
              <Ionicons name="navigate-outline" size={14} color="#d45b12" />
              <Text style={styles.routeMetaText}>{journeyDuration}</Text>
            </View>
          </View>
        </MotiView>

        {/* Driver & Vehicle */}
        <View style={[styles.card, styles.cardAccent]}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.cardTitle}>Your Driver & Vehicle</Text>
            <View style={styles.badgeVerified}>
              <Ionicons
                name="shield-checkmark-outline"
                size={14}
                color="#118a24"
              />
              <Text style={styles.badgeVerifiedText}>Verified</Text>
            </View>
          </View>
          <View style={styles.driverRow}>
            <View style={styles.avatar} />
            <View style={styles.driverInfoBlock}>
              <View style={styles.driverTopRow}>
                <Text style={styles.driverName}>Vinod Bisht</Text>
                <View style={styles.ratingPill}>
                  <Ionicons name="star" size={14} color="#f5a623" />
                  <Text style={styles.ratingText}>4.7</Text>
                </View>
              </View>
              <Text style={styles.driverMeta}>2156 trips • Kumaon Fleet</Text>
              <View style={styles.vehicleRow}>
                <Ionicons name="car-sport-outline" size={16} color="#d45b12" />
                <Text style={styles.driverCar}>
                  Tempo Traveller • Force Traveller
                </Text>
              </View>
              <Text style={styles.driverSub}>UK 02 EF 9012 • White</Text>
            </View>
          </View>
          <View style={styles.sharedRideBanner}>
            <View style={styles.sharedRideRow}>
              <Text style={styles.sharedRideTitle}>Shared Ride</Text>
              <View style={styles.sharedRideChip}>
                <Ionicons name="pricetag-outline" size={14} color="#118a24" />
                <Text style={styles.sharedRideChipText}>Save ₹78</Text>
              </View>
            </View>
            <Text style={styles.sharedRideText}>
              Travelling with Dev P., Priya K., Amit J.
            </Text>
          </View>
        </View>

        {/* Fare Breakdown */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Fare Breakdown</Text>

          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>Base fare</Text>
            <Text style={styles.fareValue}>₹{baseFare}</Text>
          </View>
          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>Platform fee</Text>
            <Text style={styles.fareValue}>₹{platformFee}</Text>
          </View>
          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>Travel insurance</Text>
            <Text style={styles.fareValue}>₹{travelInsurance}</Text>
          </View>

          {addOns.length > 0 && (
            <View style={styles.fareGroupHeader}>
              <Text style={styles.fareGroupLabel}>Enhancements</Text>
            </View>
          )}

          {addOns.map((a, i) => (
            <View key={i} style={styles.fareRow}>
              <Text style={styles.fareLabel}>{a.title}</Text>
              <Text style={styles.fareValue}>₹{a.price}</Text>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.fareRow}>
            <Text style={styles.fareLabelGreen}>Traveller Discount</Text>
            <Text style={styles.fareValueGreen}>
              -₹{discountByTravellerType}
            </Text>
          </View>

          {appliedCoupon && (
            <View style={styles.fareRow}>
              <Text style={styles.fareLabelGreen}>
                Coupon ({appliedCoupon})
              </Text>
              <Text style={styles.fareValueGreen}>-₹{couponDiscount}</Text>
            </View>
          )}

          {loyaltyUsed && (
            <View style={styles.fareRow}>
              <Text style={styles.fareLabelGreen}>Loyalty Points Redeemed</Text>
              <Text style={styles.fareValueGreen}>-₹{loyaltyCash}</Text>
            </View>
          )}

          <View style={styles.divider} />

          <View style={styles.fareRow}>
            <Text style={styles.fareTotal}>Total</Text>
            <Text style={styles.fareTotal}>₹{totalAfterDiscounts}</Text>
          </View>

          {/* Coupon input */}
          <View style={styles.couponRow}>
            <TextInput
              placeholder="Enter coupon code"
              placeholderTextColor="#b79f8c"
              style={styles.couponInput}
              value={coupon}
              onChangeText={setCoupon}
              autoCapitalize="characters"
            />
            <TouchableOpacity
              style={[
                styles.applyBtn,
                appliedCoupon && styles.applyBtnDisabled,
              ]}
              onPress={() => {
                if (!appliedCoupon) handleApplyCoupon();
              }}
              activeOpacity={0.85}
            >
              <Text style={styles.applyBtnText}>
                {appliedCoupon ? "Applied" : "Apply"}
              </Text>
            </TouchableOpacity>
          </View>
          {appliedCoupon ? (
            <View style={styles.couponSuccess}>
              <Ionicons name="checkmark-circle" size={16} color="#118a24" />
              <Text style={styles.couponSuccessText}>
                Coupon {appliedCoupon} applied successfully
              </Text>
            </View>
          ) : null}

          {/* Loyalty toggle */}
          <TouchableOpacity
            style={[styles.loyaltyRow, loyaltyUsed && styles.loyaltyRowActive]}
            onPress={() => setLoyaltyUsed(!loyaltyUsed)}
            activeOpacity={0.85}
          >
            <View style={styles.loyaltyIconWrap}>
              <Ionicons
                name={loyaltyUsed ? "sparkles" : "sparkles-outline"}
                size={16}
                color="#E46C1E"
              />
            </View>
            <View style={styles.loyaltyCopy}>
              <Text style={styles.loyaltyTitle}>Redeem loyalty points</Text>
              <Text style={styles.loyaltyCaption}>
                Use {loyaltyPoints} pts and save ₹{loyaltyPoints}
              </Text>
            </View>
            <View style={styles.loyaltyChip}>
              <Text style={styles.loyaltyChipText}>−₹{loyaltyPoints}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Peace of Mind */}
        <View style={[styles.card, styles.cardSoft]}>
          <Text style={styles.cardTitle}>Your Peace of Mind</Text>
          <View style={styles.assuranceGrid}>
            <View style={styles.assuranceItem}>
              <View style={[styles.assuranceIcon, styles.assuranceIconGreen]}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={18}
                  color="#118a24"
                />
              </View>
              <Text style={styles.assuranceTitle}>Safety Verified</Text>
              <Text style={styles.assuranceDesc}>Background checked</Text>
            </View>
            <View style={styles.assuranceItem}>
              <View style={[styles.assuranceIcon, styles.assuranceIconOrange]}>
                <Ionicons name="cash-outline" size={18} color="#E46C1E" />
              </View>
              <Text style={styles.assuranceTitle}>Refund Assured</Text>
              <Text style={styles.assuranceDesc}>100% money back</Text>
            </View>
            <View style={styles.assuranceItem}>
              <View style={[styles.assuranceIcon, styles.assuranceIconBlue]}>
                <Ionicons name="medkit-outline" size={18} color="#1E90FF" />
              </View>
              <Text style={styles.assuranceTitle}>Insured Journey</Text>
              <Text style={styles.assuranceDesc}>Travel protection</Text>
            </View>
            <View style={styles.assuranceItem}>
              <View style={[styles.assuranceIcon, styles.assuranceIconNeutral]}>
                <Ionicons name="call-outline" size={18} color="#444" />
              </View>
              <Text style={styles.assuranceTitle}>24/7 Support</Text>
              <Text style={styles.assuranceDesc}>Always here</Text>
            </View>
          </View>
        </View>

        {/* Cancellation Policy */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Cancellation Policy</Text>
          <Text style={styles.policyText}>
            • Free cancellation up to 15 minutes before pickup
          </Text>
          <Text style={styles.policyText}>
            • 50% refund if cancelled 15–5 minutes before
          </Text>
          <Text style={styles.policyText}>
            • No refund if cancelled within 5 minutes or after pickup
          </Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View
        style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}
      >
        <View style={styles.footerTopRow}>
          <View>
            <Text style={styles.footerLabel}>Total payable</Text>
            <Text style={styles.footerTotal}>₹{totalAfterDiscounts}</Text>
          </View>
          <View style={styles.footerEtaPill}>
            <Ionicons name="time-outline" size={14} color="#d45b12" />
            <Text style={styles.footerEta}>ETA {eta}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/(cabs)/booking/checkout")}
          activeOpacity={0.88}
          style={styles.footerAction}
        >
          <LinearGradient
            colors={["#ff8bc1", "#E46C1E"]}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fffafc", paddingHorizontal: 24 },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  backBtn: {
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f2dfcd",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 3,
  },
  headerCopy: { flex: 1, marginLeft: 12 },
  headerTitle: {
    fontSize: 22,
    fontFamily: "Poppins-SemiBold",
    color: "#1b140f",
  },
  headerSub: {
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    color: "#6a5b52",
    marginTop: 4,
    lineHeight: 18,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#f3e5d7",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 5,
  },
  cardAccent: {
    backgroundColor: "#fff8f0",
    borderColor: "#f7d7bd",
  },
  cardSoft: {
    backgroundColor: "#fff9e5",
    borderColor: "#f8dca8",
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#1b140f",
  },
  statusChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#fff4eb",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#f2d1b8",
  },
  statusChipText: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#d45b12",
  },

  routeTimeline: { marginTop: 18 },
  routePoint: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  routeConnector: {
    height: 30,
    borderLeftWidth: 1.5,
    borderColor: "#e2d4c6",
    marginLeft: 5,
    marginVertical: 2,
  },
  routeDotGreen: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#118a24",
    marginRight: 12,
    marginTop: 4,
  },
  routeDotRed: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#d11a1a",
    marginRight: 12,
    marginTop: 4,
  },
  routeLabel: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: "#7a4a1a",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  routeValue: {
    fontSize: 15,
    fontFamily: "Poppins-SemiBold",
    color: "#1b140f",
    marginTop: 4,
  },
  routeMetaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 18,
  },
  routeMetaChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#fff4eb",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#f2d1b8",
    flexShrink: 1,
  },
  routeMetaText: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#7a4a1a",
  },

  badgeVerified: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#e9f8ee",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#c2e9d0",
  },
  badgeVerifiedText: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#118a24",
  },

  driverRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#e5d8cb",
    marginRight: 14,
  },
  driverInfoBlock: { flex: 1 },
  driverTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  driverName: {
    fontSize: 17,
    fontFamily: "Poppins-SemiBold",
    color: "#1b140f",
  },
  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#fff4eb",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: "Poppins-SemiBold",
    color: "#7a4a1a",
  },
  driverMeta: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: "#7a6b61",
    marginTop: 6,
  },
  vehicleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
  },
  driverCar: {
    fontSize: 13,
    fontFamily: "Poppins-Medium",
    color: "#4a3629",
  },
  driverSub: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#8a7a70",
    marginTop: 6,
  },

  sharedRideBanner: {
    marginTop: 18,
    backgroundColor: "#f2fff5",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#cfead6",
    padding: 14,
  },
  sharedRideRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sharedRideTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#118a24",
  },
  sharedRideChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#e8fff0",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  sharedRideChipText: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#118a24",
  },
  sharedRideText: {
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    color: "#5d4d42",
    lineHeight: 20,
  },

  fareRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  fareLabel: {
    fontSize: 13,
    fontFamily: "Poppins-Medium",
    color: "#6a5b52",
  },
  fareValue: {
    fontSize: 13,
    fontFamily: "Poppins-SemiBold",
    color: "#1b140f",
  },
  fareLabelGreen: {
    color: "#118a24",
    fontFamily: "Poppins-Medium",
    fontSize: 13,
  },
  fareValueGreen: {
    color: "#118a24",
    fontFamily: "Poppins-SemiBold",
    fontSize: 13,
  },
  fareGroupHeader: { marginTop: 18 },
  fareGroupLabel: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#9a6f3a",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  divider: {
    height: 1,
    backgroundColor: "#f1e5d7",
    marginVertical: 16,
  },
  fareTotal: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#1b140f",
  },

  couponRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },
  couponInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#f2d1b8",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontFamily: "Poppins-Medium",
    fontSize: 13,
    color: "#4a3629",
  },
  applyBtn: {
    marginLeft: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: "#fff4eb",
    borderWidth: 1,
    borderColor: "#f2d1b8",
  },
  applyBtnDisabled: {
    opacity: 0.6,
  },
  applyBtnText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 13,
    color: "#d45b12",
  },
  couponSuccess: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
  },
  couponSuccessText: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#118a24",
  },

  loyaltyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    borderWidth: 1,
    borderColor: "#f2d1b8",
    borderRadius: 16,
    padding: 14,
    backgroundColor: "#fff",
    gap: 12,
  },
  loyaltyRowActive: {
    backgroundColor: "#fff8f0",
    borderColor: "#E46C1E",
  },
  loyaltyIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#fff4eb",
    alignItems: "center",
    justifyContent: "center",
  },
  loyaltyCopy: { flex: 1 },
  loyaltyTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 13,
    color: "#1b140f",
  },
  loyaltyCaption: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#6a5b52",
    marginTop: 2,
  },
  loyaltyChip: {
    backgroundColor: "#fff4eb",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  loyaltyChipText: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#d45b12",
  },

  assuranceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 18,
  },
  assuranceItem: {
    width: "47%",
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#f3e5d7",
    paddingVertical: 18,
    alignItems: "center",
    gap: 10,
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 4,
  },
  assuranceIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  assuranceIconGreen: { backgroundColor: "#e9f8ee" },
  assuranceIconOrange: { backgroundColor: "#fff0e4" },
  assuranceIconBlue: { backgroundColor: "#e7f2ff" },
  assuranceIconNeutral: { backgroundColor: "#ece5dd" },
  assuranceTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 13,
    color: "#3a2b22",
  },
  assuranceDesc: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#6a5b52",
    textAlign: "center",
  },

  policyText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#6a5b52",
    lineHeight: 20,
    marginTop: 12,
  },

  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#f2dfd2",
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
    color: "#7a4a1a",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  footerTotal: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 22,
    color: "#1b140f",
    marginTop: 4,
  },
  footerEtaPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#fff4eb",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#f2d1b8",
  },
  footerEta: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#d45b12",
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
    color: "#fffdf7",
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
  footerNote: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#8a7a70",
    marginTop: 12,
    textAlign: "center",
  },
});
