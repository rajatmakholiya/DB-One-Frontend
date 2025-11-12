import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import React, { useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const driver = {
  name: "Vinod Bisht",
  rating: 4.7,
  totalTrips: 2156,
  vehicle: "Force Traveller",
  plate: "UK 02 EF 9012",
  contact: "+911234567890",
};

const journeyStops = [
  { label: "Pickup", icon: "home-outline", time: "Now" },
  { label: "En Route", icon: "car-outline", time: "8 mins" },
  { label: "Drop-off", icon: "flag-outline", time: "25 mins" },
];

type JourneyStep = {
  label: string;
  icon: string;
  time: string;
};

const QuickAction = ({
  icon,
  color,
  label,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  label: string;
  onPress?: () => void;
}) => (
  <TouchableOpacity
    style={styles.quickBtn}
    onPress={onPress}
    activeOpacity={0.85}
  >
    <View style={[styles.quickIcon, { backgroundColor: color + "22" }]}>
      <Ionicons name={icon} size={18} color={color} />
    </View>
    <Text style={styles.quickText}>{label}</Text>
  </TouchableOpacity>
);

const JourneyTimeline = ({
  steps,
  progress,
}: {
  steps: JourneyStep[];
  progress: number;
}) => (
  <View>
    <View style={styles.timelineHeader}>
      <Text style={styles.sectionTitle}>Journey Progress</Text>
      <Text style={styles.sectionCaption}>ETA: 8 mins</Text>
    </View>
    <View style={styles.progressBarBg}>
      <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
    </View>
    <View style={styles.timelineRow}>
      {steps.map((step, index) => (
        <View key={step.label} style={styles.timelineItem}>
          <View style={styles.timelineIconWrap}>
            <Ionicons
              name={step.icon as keyof typeof Ionicons.glyphMap}
              size={16}
              color="#1E90FF"
            />
          </View>
          <Text style={styles.timelineLabel}>{step.label}</Text>
          <Text style={styles.timelineTime}>{step.time}</Text>
          {index < steps.length - 1 && <View style={styles.timelineDivider} />}
        </View>
      ))}
    </View>
  </View>
);

const DriverCard = ({ stage }: { stage: string }) => (
  <View style={styles.driverCard}>
    <View style={styles.driverHeader}>
      <View style={styles.driverAvatar}>
        <Ionicons name="person-outline" size={24} color="#51607a" />
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.driverTopRow}>
          <Text style={styles.driverName}>{driver.name}</Text>
          <View style={styles.driverBadge}>
            <Ionicons name="star" size={14} color="#f5a623" />
            <Text style={styles.driverBadgeText}>{driver.rating}</Text>
          </View>
        </View>
        <Text style={styles.driverMeta}>
          {driver.totalTrips} trips • {driver.vehicle}
        </Text>
        <Text style={styles.driverMeta}>{driver.plate}</Text>
        <Text style={styles.driverStatus}>{stage}</Text>
      </View>
    </View>
    <View style={styles.driverActions}>
      <TouchableOpacity
        style={styles.driverActionBtn}
        onPress={() => Linking.openURL(`tel:${driver.contact}`)}
        activeOpacity={0.85}
      >
        <Ionicons name="call-outline" size={16} color="#1b1b1b" />
        <Text style={styles.driverActionText}>Call</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.driverActionBtn} activeOpacity={0.85}>
        <Ionicons
          name="chatbubble-ellipses-outline"
          size={16}
          color="#1b1b1b"
        />
        <Text style={styles.driverActionText}>Chat</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.driverActionBtn} activeOpacity={0.85}>
        <Ionicons name="navigate-outline" size={16} color="#1b1b1b" />
        <Text style={styles.driverActionText}>Share</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const TripDetailsCard = () => (
  <View style={styles.tripCard}>
    <View style={styles.tripRow}>
      <Ionicons name="location-outline" size={16} color="#d45b12" />
      <View>
        <Text style={styles.tripLabel}>Pickup</Text>
        <Text style={styles.tripValue}>Bhimtal, Nainital</Text>
      </View>
    </View>
    <View style={styles.tripDivider} />
    <View style={styles.tripRow}>
      <Ionicons name="flag-outline" size={16} color="#1E90FF" />
      <View>
        <Text style={styles.tripLabel}>Destination</Text>
        <Text style={styles.tripValue}>Ranikhet Bus Stand</Text>
      </View>
    </View>
    <View style={styles.tripMetaRow}>
      <View style={styles.tripMetaPill}>
        <Ionicons name="time-outline" size={14} color="#d45b12" />
        <Text style={styles.tripMetaText}>Arrival in 8 mins</Text>
      </View>
      <View style={styles.tripMetaPill}>
        <Ionicons name="people-outline" size={14} color="#1E90FF" />
        <Text style={styles.tripMetaText}>1 passenger</Text>
      </View>
    </View>
  </View>
);

export default function RideTrackingScreen() {
  const insets = useSafeAreaInsets();

  const [progress, setProgress] = useState(0.3);
  const [rideStage, setRideStage] = useState("Driver on the way");
  const [driverLocation, setDriverLocation] = useState({
    latitude: 29.3478,
    longitude: 79.5603,
  });
  const [destination, setDestination] = useState({
    latitude: 29.6353,
    longitude: 79.425,
  });

  useEffect(() => {
    // Simulate progress and driver movement
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + 0.05, 1));
      setDriverLocation((loc) => ({
        ...loc,
        latitude: loc.latitude + 0.002,
        longitude: loc.longitude + 0.001,
      }));
    }, 4000);

    if (progress >= 1) {
      setRideStage("Ride Completed");
      clearInterval(interval);
    } else if (progress > 0.6) {
      setRideStage("Trip in Progress");
    } else if (progress > 0.2) {
      setRideStage("Driver Arrived");
    }

    return () => clearInterval(interval);
  }, [progress]);

  const headerStatus = useMemo(
    () => (rideStage === "Ride Completed" ? "Completed" : "En Route"),
    [rideStage]
  );

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#09102b" />
        </TouchableOpacity>
        <View style={styles.headerCopy}>
          <Text style={styles.headerTitle}>Track Your Driver</Text>
          <Text style={styles.headerSub}>{rideStage}</Text>
        </View>
        <View style={styles.headerPill}>
          <Ionicons name="shield-checkmark-outline" size={14} color="#118a24" />
          <Text style={styles.headerPillText}>{headerStatus}</Text>
        </View>
      </View>

      {/* Map Section */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: driverLocation.latitude,
          longitude: driverLocation.longitude,
          latitudeDelta: 0.25,
          longitudeDelta: 0.15,
        }}
      >
        <Marker
          coordinate={driverLocation}
          title="Your Driver"
          description="Heading towards destination"
        >
          <Ionicons name="car-outline" size={30} color="#1E90FF" />
        </Marker>

        <Marker coordinate={destination} title="Destination">
          <Ionicons name="flag-outline" size={30} color="#E46C1E" />
        </Marker>

        <Polyline
          coordinates={[driverLocation, destination]}
          strokeColor="#1E90FF"
          strokeWidth={4}
        />
      </MapView>

      {/* Ride Info Panel */}
      <MotiView
        from={{ opacity: 0, translateY: 32 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 480 }}
        style={styles.sheet}
      >
        <JourneyTimeline steps={journeyStops} progress={progress} />
        <DriverCard stage={rideStage} />
        <TripDetailsCard />
        <View style={styles.quickBlock}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickRow}>
            <QuickAction
              icon="warning-outline"
              color="#E46C1E"
              label="Emergency"
              onPress={() => {}}
            />
            <QuickAction
              icon="help-circle-outline"
              color="#1E90FF"
              label="Support"
            />
            <QuickAction
              icon="chatbox-ellipses-outline"
              color="#118a24"
              label="Feedback"
            />
          </View>
        </View>
      </MotiView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f7ff", marginBottom: 20 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  backBtn: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e7ff",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 3,
  },
  headerCopy: { flex: 1, marginHorizontal: 16 },
  headerTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    color: "#0f1c3f",
  },
  headerSub: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#5a6487",
    marginTop: 4,
  },
  headerPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#e7f6ee",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  headerPillText: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#118a24",
  },

  map: { width, height: height * 0.46 },

  sheet: {
    marginTop: -24,
    backgroundColor: "#fff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },

  sectionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    color: "#09102b",
  },
  sectionCaption: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#5a6487",
  },
  timelineHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressBarBg: {
    height: 10,
    borderRadius: 6,
    backgroundColor: "#edf0ff",
    marginTop: 12,
    marginBottom: 18,
    overflow: "hidden",
  },
  progressBarFill: {
    height: 10,
    borderRadius: 6,
    backgroundColor: "#1E90FF",
  },
  timelineRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
  },
  timelineItem: { flex: 1, alignItems: "center" },
  timelineIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#eef2ff",
    alignItems: "center",
    justifyContent: "center",
  },
  timelineLabel: {
    fontFamily: "Poppins-Medium",
    fontSize: 11,
    color: "#5a6487",
    marginTop: 6,
  },
  timelineTime: {
    fontFamily: "Poppins-Regular",
    fontSize: 11,
    color: "#8b92ab",
  },
  timelineDivider: {
    position: "absolute",
    top: 18,
    right: -width * 0.12,
    width: width * 0.24,
    height: 2,
    backgroundColor: "#e0e7ff",
  },

  driverCard: {
    marginTop: 24,
    backgroundColor: "#f8fbff",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#eef2ff",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
  },
  driverHeader: { flexDirection: "row", alignItems: "center" },
  driverAvatar: {
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: "#e0e7ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  driverTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  driverName: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#0f1c3f",
  },
  driverBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#fff3e0",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  driverBadgeText: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#b5690d",
  },
  driverMeta: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#5a6487",
    marginTop: 4,
  },
  driverStatus: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#1E90FF",
    marginTop: 6,
  },
  driverActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: "#e5e9ff",
  },
  driverActionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#eef2ff",
  },
  driverActionText: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#1b1b1b",
  },

  tripCard: {
    marginTop: 24,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#eef2ff",
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 4,
  },
  tripRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  tripLabel: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#5a6487",
  },
  tripValue: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#0f1c3f",
    marginTop: 2,
  },
  tripDivider: {
    height: 1,
    backgroundColor: "#eef2ff",
    marginVertical: 14,
  },
  tripMetaRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },
  tripMetaPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#f8fbff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#eef2ff",
  },
  tripMetaText: {
    fontFamily: "Poppins-Medium",
    fontSize: 11,
    color: "#5a6487",
  },

  quickBlock: { marginTop: 24, marginBottom: 200 },
  quickRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  quickBtn: {
    flex: 1,
    marginHorizontal: 4,
    alignItems: "center",
  },
  quickIcon: {
    width: 42,
    height: 42,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  quickText: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#09102b",
    marginTop: 8,
  },
});
