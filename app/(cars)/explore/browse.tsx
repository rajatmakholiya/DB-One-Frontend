import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MotiView } from "moti";
import React, { useMemo, useState } from "react";
import {
    Dimensions,
    FlatList,
    ImageBackground,
    ScrollView,
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

// --- CAR RENTAL THEME ---
const COLORS = {
  primaryBg: "#FFFFFF",
  componentBg: "#F9F9F9",
  accent: "#007C91", // Cyan Dark Blue
  darkText: "#557B83",
  lightText: "#FFFFFF",
  cardBorder: "#EDEDED",
  activeChipBg: "rgba(0, 124, 145, 0.15)", // Light cyan
  overlayGradientStart: "rgba(0, 0, 0, 0.05)",
  overlayGradientEnd: "rgba(0, 0, 0, 0.7)",
};

// --- Mock Data for Cars ---
const allCars = [
  {
    id: "c1",
    title: "Maruti Suzuki Dzire",
    type: "sedan",
    image:
      "https://images.unsplash.com/photo-1616297079717-b93dcee53a8f?auto=format&q=80&w=1080",
    rating: 4.7,
    pricePerDay: 2200,
    location: "Dehradun",
  },
  {
    id: "c2",
    title: "Hyundai Creta",
    type: "suv",
    image:
      "https://images.unsplash.com/photo-1617531317371-331500400037?auto=format&q=80&w=1080",
    rating: 4.8,
    pricePerDay: 3500,
    location: "Rishikesh",
  },
  {
    id: "c3",
    title: "Tata Tiago",
    type: "hatchback",
    image:
      "https://images.unsplash.com/photo-1600938216700-068a186dfd5e?auto=format&q=80&w=1080",
    rating: 4.6,
    pricePerDay: 1800,
    location: "Nainital",
  },
  {
    id: "c4",
    title: "Mahindra Scorpio",
    type: "suv",
    image:
      "https://images.unsplash.com/photo-1621007827662-41223c14aeb4?auto=format&q=80&w=1080",
    rating: 4.9,
    pricePerDay: 4000,
    location: "Dehradun",
  },
  {
    id: "c5",
    title: "Honda City",
    type: "sedan",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&q=80&w=1080",
    rating: 4.7,
    pricePerDay: 3000,
    location: "Rishikesh",
  },
  {
    id: "c6",
    title: "Maruti Suzuki Swift",
    type: "hatchback",
    image:
      "https://images.unsplash.com/photo-1618843050912-f50c0c5b3646?auto=format&q=80&w=1080",
    rating: 4.5,
    pricePerDay: 2000,
    location: "Haridwar",
  },
];

const categories = ["SUV", "Sedan", "Hatchback"];

export default function BrowseCarsScreen() {
  const [selectedCategory, setSelectedCategory] = useState("SUV");
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  // Get the location from the URL params
  const { location } = useLocalSearchParams<{ location: string }>();

  const filteredCars = useMemo(
    () =>
      allCars.filter((car) => {
        // 1. Filter by location
        const matchesLocation = car.location.toLowerCase() === location?.toLowerCase();

        // 2. Filter by selected category
        const matchesCategory =
          !selectedCategory ||
          car.type.toLowerCase() === selectedCategory.toLowerCase();
          
        // 3. Filter by search text
        const matchesSearch = car.title
          .toLowerCase()
          .includes(searchText.toLowerCase());

        return matchesLocation && matchesCategory && matchesSearch;
      }),
    [selectedCategory, searchText, location]
  );

  const renderCarCard = ({ item }: { item: (typeof allCars)[0] }) => (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: 100 }}
      style={styles.card}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => router.push(`/(cars)/explore/${item.id}`)}
      >
        <ImageBackground
          source={{ uri: item.image }}
          style={styles.cardImage}
          imageStyle={{ borderRadius: 22 }}
        >
          <LinearGradient
            colors={[COLORS.overlayGradientStart, COLORS.overlayGradientEnd]}
            style={styles.cardOverlay}
          />
          <View style={styles.cardTopMeta}>
            <View style={styles.metaPill}>
              <Ionicons name="star" size={14} color={COLORS.darkText} />
              <Text style={styles.metaText}>{item.rating}</Text>
            </View>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.location}</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.price}>
                ₹{item.pricePerDay.toLocaleString("en-IN")}
                <Text style={styles.priceCaption}> / day</Text>
              </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </MotiView>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerBar}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={20} color={COLORS.darkText} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Cars in {location}</Text>
          <Text style={styles.headerSubtitle}>
            Your Perfect Ride Awaits
          </Text>
        </View>
        <TouchableOpacity activeOpacity={0.85} style={styles.filterButton}>
          <Ionicons name="options-outline" size={16} color={COLORS.darkText} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredCars}
        keyExtractor={(item) => item.id}
        renderItem={renderCarCard}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 40 },
        ]}
        ListHeaderComponent={
          <>
            <View style={styles.searchContainer}>
              <View style={styles.searchBox}>
                <Ionicons name="search-outline" size={18} color={COLORS.darkText} />
                <TextInput
                  placeholder="Search for cars (e.g. Swift)"
                  placeholderTextColor={COLORS.darkText}
                  value={searchText}
                  onChangeText={setSearchText}
                  style={styles.searchInput}
                />
              </View>
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Categories</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryStrip}
            >
              {categories.map((cat) => {
                const focused = selectedCategory === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => setSelectedCategory(cat)}
                    activeOpacity={0.85}
                  >
                    <MotiView
                      animate={{
                        backgroundColor: focused
                          ? COLORS.activeChipBg
                          : "transparent",
                        borderColor: focused
                          ? COLORS.accent
                          : COLORS.cardBorder,
                      }}
                      transition={{ type: "timing", duration: 180 }}
                      style={styles.categoryChip}
                    >
                      <Text
                        style={[
                          styles.categoryText,
                          focused && styles.categoryTextActive,
                        ]}
                      >
                        {cat}
                      </Text>
                    </MotiView>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Available Cars</Text>
            </View>
          </>
        }
        ListEmptyComponent={
          <Text style={styles.noResult}>
            No cars match your filters in {location}.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

// Styles are a copy of the bike browse screen, just with new theme colors
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primaryBg,
  },
  scrollContent: {
    paddingTop: 12,
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 18,
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
  headerTitle: {
    color: COLORS.darkText,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  headerSubtitle: {
    color: COLORS.darkText,
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.componentBg,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  searchBox: {
    flex: 1,
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
    marginLeft: 10,
    flex: 1,
    fontSize: 14,
    color: COLORS.darkText,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  sectionTitle: {
    color: COLORS.darkText,
    fontSize: 16,
    fontWeight: "700",
  },
  categoryStrip: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 26,
  },
  categoryChip: {
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderWidth: 1.5,
    backgroundColor: "transparent",
  },
  categoryText: {
    color: COLORS.darkText,
    fontSize: 13,
    fontWeight: "600",
  },
  categoryTextActive: {
    color: COLORS.accent,
    fontWeight: "700",
  },
  card: {
    marginHorizontal: 20,
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 18,
    backgroundColor: COLORS.primaryBg,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  cardImage: {
    height: width * 0.55,
    justifyContent: "space-between",
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  cardTopMeta: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  metaPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: COLORS.primaryBg,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  metaText: {
    color: COLORS.darkText,
    fontSize: 12,
    fontWeight: "700",
  },
  cardContent: {
    paddingHorizontal: 18,
    paddingBottom: 20,
    gap: 6,
  },
  cardTitle: {
    color: COLORS.lightText,
    fontSize: 18,
    fontWeight: "700",
  },
  cardDesc: {
    color: COLORS.lightText,
    fontSize: 13,
    lineHeight: 18,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 6,
  },
  priceCaption: {
    color: COLORS.lightText,
    fontSize: 12,
  },
  price: {
    color: COLORS.lightText,
    fontSize: 16,
    fontWeight: "700",
  },
  noResult: {
    color: COLORS.darkText,
    fontSize: 14,
    textAlign: "center",
    paddingVertical: 30,
  },
});