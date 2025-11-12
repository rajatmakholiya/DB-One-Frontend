import { useRouter } from "expo-router";
import { MotiText, MotiView } from "moti";
import React, { useEffect } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

const { height } = Dimensions.get("window");

export default function FindingRideScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(cabs)/booking/ride-result");
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <MotiView
        from={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "timing", duration: 600 }}
        style={styles.center}
      >
        {/* pulsing magnifier */}
        <MotiView
          from={{ scale: 0.95, opacity: 0.8 }}
          animate={{ scale: 1.05, opacity: 1 }}
          transition={{
            loop: true,
            type: "timing",
            duration: 1200,
          }}
          style={styles.magnifierWrap}
        >
          <Image
            source={require("../../assets/images/icons/magnifier.png")}
            style={styles.magnifier}
          />
        </MotiView>

        <MotiText
          from={{ opacity: 0, translateY: 8 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 400, delay: 400 }}
          style={styles.title}
        >
          Finding Your Perfect Ride
        </MotiText>

        <Text style={styles.subtitle}>Matching you with nearby drivers...</Text>

        <View style={{ marginTop: 16 }}>
          <Text style={styles.greenLine}>👥 AI clustering for best prices</Text>
          <Text style={styles.blueLine}>🛡️ Safety verified drivers</Text>
        </View>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "linear-gradient(180deg, #f9fffd 0%, #fffdf7 100%)",
    alignItems: "center",
    justifyContent: "center",
  },
  center: { alignItems: "center", justifyContent: "center" },
  magnifierWrap: { width: 80, height: 80, marginBottom: 20 },
  magnifier: { width: 80, height: 80, resizeMode: "contain" },
  title: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#111",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    fontFamily: "Poppins-Regular",
    marginTop: 6,
    textAlign: "center",
  },
  greenLine: {
    color: "#118a24",
    fontFamily: "Poppins-Medium",
    fontSize: 13,
    textAlign: "center",
  },
  blueLine: {
    color: "#0666d3",
    fontFamily: "Poppins-Medium",
    fontSize: 13,
    textAlign: "center",
    marginTop: 2,
  },
});
