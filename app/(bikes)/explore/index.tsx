import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import React from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const COLORS = {
  primaryBg: "#FFFFFF",
  componentBg: "#F9F9F9",
  accent: "#FF6B6B",
  darkText: "#557B83",
  lightText: "#FFFFFF",
  cardBorder: "#EDEDED",
  overlayGradientEnd: "rgba(0, 0, 0, 0.5)",
  overlayGradientStart: "rgba(0, 0, 0, 0.1)",
};

const popularLocations = [
  {
    name: "Rishikesh",
    image:
      "https://images.unsplash.com/photo-1593830883650-692b7c62b7e1?auto=format&q=80&w=800",
  },
  {
    name: "Dehradun",
    image:
      "https://images.unsplash.com/photo-1594787042571-318c4b22cb98?auto=format&q=80&w=800",
  },
  {
    name: "Nainital",
    image:
      "https://images.unsplash.com/photo-1571120108925-7e1e4b09d01a?auto=format&q=80&w=800",
  },
  {
    name: "Haridwar",
    image:
      "https://images.unsplash.com/photo-1605335198889-13833c823f66?auto=format&q=80&w=800",
  },
];

export default function SelectBikeLocationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const selectLocation = (locationName: string) => {
    router.push({
      pathname: "/(bikes)/explore/browse", // CORRECTED PATH
      params: { location: locationName },
    });
  };

  const renderLocationCard = ({ item }: { item: (typeof popularLocations)[0] }) => (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "timing", duration: 300 }}
      style={styles.cardContainer}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => selectLocation(item.name)}
      >
        <ImageBackground
          source={{ uri: item.image }}
          style={styles.cardImage}
          imageStyle={{ borderRadius: 18 }}
        >
          <LinearGradient
            colors={[COLORS.overlayGradientStart, COLORS.overlayGradientEnd]}
            style={styles.cardOverlay}
          />
          <Text style={styles.cardTitle}>{item.name}</Text>
        </ImageBackground>
      </TouchableOpacity>
    </MotiView>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.headerBar, { top: insets.top + 10 }]}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={20} color={COLORS.darkText} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={popularLocations}
        keyExtractor={(item) => item.name}
        renderItem={renderLocationCard}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 40 },
        ]}
        ListHeaderComponent={
          <>
            <View style={styles.headerContent}>
              <Text style={styles.title}>Where are you riding?</Text>
              <Text style={styles.subtitle}>
                Select a location to see available bikes
              </Text>
            </View>
            <View style={styles.searchContainer}>
              <View style={styles.searchBox}>
                <Ionicons name="search-outline" size={20} color={COLORS.darkText} />
                <TextInput
                  placeholder="Search for a city or area"
                  placeholderTextColor={COLORS.darkText}
                  style={styles.searchInput}
                />
              </View>
            </View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Popular Locations</Text>
            </View>
          </>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primaryBg,
  },
  headerBar: {
    position: "absolute",
    top: 0,
    left: 20,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.componentBg,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  scrollContent: {
    paddingTop: 80,
  },
  headerContent: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontFamily: "Poppins-SemiBold",
    color: COLORS.darkText,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: COLORS.darkText,
    marginTop: 8,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.componentBg,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  searchInput: {
    marginLeft: 12,
    flex: 1,
    fontSize: 15,
    color: COLORS.darkText,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    color: COLORS.darkText,
    fontSize: 18,
    fontWeight: "700",
  },
  cardContainer: {
    flex: 1,
    margin: 8,
    marginLeft: 16,
  },
  cardImage: {
    width: "100%",
    height: width * 0.5 - 32,
    borderRadius: 18,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  cardTitle: {
    color: COLORS.lightText,
    fontSize: 16,
    fontWeight: "700",
    padding: 12,
  },
});