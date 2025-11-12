import { useRouter } from "expo-router";
import { MotiText, MotiView } from "moti";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");

export default function CreatingMagic() {
  const router = useRouter();

  useEffect(() => {
    // Simulate API setup (replace with real backend call)
    const timer = setTimeout(() => {
      router.replace("/(tabs)/home");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Glowing circle animation */}
      <MotiView
        from={{ opacity: 0.3, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1.1 }}
        transition={{
          loop: true,
          type: "timing",
          duration: 1200,
        }}
        style={styles.glow}
      />

      {/* Floating sparkle dots */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: -10 }}
        transition={{
          loop: true,
          type: "timing",
          duration: 1000,
          delay: 200,
        }}
        style={styles.sparkle}
      />

      <MotiText
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 800 }}
        style={styles.title}
      >
        Creating the Magic ✨
      </MotiText>

      <MotiText
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          loop: true,
          type: "timing",
          duration: 1200,
          delay: 500,
        }}
        style={styles.subtitle}
      >
        Personalizing your KumaonBazaar experience...
      </MotiText>

      {/* Loading pulse line */}
      <View style={styles.progressBarWrapper}>
        <MotiView
          from={{ width: 0 }}
          animate={{ width: width * 0.7 }}
          transition={{ type: "timing", duration: 2500 }}
          style={styles.progressBar}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f5f2",
    alignItems: "center",
    justifyContent: "center",
  },
  glow: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "#E46C1E20",
  },
  sparkle: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#E46C1E",
    top: "40%",
    left: "45%",
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#2b1b13",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: "#6d5c52",
    textAlign: "center",
  },
  progressBarWrapper: {
    height: 8,
    width: width * 0.7,
    backgroundColor: "#fff1e7",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 40,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#E46C1E",
    borderRadius: 10,
  },
});
