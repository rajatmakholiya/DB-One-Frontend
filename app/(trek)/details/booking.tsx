import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import React, { useMemo, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const trekImages = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&q=80&w=1080",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&q=80&w=1080",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&q=80&w=1080",
  "https://images.unsplash.com/photo-1499696010181-9c8268e1a967?auto=format&q=80&w=1080",
];

export default function TripDetailScreen() {
  const [activeTab, setActiveTab] = useState("Overview");
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const tabs = useMemo(() => ["Overview", "Inclusions", "Checklist"], []);
  const summaryStats = [
    { label: "Duration", value: "5 Days" },
    { label: "Difficulty", value: "Moderate" },
    { label: "Altitude", value: "4,500 m" },
  ];

  const inclusions = [
    "Accommodation in tents or homestays",
    "All meals (Breakfast, Lunch, Dinner)",
    "Certified Trek Leader and Guide",
    "First Aid and Medical Support",
    "Transportation from base camp (if included)",
  ];

  const checklist = [
    "Trekking Shoes & Woolen Socks",
    "Warm Jacket & Raincoat",
    "Water Bottle & Energy Bars",
    "Personal Medications",
    "Government ID Proof",
  ];

  const itinerary = [
    {
      title: "Arrival & Acclimatization",
      desc: "Day 1: Arrival in Kumaon, acclimatization walk",
      icon: "walk-outline",
    },
    {
      title: "Trek to Base Camp",
      desc: "Day 2: Trek to base camp, scenic views",
      icon: "trail-sign-outline",
    },
    {
      title: "Valley Exploration",
      desc: "Day 3: Explore Kumaon Valley, cultural immersion",
      icon: "leaf-outline",
    },
  ];

  const reviews = [
    {
      name: "Anya Sharma",
      time: "2 weeks ago",
      comment:
        "Absolutely breathtaking! The Kumaon Valley Trek exceeded all expectations. The guides were knowledgeable, and the cultural immersion was unforgettable.",
    },
    {
      name: "Rohan Verma",
      time: "1 month ago",
      comment:
        "A great experience overall. The trek was well-organized, and the scenery was beautiful. However, the weather was a bit unpredictable, so pack accordingly.",
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={["#030A12", "#041725"]}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 180 },
        ]}
      >
        {/* Header */}
        <View style={styles.headerBar}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={20} color="#E8F7FF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Kumaon Valley Trek</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Image Gallery */}
        <Text style={styles.sectionHeading}>Image Gallery</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.galleryStrip}
        >
          {trekImages.map((uri, index) => (
            <ImageBackground
              key={index}
              source={{ uri }}
              style={styles.galleryImage}
              imageStyle={{ borderRadius: 18 }}
            >
              <LinearGradient
                colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.6)"]}
                style={StyleSheet.absoluteFill}
              />
            </ImageBackground>
          ))}
        </ScrollView>

        {/* Summary Stats */}
        <View style={styles.summaryCard}>
          {summaryStats.map((item, index) => (
            <View key={item.label} style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>{item.label}</Text>
              <Text style={styles.summaryValue}>{item.value}</Text>
              {index !== summaryStats.length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          ))}
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {tabs.map((tab) => {
            const focused = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.85}
              >
                <MotiView
                  animate={{
                    backgroundColor: focused
                      ? "rgba(73, 164, 219, 0.22)"
                      : "transparent",
                    borderColor: focused ? "#4CC2FF" : "rgba(92,139,167,0.4)",
                  }}
                  transition={{ type: "timing", duration: 180 }}
                  style={styles.tabPill}
                >
                  <Text
                    style={[styles.tabLabel, focused && styles.tabLabelActive]}
                  >
                    {tab}
                  </Text>
                </MotiView>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Overview */}
        {activeTab === "Overview" && (
          <View style={styles.sectionSpacing}>
            <Text style={styles.sectionHeading}>Route Intelligence</Text>
            <MotiView
              from={{ opacity: 0, translateY: 18 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 100 }}
              style={styles.mapCard}
            >
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => router.push("/(trek)/details/route-map")}
              >
                <MapView
                  style={styles.mapMini}
                  region={{
                    latitude: 30.0668,
                    longitude: 79.0193,
                    latitudeDelta: 0.6,
                    longitudeDelta: 0.6,
                  }}
                  pointerEvents="none"
                >
                  <Marker
                    coordinate={{ latitude: 30.0668, longitude: 79.0193 }}
                    title="Munsiyari Base Camp"
                  />
                </MapView>
                <LinearGradient
                  colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.7)"]}
                  style={StyleSheet.absoluteFill}
                />
                <View style={styles.mapCaption}>
                  <Ionicons name="navigate" size={16} color="#4CC2FF" />
                  <Text style={styles.mapText}>
                    Tap to expand route intelligence
                  </Text>
                </View>
              </TouchableOpacity>
            </MotiView>

            <Text style={styles.sectionHeading}>Itinerary Highlights</Text>
            {itinerary.map((item, index) => (
              <MotiView
                key={item.title}
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 100 + index * 60 }}
                style={styles.itineraryCard}
              >
                <View style={styles.itineraryIconWrap}>
                  <Ionicons name={item.icon as any} size={18} color="#4CC2FF" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itineraryTitle}>{item.title}</Text>
                  <Text style={styles.itineraryDesc}>{item.desc}</Text>
                </View>
              </MotiView>
            ))}

            <Text style={styles.sectionHeading}>Trekkers say</Text>
            {reviews.map((rev, index) => (
              <View key={rev.name} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Image
                    source={{
                      uri:
                        index === 0
                          ? "https://randomuser.me/api/portraits/women/44.jpg"
                          : "https://randomuser.me/api/portraits/men/32.jpg",
                    }}
                    style={styles.avatar}
                  />
                  <View>
                    <Text style={styles.reviewer}>{rev.name}</Text>
                    <Text style={styles.reviewTime}>{rev.time}</Text>
                  </View>
                </View>
                <Text style={styles.reviewComment}>{rev.comment}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Inclusions */}
        {activeTab === "Inclusions" && (
          <View style={styles.sectionSpacing}>
            <Text style={styles.sectionHeading}>What we manage</Text>
            {inclusions.map((inc, index) => (
              <View key={inc} style={styles.inclusionCard}>
                <View style={styles.inclusionIcon}>
                  <Ionicons name="checkmark-circle" size={18} color="#70D29C" />
                </View>
                <Text style={styles.inclusionText}>{inc}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Checklist */}
        {activeTab === "Checklist" && (
          <View style={styles.sectionSpacing}>
            <Text style={styles.sectionHeading}>Personal checklist</Text>
            {checklist.map((item, index) => (
              <View key={item} style={styles.inclusionCard}>
                <View style={styles.inclusionIconSecondary}>
                  <Ionicons name="trail-sign" size={18} color="#4CC2FF" />
                </View>
                <Text style={styles.inclusionText}>{item}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Bottom Button */}
      <View
        style={[styles.bottomContainer, { paddingBottom: insets.bottom + 10 }]}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.bottomButton}
          onPress={() => router.push("/(trek)/details/booking")}
        >
          <Text style={styles.bottomButtonText}>
            Assign Guide & Reserve Campsite
          </Text>
          <Ionicons name="arrow-forward" size={18} color="#041725" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#020B12" },
  scrollContent: { paddingTop: 12 },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(232,247,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { color: "#EEF7FF", fontSize: 18, fontWeight: "700" },
  sectionHeading: {
    color: "#D9F1FF",
    fontSize: 17,
    fontWeight: "700",
    marginLeft: 20,
    marginBottom: 12,
  },
  galleryStrip: { paddingHorizontal: 20, gap: 12, marginBottom: 20 },
  galleryImage: {
    width: width * 0.7,
    height: width * 0.42,
    borderRadius: 18,
    overflow: "hidden",
  },
  summaryCard: {
    marginHorizontal: 20,
    backgroundColor: "rgba(15,38,56,0.72)",
    borderWidth: 1,
    borderColor: "rgba(76,151,189,0.25)",
    borderRadius: 20,
    flexDirection: "row",
    paddingHorizontal: 18,
    paddingVertical: 18,
    marginBottom: 24,
  },
  summaryItem: { flex: 1 },
  summaryLabel: {
    color: "#7EA4BA",
    fontSize: 11,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  summaryValue: { color: "#EEF7FF", fontSize: 15, fontWeight: "600" },
  divider: {
    width: 1,
    height: 36,
    backgroundColor: "rgba(94,143,168,0.18)",
    position: "absolute",
    right: 0,
    top: 10,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 24,
  },
  tabPill: {
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderWidth: 1,
  },
  tabLabel: { color: "#7EA4BA", fontSize: 13, fontWeight: "600" },
  tabLabelActive: { color: "#D9F1FF" },
  sectionSpacing: { marginBottom: 24 },
  mapCard: {
    borderRadius: 18,
    overflow: "hidden",
    marginHorizontal: 20,
    marginBottom: 20,
    height: 180,
  },
  mapMini: { width: "100%", height: "100%" },
  mapCaption: {
    position: "absolute",
    bottom: 14,
    left: 14,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(8,23,35,0.78)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  mapText: { color: "#CFE3F5", fontSize: 12, fontWeight: "600", marginLeft: 6 },
  itineraryCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    backgroundColor: "rgba(15,38,56,0.7)",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(76,151,189,0.24)",
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  itineraryIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(76,151,189,0.18)",
  },
  itineraryTitle: { color: "#EEF7FF", fontSize: 15, fontWeight: "600" },
  itineraryDesc: { color: "#9AC1D6", fontSize: 12, lineHeight: 18 },
  reviewCard: {
    backgroundColor: "rgba(15,38,56,0.7)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(76,151,189,0.22)",
    padding: 18,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  reviewHeader: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatar: { width: 42, height: 42, borderRadius: 21 },
  reviewer: { color: "#EEF7FF", fontWeight: "700", fontSize: 14 },
  reviewTime: { color: "#7EA4BA", fontSize: 12 },
  reviewComment: {
    color: "#CFE3F5",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
  },
  inclusionCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(15,38,56,0.7)",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(76,151,189,0.22)",
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  inclusionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(112,210,156,0.18)",
  },
  inclusionIconSecondary: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(76,194,255,0.16)",
  },
  inclusionText: { color: "#EEF7FF", fontSize: 13, flex: 1, lineHeight: 20 },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(3,10,17,0.96)",
    paddingHorizontal: 20,
    borderTopWidth: 0.5,
    borderColor: "rgba(255,255,255,0.1)",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  bottomButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8F7FF",
    borderRadius: 999,
    paddingVertical: 16,
    gap: 10,
  },
  bottomButtonText: { color: "#041725", fontSize: 15, fontWeight: "700" },
});
