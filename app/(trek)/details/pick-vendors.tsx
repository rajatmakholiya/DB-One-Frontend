import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const filters = ["Best Rated", "Budget-Friendly", "Family-Focused"];

const vendors = [
  {
    verified: true,
    name: "Himalayan Treks with Ramesh Ji",
    experience: "20 yrs exp",
    rating: 4.8,
    treks: "150+ Treks",
    tags: ["Family-friendly", "Youth Adventure", "Religious Yatra"],
    price: "₹5,000",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&q=80&w=600",
  },
  {
    verified: false,
    name: "Youth Adventure Group",
    experience: "5 yrs exp",
    rating: 4.5,
    treks: "80+ Treks",
    tags: ["College-friendly", "Adventure"],
    price: "₹3,800",
    image:
      "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&q=80&w=600",
  },
  {
    verified: true,
    name: "Cultural Expeditions with Meera",
    experience: "15 yrs exp",
    rating: 4.9,
    treks: "120+ Treks",
    tags: ["Cultural Tours", "Historical Sites"],
    price: "₹4,500",
    image:
      "https://images.unsplash.com/photo-1605559424843-9e4f98a2b4ac?auto=format&q=80&w=600",
  },
  {
    verified: true,
    name: "Eco Treks with Deepak",
    experience: "10 yrs exp",
    rating: 4.7,
    treks: "100+ Treks",
    tags: ["Eco Travel", "Nature Retreat"],
    price: "₹4,200",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&q=80&w=600",
  },
];

export default function PickTrekPartnerScreen() {
  const [activeFilter, setActiveFilter] = useState("Best Rated");
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={["#030A12", "#041725"]}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color="#E8F7FF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pick Your Trek Partner</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterBar}
      >
        {filters.map((f) => {
          const focused = f === activeFilter;
          return (
            <TouchableOpacity key={f} onPress={() => setActiveFilter(f)}>
              <MotiView
                animate={{
                  backgroundColor: focused
                    ? "rgba(73,164,219,0.25)"
                    : "rgba(20,40,55,0.5)",
                  borderColor: focused ? "#4CC2FF" : "rgba(92,139,167,0.4)",
                }}
                transition={{ type: "timing", duration: 200 }}
                style={styles.filterChip}
              >
                <Text
                  style={[
                    styles.filterText,
                    focused && styles.filterTextActive,
                  ]}
                >
                  {f}
                </Text>
              </MotiView>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Vendor Cards */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {vendors.map((v, index) => (
          <MotiView
            key={v.name}
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 100 + index * 80 }}
            style={styles.vendorCard}
          >
            <View style={styles.cardHeader}>
              {v.verified && (
                <View style={styles.verifiedRow}>
                  <Ionicons
                    name="checkmark-circle"
                    size={14}
                    color="#70D29C"
                    style={{ marginRight: 4 }}
                  />
                  <Text style={styles.verifiedText}>
                    Verified Kumaoni Guide
                  </Text>
                </View>
              )}
              <Image source={{ uri: v.image }} style={styles.avatar} />
            </View>

            <Text style={styles.vendorName}>{v.name}</Text>
            <View style={styles.metaRow}>
              <Text style={styles.metaText}>{v.experience}</Text>
              <Text style={styles.dot}>•</Text>
              <Ionicons name="star" size={13} color="#FFD166" />
              <Text style={styles.metaText}>{v.rating}</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.metaText}>{v.treks}</Text>
            </View>

            <View style={styles.tagRow}>
              {v.tags.map((t) => (
                <View key={t} style={styles.tagChip}>
                  <Text style={styles.tagText}>{t}</Text>
                </View>
              ))}
            </View>

            <View style={styles.footerRow}>
              <Text style={styles.priceText}>From {v.price} / person</Text>
              <TouchableOpacity
                style={styles.viewProfileBtn}
                onPress={() => router.push("/(trek)/details/vendor-profile")}
              >
                <Text style={styles.viewProfileText}>View Profile</Text>
              </TouchableOpacity>
            </View>
          </MotiView>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#020B12" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  headerTitle: {
    color: "#EEF7FF",
    fontSize: 18,
    fontWeight: "700",
  },
  filterBar: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 14,
  },
  filterChip: {
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    height: 35,
  },
  filterText: {
    color: "#7EA4BA",
    fontWeight: "600",
    fontSize: 13,
  },
  filterTextActive: {
    color: "#D9F1FF",
  },
  vendorCard: {
    backgroundColor: "rgba(15,38,56,0.7)",
    borderWidth: 1,
    borderColor: "rgba(76,151,189,0.22)",
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 18,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  verifiedRow: { flexDirection: "row", alignItems: "center" },
  verifiedText: {
    color: "#70D29C",
    fontSize: 12,
    fontWeight: "600",
  },
  avatar: { width: 52, height: 52, borderRadius: 26 },
  vendorName: {
    color: "#EEF7FF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  metaRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  metaText: { color: "#7EA4BA", fontSize: 12 },
  dot: { color: "#7EA4BA", marginHorizontal: 6 },
  tagRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: 10 },
  tagChip: {
    backgroundColor: "rgba(73,164,219,0.22)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: { color: "#D9F1FF", fontSize: 11, fontWeight: "500" },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  priceText: {
    color: "#D9F1FF",
    fontWeight: "600",
    fontSize: 13,
  },
  viewProfileBtn: {
    backgroundColor: "#E8F7FF",
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  viewProfileText: {
    color: "#041725",
    fontWeight: "700",
    fontSize: 13,
  },
});
