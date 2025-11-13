import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MotiView } from "moti";
import React, { useMemo, useState } from "react";
import {
  Dimensions,
  FlatList,
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

const { width, height } = Dimensions.get("window");

const COLORS = {
  primaryBg: "#FFFFFF",
  componentBg: "#F9F9F9",
  accent: "#FF6B6B",
  darkText: "#557B83",
  lightText: "#FFFFFF",
  cardBorder: "#EDEDED",
};

const mockBike = {
  id: "b1",
  title: "Royal Enfield Classic 350",
  location: "Tapovan, Rishikesh",
  coordinates: {
    latitude: 30.1257,
    longitude: 78.3247,
  },
  images: [
    "https://images.unsplash.com/photo-1620664752533-46c8c5c39178?auto=format&q=80&w=1080",
    "https://images.unsplash.com/photo-1599021439358-86002b21a97a?auto=format&q=80&w=1080",
    "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&q=80&w=1080",
  ],
  pricePerDay: 1800,
  pricePerHour: 250,
  rating: 4.8,
  reviewCount: 89,
  description:
    "The quintessential Royal Enfield, built for the mountains. This Classic 350 is in perfect condition, serviced regularly, and ready for your Himalayan adventure. Helmet and basic gear included.",
  specs: [
    { icon: "speedometer-outline", label: "349cc Engine" },
    { icon: "color-fill-outline", label: "13L Tank" },
    { icon: "analytics-outline", label: "40 km/l Mileage" },
    { icon: "settings-outline", label: "Dual-channel ABS" },
  ],
  provider: {
    name: "Ganga Bike Rentals",
    avatarUrl: "https://randomuser.me/api/portraits/men/34.jpg",
  },
};

const reviews = [
  {
    name: "Aarav Gupta",
    time: "3 days ago",
    comment:
      "Amazing bike, great condition. The provider was very helpful and gave us a map of local routes. 10/10 would rent again.",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
];

export default function BikeDetailScreen() {
  const [activeTab, setActiveTab] = useState("Details");
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const bike = mockBike;
  const tabs = useMemo(() => ["Details", "Specs", "Reviews"], []);

  const summaryStats = [
    { label: "Rating", value: `${bike.rating} (${bike.reviewCount})` },
    { label: "Provider", value: bike.provider.name },
    { label: "Location", value: bike.location.split(",")[0] },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 120 },
        ]}
      >
        <FlatList
          data={bike.images}
          keyExtractor={(_, i) => i.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <ImageBackground source={{ uri: item }} style={styles.carouselImage}>
              <LinearGradient
                colors={["rgba(0,0,0,0.6)", "transparent", "rgba(0,0,0,0.1)"]}
                style={styles.imageGradient}
              />
            </ImageBackground>
          )}
        />
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
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{bike.title}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={16} color={COLORS.accent} />
            <Text style={styles.locationText}>{bike.location}</Text>
          </View>
        </View>
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
                      ? COLORS.primaryBg
                      : "transparent",
                    borderColor: focused ? COLORS.accent : "transparent",
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

        {activeTab === "Details" && (
          <MotiView
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            style={styles.tabContent}
          >
            <Text style={styles.sectionHeading}>About this bike</Text>
            <Text style={styles.description}>{bike.description}</Text>
            <Text style={styles.sectionHeading}>Rental Provider</Text>
            <View style={styles.hostCard}>
              <Image
                source={{ uri: bike.provider.avatarUrl }}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.hostName}>{bike.provider.name}</Text>
                <Text style={styles.hostBio}>
                  Verified Partner since 2018
                </Text>
              </View>
            </View>
            <Text style={styles.sectionHeading}>Pickup Location</Text>
            <View style={styles.mapCard}>
              <MapView
                style={styles.mapMini}
                region={{
                  ...bike.coordinates,
                  latitudeDelta: 0.02,
                  longitudeDelta: 0.02,
                }}
                pointerEvents="none"
              >
                <Marker coordinate={bike.coordinates} title={bike.title} />
              </MapView>
            </View>
          </MotiView>
        )}
        {activeTab === "Specs" && (
          <MotiView
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            style={styles.tabContent}
          >
            <Text style={styles.sectionHeading}>Key Specifications</Text>
            <View style={styles.amenitiesGrid}>
              {bike.specs.map((item) => (
                <View key={item.label} style={styles.amenityChip}>
                  <Ionicons
                    name={item.icon as any}
                    size={18}
                    color={COLORS.accent}
                  />
                  <Text style={styles.amenityText}>{item.label}</Text>
                </View>
              ))}
            </View>
          </MotiView>
        )}
        {activeTab === "Reviews" && (
          <MotiView
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            style={styles.tabContent}
          >
            <Text style={styles.sectionHeading}>
              What riders are saying
            </Text>
            {reviews.map((rev) => (
              <View key={rev.name} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Image
                    source={{ uri: rev.avatar }}
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
          </MotiView>
        )}
      </ScrollView>
      <View style={[styles.headerBar, { top: insets.top + 12 }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={20} color={COLORS.lightText} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="share-social-outline" size={18} color={COLORS.lightText} />
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.bottomContainer,
          { paddingBottom: insets.bottom + 10 },
        ]}
      >
        <View style={styles.priceColumn}>
          <Text style={styles.priceLabel}>Price per day</Text>
          <Text style={styles.priceValue}>
            ₹{bike.pricePerDay.toLocaleString("en-IN")}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.bottomButton}
          onPress={() => router.push("/(bikes)/explore/booking")} // CORRECTED PATH
        >
          <Text style={styles.bottomButtonText}>Book Now</Text>
          <Ionicons name="arrow-forward" size={18} color={COLORS.lightText} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.primaryBg },
  scrollContent: { paddingTop: 0 },
  headerBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  carouselImage: {
    width,
    height: height * 0.4,
  },
  imageGradient: {
    width: "100%",
    height: "50%",
    position: "absolute",
    top: 0,
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    backgroundColor: COLORS.primaryBg,
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins-SemiBold",
    color: COLORS.darkText,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  locationText: {
    fontSize: 15,
    fontFamily: "Poppins-Medium",
    color: COLORS.darkText,
  },
  summaryCard: {
    marginHorizontal: 20,
    backgroundColor: COLORS.primaryBg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 20,
    flexDirection: "row",
    paddingHorizontal: 18,
    paddingVertical: 18,
    marginTop: -40,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },
  summaryItem: { flex: 1, alignItems: "center" },
  summaryLabel: {
    color: COLORS.darkText,
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    marginBottom: 6,
  },
  summaryValue: {
    color: COLORS.darkText,
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
  divider: {
    width: 1,
    height: 36,
    backgroundColor: COLORS.cardBorder,
    position: "absolute",
    right: 0,
    top: 2,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 16,
    backgroundColor: COLORS.componentBg,
    borderRadius: 999,
    padding: 6,
  },
  tabPill: {
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: "transparent", // Default to transparent
  },
  tabLabel: {
    color: COLORS.darkText,
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
  tabLabelActive: { color: COLORS.accent, fontFamily: "Poppins-SemiBold" },
  tabContent: {
    paddingHorizontal: 20,
    marginBottom: 24,
    backgroundColor: COLORS.primaryBg,
  },
  sectionHeading: {
    color: COLORS.darkText,
    fontSize: 17,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 12,
    marginTop: 16,
  },
  description: {
    color: COLORS.darkText,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    lineHeight: 22,
  },
  hostCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: COLORS.componentBg,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  hostName: {
    color: COLORS.darkText,
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
  },
  hostBio: { color: COLORS.darkText, fontSize: 13, marginTop: 2 },
  mapCard: {
    borderRadius: 18,
    overflow: "hidden",
    height: 180,
  },
  mapMini: { width: "100%", height: "100%" },
  amenitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  amenityChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: COLORS.componentBg,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: "48%",
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  amenityText: {
    color: COLORS.darkText,
    fontFamily: "Poppins-Medium",
    fontSize: 13,
  },
  reviewCard: {
    backgroundColor: COLORS.componentBg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 18,
    marginBottom: 16,
  },
  reviewHeader: { flexDirection: "row", alignItems: "center", gap: 12 },
  reviewer: {
    color: COLORS.darkText,
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
  },
  reviewTime: { color: COLORS.darkText, fontSize: 12 },
  reviewComment: {
    color: COLORS.darkText,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 12,
    fontFamily: "Poppins-Regular",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.primaryBg,
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: COLORS.cardBorder,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 8,
  },
  priceColumn: {
    flex: 1,
  },
  priceLabel: {
    color: COLORS.darkText,
    fontSize: 13,
    fontFamily: "Poppins-Regular",
  },
  priceValue: {
    color: COLORS.darkText,
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
  },
  bottomButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.accent,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 32,
    gap: 10,
    shadowColor: COLORS.accent,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  bottomButtonText: {
    color: COLORS.lightText,
    fontSize: 15,
    fontFamily: "Poppins-SemiBold",
  },
});