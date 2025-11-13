import { Ionicons, MaterialIcons } from "@expo/vector-icons"; // Corrected import
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// --- Theme Colors from HTML ---
const COLORS = {
  primary: "#E2725B",
  backgroundLight: "#F5F5DC",
  textLight: "#181311",
  textSubtle: "#575757",
  white: "#FFFFFF",
};

// --- Preference Data ---
const preferences = [
  {
    id: "luxury",
    title: "Luxury Mountain Retreat",
    subtitle: "Unwind in the mountains",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4dXKUzOArjoaXu61m3Qpx20Asvg1fVoR8F9Hb95k_T1W99Dzl2G_n0BtwAUNXZLBZgVeGlVO16DO-TlEMK6qP1uHEY6YeF3NjEGkiJoMe1sXjH6C_1xIOxOghZPgNdYrKSlaEgs3CsIg-QZ13c0QipMfy3I0bPEOAVfSdGKEUsyhcNyqr5biCB6ozR-0CwlckmQoLF7QwR34V6Yk3Xb_wE8VfvWHNFaJkJQJtzKyb4aMnMZoKb8NdnumILR6OERaEcR5qPNWvt_A",
  },
  {
    id: "village",
    title: "Local Village Homestay",
    subtitle: "Live like a local",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDITfYxZna49Lb2Pc7EtsMvD4Vz6VGuPI5BiB6kEr7CxHDRBslwBYe_VZpLGJBfUvjtvQXMP1YO3t5ODlzcpDaawng4NtDg-Suw6HQR2AZlMZ46sD9zi0YGuO6Ix30tE4wh0o_gj-WpFMDjKiUir0Fc-O6OH8RbosTwNZSqisXou1XRZx220WEXgo2_XjaMzJPHBeAMAFrzbyFW7tU2ICGKqT8HU1Zv5FF-4Kgr8oqm8KzqA_m6--PYGvlH51NYqLnBX9ttNn4rAQY",
  },
  {
    id: "forest",
    title: "Forest-Side Cottage",
    subtitle: "Embrace nature's calm",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAu17UGFr72u0xHeL8R-V4kj1xR6eP1Pd1yr0QxCK21u3FKqDIUT_RZb6OZNPcykLNCfivC8vukfjOamrlvaBZ1QmUKosVHAC6cEOtrqVHfxpoT6GzbJXPzfal3wGNvYMMOvfZcMNSXKxe-NTah1J0Nheab9cWgA_E8KBeR9psfJwPQYWcXNw-S3LNTdV43QFcy0hYcbHLete2oeToC5W60cFB-WyDgmXWZC0guOExRYWAeIVvU8UIHXh9bgg7KxTx_AOT6XvIH1L0",
  },
  {
    id: "riverside",
    title: "Riverside Abode",
    subtitle: "Flow with the current",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVi4UnKhkdOR4AADikhjphQiVElJv4JFn9oCZ8jw1bCJxCKlSALUaHDfGvn8ImeaeLZH5oUgyrQ4Omz2Rf-DXv7GQhg4F41ggpMnb7ncpuUf0IdXae6u3xCQ6y1--FqtnWq5o0fTbWCNxjiUrPqCbjtahL5OnbTXUO2fyeMe9UiPNXSYhzll-1ouxoTLPv_4HV78-RRuA46tSu9RaW4_GFi3RHUt9ysJIv2AJ_zGpopx1V_rxs1xa3pMtkANVhNp8NdIbI6ZWo2qQ",
  },
  {
    id: "wellness",
    title: "Wellness Sanctuary",
    subtitle: "Rejuvenate your soul",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAP2ANhYYCr8OAapfx59n7Y35tV-P1yFkcEwRDArYvfVMNqGrlUUaBPL6canYODVjn90F0GM1-l5BHqDbbnd67UNrR2vbXPtGTIYndJLyxigYk5RCNphvFyJBYLmABUnLiZX-L_C31MVPWqvyP-hypVmc7wVuUuir5A_z18IGMstIqwumllZ80hNdGGCpZLAwGaTSNYmHta1qlI4s0HlwlzXTa4N1ERiFV2CBAKchV7usRqdSTGQBBm6HRipOyGj3BOtGEVAJNdDmM",
  },
  {
    id: "adventure",
    title: "Adventure Basecamp",
    subtitle: "Seek your thrill",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcJOQOEFemoXs3av6jZFNZOfkNR5XIG7ie3fCs563Qh5zHKdy1q5TQWPh-UeDNvNyRgEEo7wstGv2xcLaTLLKroAT1u42MCg8qkevq_NRjfT2gZiPH1uacDfV2hE2JbFq7ovgO9QPcOkPLrTp1l27SHzxDdUV44CH22-D29_W5CqRqDZrl4QQ972AUt-IYB8RRNdGFq0GwoFl17zNOiYjRMF0X8fETpFj2wfbeW_kxYailLpgXQob0SxbOZWcV7jO2BjDUV83s5pk",
  },
];

// --- Preference Card Component ---
const PreferenceCard = ({ item, isSelected, onSelect }) => {
  return (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "timing", duration: 300 }}
      style={styles.cardContainer}
    >
      <TouchableOpacity activeOpacity={0.9} onPress={onSelect}>
        <ImageBackground
          source={{ uri: item.image }}
          style={styles.cardImage}
          imageStyle={{ borderRadius: 16 }}
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.6)"]}
            style={styles.cardOverlay}
          />
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
          </View>

          {/* Selected State Overlay */}
          {isSelected && (
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={styles.selectedOverlay}
            >
              <Ionicons name="checkmark-circle" size={32} color={COLORS.white} />
            </MotiView>
          )}
        </ImageBackground>
      </TouchableOpacity>
    </MotiView>
  );
};

// --- Main Screen Component ---
export default function HomestayOnboardingScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (id: string) => {
    setSelected((current) => {
      const isAlreadySelected = current.includes(id);
      if (isAlreadySelected) {
        // De-select
        return current.filter((item) => item !== id);
      } else if (current.length < 4) {
        // Select
        return [...current, id];
      }
      // Max 4 selected, do nothing
      return current;
    });
  };

  const handleContinue = async () => {
    // Save that the user has seen this screen
    await AsyncStorage.setItem("hasSeenHomestayOnboarding", "true");
    
    // Navigate to the main browse page, passing preferences
    router.replace({
      pathname: "/(stays)/explore/browse", // Corrected path
      params: { preferences: selected.join(",") },
    });
  };
  
  const handleSkip = async () => {
    // Save that the user has seen this screen
    await AsyncStorage.setItem("hasSeenHomestayOnboarding", "true");
    
    // Navigate to the main browse page
    router.replace("/(stays)/explore/browse"); // Corrected path
  };

  const progress = (selected.length / 4) * 100;

  return (
    <View style={styles.container}>
      {/* Blurred Background */}
      <ImageBackground
        source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwnzLg45k3OBoQ1fLxtVREREL7JigywMa20wjBnaetOI0s_huMDG5wDmVIj5E2iiknpamTLBidY5jhR1Xac5Wm_Am3RScNnR125m6vUkUvYKMCTAGcwdAjQkaGnY5Zg2spz3YSXolg_ObqYzCYlAIO-P_E0ba1wGH4YPHoYWQbWg92_5BuydJ0JESVHDLSwU_bMXuLEgxvtvaJ-1ap0kdLtsDwqog_w-_jxNCCXb4LX50d0Oafyw4mJWfTSLXh-9-Y5fcuTeZzClY" }}
        style={StyleSheet.absoluteFill}
        blurRadius={12}
      />
      {/* Overlay */}
      <View
        style={[styles.absoluteFill, { backgroundColor: "rgba(245, 245, 220, 0.7)" }]}
      />

      <SafeAreaView style={styles.safeArea}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>

        {/* Header Text */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Choose Your Ideal Stay</Text>
          <Text style={styles.subtitle}>
            Select up to 4 experiences that call to you and we'll find the
            perfect homestay.
          </Text>
        </View>

        {/* Preferences Grid */}
        <FlatList
          data={preferences}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.gridContainer}
          renderItem={({ item }) => (
            <PreferenceCard
              item={item}
              isSelected={selected.includes(item.id)}
              onSelect={() => handleSelect(item.id)}
            />
          )}
        />

        {/* Skip Button */}
        <View style={styles.skipButtonContainer}>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipButtonText}>Skip for Now</Text>
          </TouchableOpacity>
        </View>

        {/* Floating Buttons */}
        <View style={styles.floatingButtonContainer}>
          <TouchableOpacity style={styles.musicButton}>
            {/* Corrected Icon */}
            <MaterialIcons name="music-off" size={24} color={COLORS.textLight} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.aiButton,
              // Disable button if no preferences are selected
              {
                backgroundColor:
                  selected.length > 0
                    ? COLORS.primary
                    : "#E0E0E0",
              },
            ]}
            onPress={handleContinue}
            disabled={selected.length === 0}
          >
            {/* Corrected Icon */}
            <MaterialIcons name="auto-awesome" size={24} color={COLORS.white} />
            <Text style={styles.aiButtonText}>
              Continue ({selected.length})
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
  safeArea: {
    flex: 1,
    paddingTop: 16,
  },
  progressContainer: {
    height: 8,
    backgroundColor: "rgba(226, 114, 91, 0.2)",
    borderRadius: 4,
    marginHorizontal: 16,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  headerContainer: {
    padding: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins-SemiBold", // Using app's font
    textAlign: "center",
    color: COLORS.textLight,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "Poppins-Regular", // Using app's font
    textAlign: "center",
    color: COLORS.textSubtle,
    maxWidth: 350,
    marginTop: 8,
  },
  gridContainer: {
    paddingHorizontal: 16,
  },
  cardContainer: {
    flex: 1,
    margin: 8,
    aspectRatio: 3 / 4,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardImage: {
    flex: 1,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 16,
  },
  cardTextContainer: {
    padding: 16,
    gap: 4,
  },
  cardTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    lineHeight: 20,
  },
  cardSubtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 12,
    fontFamily: "Poppins-Medium",
  },
  selectedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(226, 114, 91, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  skipButtonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  skipButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  skipButtonText: {
    color: COLORS.textLight,
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
  },
  floatingButtonContainer: {
    position: "absolute",
    bottom: 24,
    right: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  musicButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  aiButton: {
    height: 56,
    borderRadius: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 16,
    paddingRight: 24,
    gap: 8,
    backgroundColor: COLORS.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  aiButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: "Poppins-Bold",
  },
});

//