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

const COLORS = {
  primaryBg: "#FFFFFF",
  componentBg: "#F9F9F9",
  accent: "#FF6B6B",
  darkText: "#557B83",
  lightText: "#FFFFFF",
  cardBorder: "#EDEDED",
  activeChipBg: "rgba(255, 107, 107, 0.15)",
  overlayGradientStart: "rgba(0, 0, 0, 0.05)",
  overlayGradientEnd: "rgba(0, 0, 0, 0.7)",
};

const allBikes = [
  {
    id: "b1",
    title: "Royal Enfield Classic 350",
    type: "motorbike",
    image: "https://images.unsplash.com/photo-1620664752533-46c8c5c39178?auto=format&q=80&w=1080",
    rating: 4.8, pricePerDay: 1800, location: "Dehradun",
  },
  {
    id: "b2",
    title: "TVS Ntorq 125",
    type: "scooty",
    image: "https://images.unsplash.com/photo-1599021439358-86002b21a97a?auto=format&q=80&w=1080",
    rating: 4.6, pricePerDay: 900, location: "Rishikesh",
  },
  {
    id: "b3",
    title: "Mountain Gear Pro",
    type: "bicycle",
    image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&q=80&w=1080",
    rating: 4.9, pricePerDay: 500, location: "Nainital",
  },
  {
    id: "b4",
    title: "Hero Splendor Plus",
    type: "motorbike",
    image: "https://images.unsplash.com/photo-1625043831821-4d9f1f6d1c48?auto=format&q=80&w=1080",
    rating: 4.5, pricePerDay: 1100, location: "Haridwar",
  },
  {
    id: "b5",
    title: "Activa 6G",
    type: "scooty",
    image: "https://images.unsplash.com/photo-1629856499846-50e50f3f1e9c?auto=format&q=80&w=1080",
    rating: 4.7, pricePerDay: 800, location: "Dehradun",
  },
  {
    id: "b6",
    title: "Himalayan 411",
    type: "motorbike",
    image: "https://images.unsplash.com/photo-1591148318211-03f3b55d3674?auto=format&q=80&w=1080",
    rating: 4.9, pricePerDay: 2200, location: "Rishikesh",
  },
];

const categories = ["Motorbike", "Scooty", "Bicycle"];

export default function BrowseBikesScreen() {
  const [selectedCategory, setSelectedCategory] = useState("Motorbike");
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { location } = useLocalSearchParams<{ location: string }>();

  const filteredBikes = useMemo(
    () =>
      allBikes.filter((bike) => {
        const matchesLocation = bike.location.toLowerCase() === location?.toLowerCase();
        const matchesCategory =
          !selectedCategory ||
          bike.type.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch = bike.title
          .toLowerCase()
          .includes(searchText.toLowerCase());
        return matchesLocation && matchesCategory && matchesSearch;
      }),
    [selectedCategory, searchText, location]
  );

  const renderBikeCard = ({ item }: { item: (typeof allBikes)[0] }) => (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: 100 }}
      style={styles.card}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => router.push(`/(bikes)/explore/${item.id}`)} // CORRECTED PATH
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
          <Text style={styles.headerTitle}>Bikes in {location}</Text>
          <Text style={styles.headerSubtitle}>
            Your Adventure Awaits
          </Text>
        </View>
        <TouchableOpacity activeOpacity={0.85} style={styles.filterButton}>
          <Ionicons name="options-outline" size={16} color={COLORS.darkText} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredBikes}
        keyExtractor={(item) => item.id}
        renderItem={renderBikeCard}
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
                  placeholder="Search for bikes..."
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
              <Text style={styles.sectionTitle}>Available Bikes</Text>
            </View>
          </>
        }
        ListEmptyComponent={
          <Text style={styles.noResult}>
            No bikes match your filters in {location}.
          </Text>
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