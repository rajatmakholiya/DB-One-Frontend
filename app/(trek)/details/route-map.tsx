import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function RouteMapScreen() {
  const router = useRouter();

  const routePoints = [
    { latitude: 30.0668, longitude: 79.0193, title: "Munsiyari Base Camp" },
    { latitude: 30.1501, longitude: 79.0458, title: "Milam Village" },
    { latitude: 30.295, longitude: 79.06, title: "Ralam Glacier" },
    { latitude: 30.4, longitude: 79.1, title: "Nanda Devi Viewpoint" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={["#030A12", "#041725"]}
        style={StyleSheet.absoluteFill}
      />

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 30.0668,
          longitude: 79.0193,
          latitudeDelta: 0.8,
          longitudeDelta: 0.8,
        }}
      >
        <Polyline
          coordinates={routePoints}
          strokeColor="#4CC2FF"
          strokeWidth={4}
        />
        {routePoints.map((point, index) => (
          <Marker
            key={index}
            coordinate={point}
            title={point.title}
            description={`Checkpoint ${index + 1}`}
          />
        ))}
      </MapView>

      {/* Floating Info Card */}
      <View style={styles.infoCard}>
        <Text style={styles.title}>Kumaon Valley Trek Route</Text>
        <Text style={styles.subtitle}>
          4 Major Checkpoints · Approx. 42 km · Moderate Difficulty
        </Text>
      </View>

      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}
        activeOpacity={0.85}
      >
        <Ionicons name="chevron-back" size={22} color="#E8F7FF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#020B12" },
  map: {
    width,
    height,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(8,23,35,0.7)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  infoCard: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: "rgba(8,23,35,0.85)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(76,151,189,0.25)",
  },
  title: {
    color: "#E8F7FF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    color: "#9AC1D6",
    fontSize: 13,
    lineHeight: 18,
  },
});
