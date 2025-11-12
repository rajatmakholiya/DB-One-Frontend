import { Ionicons } from "@expo/vector-icons";
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
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function RideResultsScreen() {
  const insets = useSafeAreaInsets();
  const [selectedRide, setSelectedRide] = useState<string | null>(null);

  const rides = [
    {
      id: "r1",
      shared: true,
      sharedWith: ["Anjali S.", "Rohit M."],
      discount: "Save ₹35",
      eco: true,
      social: true,
      reduced: true,
      driver: "Rajesh Kumar",
      rating: 4.8,
      trips: 1247,
      price: 165,
      oldPrice: 180,
      carType: "Sedan",
      model: "Maruti Dzire",
      plate: "UK 07 AB 1234",
      agency: "Kumaon Travels",
      color: "White",
      features: ["AC", "WiFi", "Music"],
      payOptions: ["Full", "Half Deposit", "At Pickup"],
      currentLocation: "Nainital Market",
      away: "15 mins away",
    },
    {
      id: "r2",
      shared: false,
      driver: "Mohan Singh",
      sharedWith: ["Anjali S.", "Rohit M."],
      rating: 4.9,
      trips: 892,
      price: 240,
      carType: "SUV",
      model: "Mahindra Scorpio",
      plate: "UK 05 CD 5678",
      agency: "Hill Station Cabs",
      color: "Black",
      features: ["AC", "Snacks", "First Aid"],
      payOptions: ["Full", "Half Deposit"],
      currentLocation: "Tallital Bus Stand",
      away: "12 mins away",
    },
    {
      id: "r3",
      shared: false,
      driver: "Pooja Rawat",
      sharedWith: [],
      rating: 4.6,
      trips: 653,
      price: 210,
      carType: "Hatchback",
      model: "Hyundai i20",
      plate: "UK 04 EF 9087",
      agency: "Mountain Go Rides",
      color: "Sky Blue",
      features: ["AC", "Music"],
      payOptions: ["Full", "Pay Later"],
      currentLocation: "Mallital Taxi Point",
      away: "18 mins away",
    },
  ];

  const totalRides = rides.length;

  const FeatureIcon = ({ feature }: { feature: string }) => {
    const icons: Record<string, any> = {
      AC: "snow-outline",
      WiFi: "wifi-outline",
      Music: "musical-notes-outline",
      Snacks: "fast-food-outline",
      "First Aid": "medkit-outline",
    };
    return (
      <View style={styles.iconWrap}>
        <Ionicons
          name={icons[feature] || "ellipse-outline"}
          size={16}
          color="#d45b12"
        />
        <Text style={styles.iconLabel}>{feature}</Text>
      </View>
    );
  };

  const PayOption = ({ label }: { label: string }) => (
    <TouchableOpacity activeOpacity={0.8} style={styles.payOption}>
      <Text style={styles.payText}>{label}</Text>
    </TouchableOpacity>
  );

  const router = useRouter();

  const handleRideSelection = (r: any) => {
    setSelectedRide(r.id);
    setTimeout(() => {
      router.push("/(cabs)/booking/enhance-journey");
    }, 3000);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      {/* Header */}
      <MotiView
        from={{ opacity: 0, translateY: -10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 400 }}
        style={styles.headerRow}
      >
        <TouchableOpacity style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Available Rides</Text>
          <View style={styles.resultMeta}>
            <Ionicons name="car-sport-outline" size={14} color="#E46C1E" />
            <Text style={styles.resultMetaText}>
              {totalRides} {totalRides === 1 ? "option" : "options"} nearby
            </Text>
          </View>
        </View>
        <View style={styles.surgeBadge}>
          <Ionicons name="flash-outline" size={16} color="#fff" />
          <Text style={styles.surgeText}>SURGE</Text>
        </View>
      </MotiView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: Math.max(insets.bottom + 80, 120),
        }}
      >
        {rides.map((r, i) => (
          <MotiView
            key={r.id}
            from={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 400, delay: i * 120 }}
            style={[
              styles.rideCard,
              selectedRide === r.id && styles.rideCardSelected,
            ]}
          >
            {r.shared && (
              <View style={styles.sharedBanner}>
                <Text style={styles.sharedTitle}>
                  Shared with {r.sharedWith.join(", ")}
                </Text>
                <View style={styles.discountPill}>
                  <Text style={styles.discountPillText}>{r.discount}</Text>
                </View>
                <View style={styles.sharedTags}>
                  <Text style={[styles.sharedTag, { color: "#118a24" }]}>
                    🌱 Eco-friendly
                  </Text>
                  <Text style={[styles.sharedTag, { color: "#7053b6" }]}>
                    🤝 Meet new people
                  </Text>
                  <Text style={[styles.sharedTag, { color: "#c49b09" }]}>
                    💰 Reduced fare
                  </Text>
                </View>
              </View>
            )}

            {/* Driver Row */}
            <View style={styles.driverRow}>
              <Image
                source={require("../../assets/images/icons/driver.png")}
                style={styles.avatar}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.driverName}>{r.driver}</Text>
                <Text style={styles.driverAgency}>From {r.agency}</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={16} color="#f5a623" />
                  <Text style={styles.ratingText}>
                    {r.rating} • {r.trips} trips
                  </Text>
                </View>
                <View style={styles.locationChip}>
                  <Ionicons name="location-outline" size={14} color="#E46C1E" />
                  <Text style={styles.locationText}>
                    {r.currentLocation} • {r.away}
                  </Text>
                </View>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                {r.oldPrice && (
                  <Text style={styles.discountTextSmall}>8% off</Text>
                )}
                <Text style={styles.price}>₹{r.price}</Text>
                {r.oldPrice && (
                  <Text style={styles.oldPrice}>₹{r.oldPrice}</Text>
                )}
              </View>
            </View>

            {/* Car Info */}
            <View style={styles.carCard}>
              <View style={styles.carInfoRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.carTitle}>
                    {r.carType} • {r.model}
                  </Text>
                  <Text style={styles.carSub}>{r.plate}</Text>
                  <Text style={styles.carDetails}>
                    Color: {r.color} • Verified ride
                  </Text>
                </View>
                <View style={styles.carBadge}>
                  <Ionicons
                    name="car-sport-outline"
                    size={22}
                    color="#E46C1E"
                  />
                </View>
              </View>
            </View>

            {/* Features */}
            <View style={styles.featureRow}>
              {r.features.map((f, idx) => (
                <FeatureIcon key={idx} feature={f} />
              ))}
            </View>

            {/* Payment + Action */}
            <View style={styles.paySection}>
              <View style={styles.payRow}>
                {r.payOptions.map((p, idx) => (
                  <PayOption key={idx} label={p} />
                ))}
              </View>
              <TouchableOpacity
                activeOpacity={0.85}
                style={[
                  styles.selectBtn,
                  selectedRide === r.id && styles.selectBtnActive,
                ]}
                onPress={() => handleRideSelection(r.id)}
              >
                <Text style={styles.selectText}>
                  {selectedRide === r.id ? "Selected ✓" : "Select Ride"}
                </Text>
              </TouchableOpacity>
            </View>
          </MotiView>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fffd", paddingHorizontal: 24 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 8,
  },
  backBtn: { padding: 4, marginTop: 2 },
  headerCenter: { flex: 1, alignItems: "center" },
  headerTitle: {
    fontSize: 22,
    fontFamily: "Poppins-SemiBold",
    color: "#111",
  },
  resultMeta: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff4eb",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 6,
    gap: 6,
    marginBottom: 10,
  },
  resultMetaText: {
    fontSize: 13,
    color: "#7a4a1a",
    fontFamily: "Poppins-Medium",
  },
  surgeBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E46C1E",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    shadowColor: "#E46C1E",
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  surgeText: { color: "#fff", fontSize: 12, fontFamily: "Poppins-SemiBold" },

  rideCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    marginBottom: 22,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#f3f3f3",
  },
  rideCardSelected: {
    borderColor: "#E46C1E",
    shadowColor: "#E46C1E",
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },

  sharedBanner: {
    backgroundColor: "#f2fff5",
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
  sharedTitle: {
    fontFamily: "Poppins-SemiBold",
    color: "#111",
    fontSize: 14,
  },
  discountPill: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: "#fff4dc",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  discountPillText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 11,
    color: "#b17a00",
  },
  sharedTags: { flexDirection: "row", flexWrap: "wrap", marginTop: 6, gap: 8 },
  sharedTag: { fontSize: 12, fontFamily: "Poppins-Medium" },

  driverRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  avatar: { width: 52, height: 52, borderRadius: 26, marginRight: 12 },
  driverName: { fontFamily: "Poppins-SemiBold", fontSize: 17, color: "#111" },
  driverAgency: {
    fontFamily: "Poppins-Medium",
    color: "#777",
    fontSize: 13,
    marginTop: 2,
  },
  ratingRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  ratingText: { fontSize: 13, color: "#555", marginLeft: 6 },
  locationChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fef3e8",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 10,
    alignSelf: "flex-start",
    gap: 6,
  },
  locationText: {
    fontSize: 12,
    color: "#914514",
    fontFamily: "Poppins-Medium",
  },
  price: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    color: "#111",
    marginTop: 2,
  },
  oldPrice: {
    fontSize: 12,
    color: "#999",
    textDecorationLine: "line-through",
  },
  discountTextSmall: {
    fontSize: 11,
    color: "#444",
    backgroundColor: "#f5f5f5",
    borderRadius: 6,
    paddingHorizontal: 5,
    marginBottom: 3,
  },

  carCard: {
    backgroundColor: "#fdf6f0",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f9e2cf",
  },
  carInfoRow: { flexDirection: "row", alignItems: "center", gap: 14 },
  carTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    color: "#111",
  },
  carSub: {
    fontFamily: "Poppins-Medium",
    fontSize: 13,
    color: "#5a5a5a",
    marginTop: 2,
  },
  carDetails: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#7a7a7a",
    marginTop: 4,
  },
  carBadge: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#f1d5bf",
    alignItems: "center",
    justifyContent: "center",
  },

  featureRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    marginTop: 8,
  },
  iconWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff9f3",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  iconLabel: {
    fontFamily: "Poppins-Medium",
    fontSize: 13,
    marginLeft: 4,
    color: "#333",
  },

  paySection: {
    marginTop: 18,
    gap: 14,
  },
  payRow: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  payOption: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#f0dcca",
  },
  payText: {
    fontSize: 13,
    color: "#6a3f1f",
    fontFamily: "Poppins-Medium",
  },
  selectBtn: {
    backgroundColor: "#E46C1E",
    borderRadius: 18,
    paddingVertical: 14,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#E46C1E",
    shadowOpacity: 0.24,
    shadowRadius: 10,
  },
  selectBtnActive: {
    backgroundColor: "#d45b12",
    shadowColor: "#d45b12",
  },
  selectText: {
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
  },
});
