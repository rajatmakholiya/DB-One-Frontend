import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import React, { useMemo, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function EnhanceJourneyScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const addons = [
    {
      id: "guide",
      title: "Cultural Guide Experience",
      desc: "Local guide sharing Kumaoni folklore and history",
      oldPrice: 150,
      price: 120,
      pts: 25,
      tag: "Popular",
      icon: "trail-sign-outline",
    },
    {
      id: "photo",
      title: "Photo Package",
      desc: "Professional photos at scenic stops",
      price: 200,
      pts: 30,
      tag: "New",
      icon: "camera-outline",
    },
    {
      id: "treats",
      title: "Kumaoni Treats",
      desc: "Traditional snacks and herbal tea",
      oldPrice: 80,
      price: 68,
      pts: 15,
      icon: "cafe-outline",
    },
    {
      id: "music",
      title: "Regional Music",
      desc: "Curated Kumaoni folk music playlist",
      price: 30,
      pts: 10,
      tag: "Free",
      icon: "musical-notes-outline",
    },
    {
      id: "photoStops",
      title: "Scenic Photo Stops",
      desc: "Extra stops at viewpoints (+15 mins)",
      price: 100,
      pts: 20,
      icon: "image-outline",
    },
    {
      id: "return",
      title: "Return Booking",
      desc: "25% off your return journey",
      price: 0,
      pts: 50,
      tag: "Special",
      icon: "gift-outline",
    },
  ];

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const totalCost = useMemo(
    () =>
      selectedAddons.reduce(
        (sum, id) => sum + (addons.find((a) => a.id === id)?.price ?? 0),
        0
      ),
    [selectedAddons]
  );

  const totalPoints = useMemo(
    () =>
      selectedAddons.reduce(
        (sum, id) => sum + (addons.find((a) => a.id === id)?.pts ?? 0),
        0
      ),
    [selectedAddons]
  );

  const ContinueBtn = () => (
    <TouchableOpacity
      onPress={() => router.push("/(cabs)/booking/ride-confirmation")}
      activeOpacity={0.88}
      style={styles.footerAction}
    >
      <LinearGradient
        colors={["#ff8bc1", "#E46C1E"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.footerBtn}
      >
        <Text style={styles.footerText}>
          {selectedAddons.length > 0
            ? "Add Enhancements ✨"
            : "Continue Without Extras ✨"}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Enhance Your Journey</Text>
          <Text style={styles.headerSub}>
            Curate add-ons to make your Kumaon ride memorable
          </Text>
        </View>
        <View style={styles.pointsBox}>
          <Ionicons name="sparkles-outline" size={16} color="#E46C1E" />
          <Text style={styles.pointsText}>247 pts</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: Math.max(insets.bottom + 120, 160),
        }}
      >
        {/* Journey Summary */}
        <MotiView
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 400 }}
          style={styles.journeyBox}
        >
          <View style={styles.journeyRow}>
            <Text style={styles.journeyLabel}>Your Journey</Text>
            <View style={styles.journeyTag}>
              <Text style={styles.journeyTagText}>Standard</Text>
            </View>
          </View>
          <View style={styles.journeyDetails}>
            <Text style={[styles.journeyText, styles.journeyTextFirst]}>
              📍 Bhimtal, Nainital → Ranikhet Bus Stand
            </Text>
            <Text style={styles.journeyText}>👤 1 passenger</Text>
            <Text style={styles.journeyText}>⏱ Estimated 2.5 hours</Text>
          </View>
        </MotiView>

        {/* Positive Impact */}
        <Text style={styles.sectionTitle}>Your Positive Impact</Text>
        <View style={styles.impactGrid}>
          <View style={styles.impactCard}>
            <View style={styles.impactIcon}>
              <Ionicons name="leaf-outline" size={18} color="#118a24" />
            </View>
            <Text style={styles.impactLabel}>Carbon Offset</Text>
            <Text style={styles.impactValue}>12.5 kg CO₂ saved</Text>
          </View>
          <View style={styles.impactCard}>
            <View style={styles.impactIcon}>
              <Ionicons name="heart-outline" size={18} color="#E46C1E" />
            </View>
            <Text style={styles.impactLabel}>Local Economy</Text>
            <Text style={styles.impactValue}>₹45 contributed</Text>
          </View>
          <View style={styles.impactCard}>
            <View style={styles.impactIcon}>
              <Ionicons
                name="shield-checkmark-outline"
                size={18}
                color="#1E90FF"
              />
            </View>
            <Text style={styles.impactLabel}>Safety Score</Text>
            <Text style={styles.impactValue}>98% safe</Text>
          </View>
        </View>

        {/* Available Enhancements */}
        <Text style={[styles.sectionTitle, { marginTop: 16 }]}>
          Available Enhancements
        </Text>

        {addons.map((a, i) => {
          const isSelected = selectedAddons.includes(a.id);
          return (
            <MotiView
              key={a.id}
              from={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "timing", duration: 300, delay: i * 80 }}
            >
              <TouchableOpacity
                activeOpacity={0.85}
                style={[
                  styles.addonCard,
                  isSelected && styles.addonCardSelected,
                ]}
                onPress={() => toggleAddon(a.id)}
              >
                <View style={styles.addonHeaderRow}>
                  <View style={styles.addonIconWrap}>
                    <Ionicons
                      name={a.icon as any}
                      size={22}
                      color={isSelected ? "#E46C1E" : "#9a6f3a"}
                    />
                  </View>
                  <View style={styles.addonInfo}>
                    <View style={styles.addonTitleRow}>
                      <Text style={styles.addonTitle}>{a.title}</Text>
                      {a.tag && (
                        <View
                          style={[
                            styles.tagBadge,
                            a.tag === "New"
                              ? styles.newTag
                              : a.tag === "Free"
                              ? styles.freeTag
                              : a.tag === "Special"
                              ? styles.specialTag
                              : styles.popularTag,
                          ]}
                        >
                          <Text style={styles.tagText}>{a.tag}</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.addonDesc}>{a.desc}</Text>
                  </View>
                  <Ionicons
                    name={isSelected ? "checkmark-circle" : "ellipse-outline"}
                    size={22}
                    color={isSelected ? "#E46C1E" : "#d7c7b4"}
                    style={styles.addonSelectIcon}
                  />
                </View>
                <View style={styles.addonMetaRow}>
                  <View style={styles.priceRow}>
                    {a.oldPrice && (
                      <Text style={styles.oldPrice}>₹{a.oldPrice}</Text>
                    )}
                    <Text style={styles.price}>₹{a.price}</Text>
                  </View>
                  <View style={styles.pointsPill}>
                    <Ionicons
                      name="sparkles-outline"
                      size={14}
                      color="#E46C1E"
                    />
                    <Text style={styles.pointsPillText}>+{a.pts} pts</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </MotiView>
          );
        })}

        {/* Loyalty Progress */}
        <View style={styles.loyaltyBox}>
          <View style={styles.loyaltyHeaderRow}>
            <Text style={styles.loyaltyTitle}>Loyalty Progress</Text>
            <Text style={styles.loyaltyChip}>Silver tier</Text>
          </View>
          <Text style={styles.loyaltySub}>
            Current Points: 247 • Next reward unlocks at 300 pts
          </Text>
          <View style={styles.progressBarOuter}>
            <View style={[styles.progressBarInner, { width: "82%" }]} />
          </View>
          <View style={styles.loyaltyFootnoteRow}>
            <Ionicons name="gift-outline" size={16} color="#E46C1E" />
            <Text style={styles.loyaltyFootnote}>
              Add one more eco add-on to get a free scenic stop on your next
              trip.
            </Text>
          </View>
        </View>
        <View style={styles.loyaltyExplainCard}>
          <View style={styles.loyaltyExplainHeader}>
            <Ionicons name="trophy-outline" size={18} color="#E46C1E" />
            <Text style={styles.loyaltyExplainTitle}>
              What are loyalty points?
            </Text>
          </View>
          <Text style={styles.loyaltyExplainText}>
            Earn Devbhoomi points every time you choose eco add-ons, travel
            during non-peak hours, or complete feedback after a ride. Redeem
            them for discounted journeys, free upgrades, and exclusive local
            experiences.
          </Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View
        style={[
          styles.footerContainer,
          { paddingBottom: Math.max(insets.bottom, 14) },
        ]}
      >
        <View style={styles.footerRow}>
          <Text style={styles.footerAmount}>
            +₹{totalCost}
            {"  "}
            <Text style={styles.footerPoints}>
              +{totalPoints} loyalty points
            </Text>
          </Text>
          <Text style={styles.footerSummary}>
            {selectedAddons.length} enhancement
            {selectedAddons.length !== 1 && "s"}
          </Text>
        </View>
        <ContinueBtn />
        <Text style={styles.footerNote}>
          Enhancements can be modified up to 1 hour before pickup
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fffafc", paddingHorizontal: 24 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
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
  headerContent: { flex: 1, marginLeft: 12 },
  headerTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 22,
    color: "#1b140f",
  },
  headerSub: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "#6a5b52",
    marginTop: 4,
    lineHeight: 18,
  },
  pointsBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff4eb",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#f2d1b8",
  },
  pointsText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#E46C1E",
    marginLeft: 6,
  },

  loyaltyExplainCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#f3e5d7",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
  },
  loyaltyExplainHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  loyaltyExplainTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    color: "#2d1f15",
  },
  loyaltyExplainText: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    lineHeight: 20,
    color: "#5d4d42",
  },

  journeyBox: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e3ecff",
    shadowColor: "#1f3b72",
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  journeyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  journeyLabel: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#1b140f",
  },
  journeyTag: {
    backgroundColor: "#edf1ff",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  journeyTagText: {
    fontSize: 12,
    color: "#3a59b7",
    fontFamily: "Poppins-Medium",
  },
  journeyDetails: {
    marginTop: 16,
  },
  journeyText: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "#5d4d42",
    lineHeight: 20,
    marginTop: 10,
  },
  journeyTextFirst: { marginTop: 0 },

  sectionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 17,
    color: "#1b140f",
    marginBottom: 12,
  },

  impactGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    marginBottom: 20,
  },
  impactCard: {
    flex: 1,
    minWidth: (width - 48 - 14) / 2,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f4e4d8",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
  },
  impactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f1e9",
  },
  impactLabel: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#3a2b22",
    marginTop: 12,
  },
  impactValue: {
    fontFamily: "Poppins-Medium",
    fontSize: 13,
    color: "#7a4a1a",
    marginTop: 4,
  },

  addonCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#f3e5d7",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 5,
  },
  addonCardSelected: {
    borderColor: "#E46C1E",
    backgroundColor: "#fff8f0",
    shadowColor: "#E46C1E",
    shadowOpacity: 0.2,
  },
  addonHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  addonIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff4eb",
    borderWidth: 1,
    borderColor: "#f2d1b8",
  },
  addonInfo: { flex: 1, marginLeft: 14 },
  addonTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  addonTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#1b140f",
  },
  addonDesc: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "#6a5b52",
    marginTop: 6,
    lineHeight: 20,
  },
  addonSelectIcon: { marginLeft: 12 },
  tagBadge: {
    marginLeft: 10,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  tagText: { fontSize: 11, color: "#fff", fontFamily: "Poppins-Medium" },
  popularTag: { backgroundColor: "#f78c1e" },
  newTag: { backgroundColor: "#1E90FF" },
  freeTag: { backgroundColor: "#4CAF50" },
  specialTag: { backgroundColor: "#8751e8" },

  addonMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 10,
  },
  oldPrice: {
    fontSize: 12,
    color: "#a7a1a1",
    textDecorationLine: "line-through",
    fontFamily: "Poppins-Medium",
  },
  price: {
    fontSize: 16,
    color: "#1b140f",
    fontFamily: "Poppins-SemiBold",
  },
  pointsPill: {
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
  pointsPillText: {
    fontSize: 12,
    color: "#E46C1E",
    fontFamily: "Poppins-Medium",
  },

  loyaltyBox: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginTop: 26,
    borderWidth: 1,
    borderColor: "#f3e5d7",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 5,
  },
  loyaltyHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  loyaltyTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#1b140f",
  },
  loyaltyChip: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#E46C1E",
    backgroundColor: "#fff4eb",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#f2d1b8",
  },
  loyaltySub: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "#5d4d42",
    marginTop: 8,
  },
  progressBarOuter: {
    backgroundColor: "#f3e5d7",
    borderRadius: 6,
    height: 10,
    marginTop: 10,
    overflow: "hidden",
  },
  progressBarInner: {
    height: 10,
    backgroundColor: "#E46C1E",
    borderRadius: 6,
  },
  loyaltyFootnoteRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginTop: 12,
  },
  loyaltyFootnote: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#7a4a1a",
    flex: 1,
    lineHeight: 18,
  },

  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#f2dfd2",
    alignItems: "center",
    paddingTop: 12,
    paddingHorizontal: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width - 48,
    alignItems: "center",
  },
  footerAmount: {
    fontFamily: "Poppins-SemiBold",
    color: "#1b140f",
    fontSize: 16,
  },
  footerPoints: { color: "#E46C1E" },
  footerSummary: {
    fontFamily: "Poppins-Medium",
    color: "#6a5b52",
    fontSize: 13,
  },
  footerAction: {
    width: width - 48,
    borderRadius: 20,
    marginTop: 12,
  },
  footerBtn: {
    width: width - 48,
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: "center",
  },
  footerText: {
    color: "#fffdf7",
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
  footerNote: {
    fontSize: 12,
    color: "#8a7a70",
    fontFamily: "Poppins-Regular",
    marginTop: 10,
    textAlign: "center",
  },
});
