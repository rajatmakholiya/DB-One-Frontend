import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import React, { useMemo, useState } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function CustomizeRideScreen() {
  const insets = useSafeAreaInsets();

  const rides = [
    {
      id: "normal",
      name: "Normal Ride",
      price: 120,
      desc: "Standard comfort ride",
      icon: "car-outline",
    },
    {
      id: "flexi",
      name: "Flexi Ride",
      price: 95,
      desc: "Flexible timing, 20% cheaper",
      tag: "ECO",
      icon: "leaf-outline",
    },
    {
      id: "full",
      name: "Full Ride",
      price: 300,
      desc: "Complete vehicle for you",
      icon: "crown-outline",
    },
    {
      id: "package",
      name: "Package Tours",
      price: 500,
      desc: "Multi-day cultural tours",
      tag: "SOON",
      soon: true,
      icon: "bag-outline",
    },
  ];

  const addons = [
    {
      id: "tea",
      name: "Scenic Tea Stop",
      desc: "Traditional chai at viewpoint · 15 min",
      price: 25,
      icon: "cafe-outline",
    },
    {
      id: "photo",
      name: "Photography Stop",
      desc: "Pro photos at scenic spots · 30 min",
      price: 100,
      icon: "camera-outline",
    },
    {
      id: "culture",
      name: "Cultural Experience",
      desc: "Folk music & local guide",
      price: 150,
      icon: "musical-notes-outline",
    },
  ];

  const [selectedRide, setSelectedRide] = useState("normal");
  const [passengers, setPassengers] = useState(1);
  const [preferences, setPreferences] = useState<string[]>([]);
  const [pickupType, setPickupType] = useState("doorstep");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const router = useRouter();

  const togglePref = (id: string) =>
    setPreferences((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const toggleAddon = (id: string) =>
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const baseFare = useMemo(
    () => rides.find((r) => r.id === selectedRide)?.price ?? 0,
    [selectedRide]
  );
  const addonTotal = useMemo(
    () =>
      selectedAddons.reduce(
        (sum, id) => sum + (addons.find((a) => a.id === id)?.price ?? 0),
        0
      ),
    [selectedAddons]
  );
  const total = baseFare + addonTotal;

  const ContinueBtn = () => (
    <View
      style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}
    >
      <View style={styles.fareRow}>
        <Text style={styles.fareLabel}>Base fare:</Text>
        <Text style={styles.fareValue}>₹{baseFare}</Text>
      </View>
      <View style={styles.fareRow}>
        <Text style={styles.fareLabel}>Total:</Text>
        <Text style={[styles.fareValue, { fontWeight: "700" }]}>₹{total}</Text>
      </View>
      <Pressable
        onPress={() => router.navigate("/(cabs)/booking/finding-ride")}
        style={styles.findBtn}
      >
        <Text style={styles.findText}>Find Rides 🔍</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 160 }}
        showsVerticalScrollIndicator={false}
      >
        <MotiView
          from={{ opacity: 0, translateY: -8 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 350 }}
        >
          <Text style={styles.header}>Customize Your Journey</Text>
          <Text style={styles.subHeader}>
            From Bhimtal, Nainital to Kumaon University, Nainital
          </Text>
        </MotiView>

        {/* Choose ride */}
        <Text style={styles.sectionTitle}>🚗 Choose Your Ride</Text>
        {rides.map((r) => (
          <TouchableOpacity
            key={r.id}
            style={[
              styles.rideCard,
              selectedRide === r.id && styles.rideCardActive,
              r.soon && styles.rideCardDisabled,
            ]}
            disabled={r.soon}
            onPress={() => setSelectedRide(r.id)}
          >
            <View style={styles.rideLeft}>
              <Ionicons name={r.icon as any} size={20} color="#E46C1E" />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.rideTitle}>{r.name}</Text>
                <Text style={styles.rideDesc}>{r.desc}</Text>
              </View>
            </View>
            <View>
              {r.tag && (
                <Text style={[styles.tag, r.tag === "SOON" && styles.tagSoon]}>
                  {r.tag}
                </Text>
              )}
              <Text style={[styles.price, r.soon && { color: "#999" }]}>
                ₹{r.price}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Passengers */}
        <Text style={styles.sectionTitle}>👥 Passengers & Preferences</Text>
        <View style={styles.counterCard}>
          <Text style={styles.counterLabel}>Number of passengers</Text>
          <View style={styles.counterRow}>
            <TouchableOpacity
              onPress={() => setPassengers(Math.max(1, passengers - 1))}
              style={styles.counterBtn}
            >
              <Text style={styles.counterBtnText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.counterValue}>{passengers}</Text>
            <TouchableOpacity
              onPress={() => setPassengers(passengers + 1)}
              style={styles.counterBtn}
            >
              <Text style={styles.counterBtnText}>＋</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Preferences */}
        <View style={styles.prefList}>
          {[
            {
              id: "elderly",
              icon: "person-outline",
              label: "Elderly Friendly",
              desc: "Front seat, easy access",
            },
            {
              id: "students",
              icon: "school-outline",
              label: "Student Groups",
              desc: "Back seats, group discounts",
            },
            {
              id: "family",
              icon: "people-outline",
              label: "Family Bundle",
              desc: "Side-by-side seating",
            },
          ].map((p) => (
            <TouchableOpacity
              key={p.id}
              style={[
                styles.prefItem,
                preferences.includes(p.id) && styles.prefItemActive,
              ]}
              onPress={() => togglePref(p.id)}
            >
              <Ionicons
                name={p.icon as any}
                size={20}
                color={preferences.includes(p.id) ? "#E46C1E" : "#444"}
              />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.prefTitle}>{p.label}</Text>
                <Text style={styles.prefDesc}>{p.desc}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Pickup preference */}
        <Text style={styles.sectionTitle}>📍 Pickup Preference</Text>
        <View style={styles.pickupRow}>
          <TouchableOpacity
            style={[
              styles.pickupCard,
              pickupType === "doorstep" && styles.pickupCardActive,
            ]}
            onPress={() => setPickupType("doorstep")}
          >
            <Ionicons name="home-outline" size={22} color="#E46C1E" />
            <Text style={styles.pickupLabel}>Doorstep Pickup</Text>
            <Text style={styles.pickupDesc}>Direct from location</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.pickupCard,
              pickupType === "point" && styles.pickupCardActive,
            ]}
            onPress={() => setPickupType("point")}
          >
            <Ionicons name="pin-outline" size={22} color="#E46C1E" />
            <Text style={styles.pickupLabel}>Pickup Point</Text>
            <Text style={styles.pickupDesc}>Meet at landmark</Text>
          </TouchableOpacity>
        </View>

        {/* Enhance journey */}
        <Text style={styles.sectionTitle}>✨ Enhance Your Journey</Text>
        {addons.map((a) => (
          <TouchableOpacity
            key={a.id}
            style={[
              styles.addonCard,
              selectedAddons.includes(a.id) && styles.addonCardActive,
            ]}
            onPress={() => toggleAddon(a.id)}
          >
            <View style={styles.rideLeft}>
              <Ionicons name={a.icon as any} size={20} color="#E46C1E" />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.addonTitle}>{a.name}</Text>
                <Text style={styles.addonDesc}>{a.desc}</Text>
              </View>
            </View>
            <Text style={styles.price}>+₹{a.price}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ContinueBtn />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fffafc", paddingHorizontal: 24 },
  header: {
    fontSize: 24,
    fontFamily: "Poppins-SemiBold",
    color: "#111",
    marginTop: 12,
  },
  subHeader: {
    fontSize: 14,
    color: "#555",
    marginBottom: 18,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontFamily: "Poppins-SemiBold",
    color: "#222",
    marginTop: 24,
    marginBottom: 16,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#f2dfd2",
  },

  rideCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  rideCardActive: {
    borderWidth: 1.4,
    borderColor: "#E46C1E",
    backgroundColor: "#fff8f3",
  },
  rideCardDisabled: { opacity: 0.5 },
  rideLeft: { flexDirection: "row", alignItems: "center" },
  rideTitle: { fontFamily: "Poppins-SemiBold", color: "#111", fontSize: 16 },
  rideDesc: { fontSize: 13, color: "#777" },
  price: { fontFamily: "Poppins-SemiBold", color: "#111", fontSize: 16 },
  tag: {
    backgroundColor: "#EAF9EA",
    color: "#1b8f1b",
    fontSize: 10,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: "flex-end",
    marginBottom: 3,
  },
  tagSoon: { backgroundColor: "#f2f2f2", color: "#999" },

  counterCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  counterLabel: { fontFamily: "Poppins-Medium", fontSize: 14, color: "#333" },
  counterRow: { flexDirection: "row", alignItems: "center" },
  counterBtn: {
    backgroundColor: "#fff7ef",
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  counterBtnText: {
    fontSize: 18,
    color: "#E46C1E",
    fontFamily: "Poppins-SemiBold",
  },
  counterValue: {
    marginHorizontal: 12,
    fontSize: 15,
    color: "#111",
    fontFamily: "Poppins-SemiBold",
  },

  prefList: { marginTop: 8 },
  prefItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  prefItemActive: {
    borderWidth: 1.3,
    borderColor: "#E46C1E",
    backgroundColor: "#fff8f3",
  },
  prefTitle: { fontSize: 14, fontFamily: "Poppins-SemiBold", color: "#111" },
  prefDesc: { fontSize: 12, color: "#777" },

  pickupRow: { flexDirection: "row", justifyContent: "space-between" },
  pickupCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  pickupCardActive: {
    borderWidth: 1.4,
    borderColor: "#E46C1E",
    backgroundColor: "#fff8f3",
  },
  pickupLabel: {
    fontFamily: "Poppins-SemiBold",
    color: "#111",
    fontSize: 15,
    marginTop: 8,
  },
  pickupDesc: { fontSize: 12, color: "#777" },

  addonCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  addonCardActive: {
    borderWidth: 1.4,
    borderColor: "#E46C1E",
    backgroundColor: "#fff8f3",
  },
  addonTitle: { fontFamily: "Poppins-SemiBold", color: "#111", fontSize: 15 },
  addonDesc: { fontSize: 12, color: "#777" },

  fareRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width - 48,
  },
  fareLabel: { color: "#666", fontFamily: "Poppins-Medium", fontSize: 14 },
  fareValue: { color: "#111", fontFamily: "Poppins-SemiBold", fontSize: 16 },

  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 0,
    backgroundColor: "#fff",
    borderTopWidth: 0.5,
    borderColor: "#eee",
    paddingTop: 10,
    alignItems: "center",
  },
  findBtn: {
    width: width - 48,
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
    backgroundColor: "#E46C1E",
  },
  findText: { color: "#fff", fontFamily: "Poppins-SemiBold", fontSize: 16 },
});
