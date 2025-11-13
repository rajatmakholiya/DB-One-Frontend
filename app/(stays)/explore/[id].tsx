import { MaterialIcons } from "@expo/vector-icons"; // <-- FIX 1: Correct import
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

// --- New Theme from your HTML ---
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

// --- Mock Data for a Single Homestay ---
const mockHomestay = {
  id: "k1",
  title: "The Himalayan Escape",
  location: "Mukteshwar, Kumaon",
  coordinates: {
    latitude: 29.4739,
    longitude: 79.6483,
  },
  images: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAd16Bw-xZk1X9Juiu3m2qDTxnX_0cowV81YMfSc6t5hu0rhr6EsGjq35MJlxSAa6cnMv82bEiIeGIWYbQv2IBFIV16qUiZmd0ADlMJdeEj-yu6lThN4M-YMaAs4XoNYvpN_cff5FRfoOT0-yiNnzaT0LcBLGqEr4siJNyC10S3Nfd4ibiA4MBmokxt1cF4x6zqn7pnEPgKC3XSmYATx5H_WXBlvnvGnIu2uqa52Rh3yRp6EZ5vatTI4Etko2HWaMUncDCtKjrPf5U",
    "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&q=80&w=1080",
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&q=80&w=1080",
  ],
  pricePerNight: 4500,
  rating: 4.9,
  reviewCount: 134,
  description:
    "Perched on a hilltop overlooking the majestic Himalayan range, this homestay offers a perfect blend of luxury and nature. Wake up to the chirping of birds and enjoy locally sourced Kumaoni meals.",
  amenities: [
    { icon: "wifi", label: "Free WiFi" },
    { icon: "restaurant", label: "Local Meals" },
    { icon: "local-parking", label: "Free Parking" }, // <-- FIX 2: Correct icon name
    { icon: "pets", label: "Pet-Friendly" },
    { icon: "outdoor-grill", label: "Bonfire/BBQ" }, // <-- FIX 2: Correct icon name
    { icon: "spa", label: "Yoga Deck" }, // <-- FIX 2: Correct icon name (spa is a good replacement for self_care)
  ],
  host: {
    name: "Mehar Singh",
    avatarUrl: "https://randomuser.me/api/portraits/men/40.jpg",
  },
};

const reviews = [
  {
    name: "Rohan & Aditi",
    time: "2 weeks ago",
    comment:
      "Absolutely stunning views, photos don't do it justice. Mehar ji was a wonderful host. The food was 10/10. A must-visit!",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
  },
];
// --- End Mock Data ---

export default function HomestayDetailScreen() {
  const [activeTab, setActiveTab] = useState("Details");
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const homestay = mockHomestay;
  const tabs = useMemo(() => ["Details", "Amenities", "Reviews"], []);

  const summaryStats = [
    { label: "Rating", value: `${homestay.rating} (${homestay.reviewCount})` },
    { label: "Host", value: homestay.host.name },
    { label: "Location", value: homestay.location.split(",")[0] },
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
        {/* Header Image Carousel */}
        <FlatList
          data={homestay.images}
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

        {/* Main Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{homestay.title}</Text>
          <View style={styles.locationRow}>
            {/* FIX 2: Correct icon name */}
            <MaterialIcons name="location-on" size={16} color={COLORS.primary} />
            <Text style={styles.locationText}>{homestay.location}</Text>
          </View>
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
                      ? COLORS.componentBg
                      : "transparent",
                    borderColor: focused ? COLORS.primary : "transparent",
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

        {/* --- Tab Content --- */}

        {activeTab === "Details" && (
          <MotiView
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            style={styles.tabContent}
          >
            <Text style={styles.sectionHeading}>About this homestay</Text>
            <Text style={styles.description}>{homestay.description}</Text>

            <Text style={styles.sectionHeading}>Meet your host</Text>
            <View style={styles.hostCard}>
              <Image
                source={{ uri: homestay.host.avatarUrl }}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.hostName}>{homestay.host.name}</Text>
                <Text style={styles.hostBio}>
                  Host & Local Guide
                </Text>
              </View>
            </View>

            <Text style={styles.sectionHeading}>Where you'll be</Text>
            <View style={styles.mapCard}>
              <MapView
                style={styles.mapMini}
                region={{
                  ...homestay.coordinates,
                  latitudeDelta: 0.02,
                  longitudeDelta: 0.02,
                }}
                pointerEvents="none"
              >
                <Marker coordinate={homestay.coordinates} title={homestay.title} />
              </MapView>
            </View>
          </MotiView>
        )}

        {activeTab === "Amenities" && (
          <MotiView
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            style={styles.tabContent}
          >
            <Text style={styles.sectionHeading}>What this place offers</Text>
            <View style={styles.amenitiesGrid}>
              {homestay.amenities.map((item) => (
                <View key={item.label} style={styles.amenityChip}>
                  <MaterialIcons
                    name={item.icon as any}
                    size={18}
                    color={COLORS.primary}
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
              What guests are saying
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

      {/* Floating Header */}
      <View style={[styles.headerBar, { top: insets.top + 12 }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          {/* FIX 2: Correct icon name */}
          <MaterialIcons name="arrow-back" size={20} color={COLORS.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <MaterialIcons name="share" size={18} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* Floating 'Book Now' Button */}
      <View
        style={[
          styles.bottomContainer,
          { paddingBottom: insets.bottom + 10 },
        ]}
      >
        <View style={styles.priceColumn}>
          <Text style={styles.priceLabel}>Price per night</Text>
          <Text style={styles.priceValue}>
            ₹{homestay.pricePerNight.toLocaleString("en-IN")}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.bottomButton}
          onPress={() => router.push("/(stays)/explore/booking")}
        >
          <Text style={styles.bottomButtonText}>Book Now</Text>
          {/* FIX 2: Correct icon name */}
          <MaterialIcons name="arrow-forward" size={18} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// --- Styles (Unchanged) ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.backgroundLight },
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
    backgroundColor: COLORS.backgroundLight,
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins-SemiBold",
    color: COLORS.textPrimary,
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
    color: COLORS.textSubtle,
  },
  summaryCard: {
    marginHorizontal: 20,
    backgroundColor: COLORS.componentBg,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
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
    color: COLORS.textSubtle,
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    marginBottom: 6,
  },
  summaryValue: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
  divider: {
    width: 1,
    height: 36,
    backgroundColor: COLORS.borderColor,
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
    backgroundColor: "rgba(234, 234, 234, 0.4)",
    borderRadius: 999,
    padding: 6,
  },
  tabPill: {
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  tabLabel: {
    color: COLORS.textSubtle,
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
  tabLabelActive: { color: COLORS.primary, fontFamily: "Poppins-SemiBold" },
  tabContent: {
    paddingHorizontal: 20,
    marginBottom: 24,
    backgroundColor: COLORS.backgroundLight,
  },
  sectionHeading: {
    color: COLORS.textPrimary,
    fontSize: 17,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 12,
    marginTop: 16,
  },
  description: {
    color: COLORS.textSubtle,
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
    borderColor: COLORS.borderColor,
  },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  hostName: {
    color: COLORS.textPrimary,
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
  },
  hostBio: { color: COLORS.textSubtle, fontSize: 13, marginTop: 2 },
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
    borderColor: COLORS.borderColor,
  },
  amenityText: {
    color: COLORS.textPrimary,
    fontFamily: "Poppins-Medium",
    fontSize: 13,
  },
  reviewCard: {
    backgroundColor: COLORS.componentBg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    padding: 18,
    marginBottom: 16,
  },
  reviewHeader: { flexDirection: "row", alignItems: "center", gap: 12 },
  reviewer: {
    color: COLORS.textPrimary,
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
  },
  reviewTime: { color: COLORS.textSubtle, fontSize: 12 },
  reviewComment: {
    color: COLORS.textSubtle,
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
    backgroundColor: COLORS.componentBg,
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: COLORS.borderColor,
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
    color: COLORS.textSubtle,
    fontSize: 13,
    fontFamily: "Poppins-Regular",
  },
  priceValue: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
  },
  bottomButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 32,
    gap: 10,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  bottomButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontFamily: "Poppins-SemiBold",
  },
});