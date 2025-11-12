import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import React, { useMemo, useState } from "react";
import {
  Dimensions,
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

const categories = ["Camping", "Passes", "Riverside", "Forest Stay"];

const spotlightTreks = [
  {
    title: "Kedarkantha Alpine",
    subtitle: "Winter stars above 12,500 ft",
    image:
      "https://images.unsplash.com/photo-1516567727245-903b1e549319?auto=format&q=80&w=1080",
    badge: "High altitude",
  },
  {
    title: "Valley of Flowers",
    subtitle: "Bloom trail expedition",
    image:
      "https://images.unsplash.com/photo-1696269881186-5dd320b54fb6?auto=format&q=80&w=1080",
    badge: "Seasonal",
  },
];

const allPackages = [
  {
    id: 1,
    category: "Camping",
    title: "Kedarkantha Winter Camp",
    desc: "Snow camping with alpine gear, guided acclimatization walks, and night sky storytelling.",
    price: "₹2,499",
    image:
      "https://images.unsplash.com/photo-1549887534-3db1bd59dcca?auto=format&q=80&w=1080",
    duration: "3D·2N",
    difficulty: "Moderate",
  },
  {
    id: 2,
    category: "Camping",
    title: "Valley Explorer Camp",
    desc: "Hidden valley basecamp with curated hikes, hot meals, and cultural evenings.",
    price: "₹1,999",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&q=80&w=1080",
    duration: "2D·1N",
    difficulty: "Easy",
  },
  {
    id: 3,
    category: "Passes",
    title: "Bali Pass Expedition",
    desc: "Iconic pass crossing linking Har Ki Dun and Yamunotri with expedition support.",
    price: "₹3,999",
    image:
      "https://images.unsplash.com/photo-1521207418485-99c705420785?auto=format&q=80&w=1080",
    duration: "7D·6N",
    difficulty: "Difficult",
  },
  {
    id: 4,
    category: "Passes",
    title: "Kedarkantha Winter Pass",
    desc: "Summit push with dedicated snow guides, safety briefings, and gear rentals.",
    price: "₹2,499",
    image:
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&q=80&w=1080",
    duration: "4D·3N",
    difficulty: "Moderate",
  },
  {
    id: 5,
    category: "Riverside",
    title: "Bhagirathi Riverside Camp",
    desc: "Riverside lodges, guided rafting warm-ups, and starry campfire nights.",
    price: "₹2,199",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&q=80&w=1080",
    duration: "2D·2N",
    difficulty: "Easy",
  },
  {
    id: 6,
    category: "Forest Stay",
    title: "Binsar Forest Retreat",
    desc: "Immersive forest lodge with naturalist walks, birding sessions, and sunrise decks.",
    price: "₹2,899",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&q=80&w=1080",
    duration: "3D·2N",
    difficulty: "Easy",
  },
];

const popularVendors = [
  {
    name: "Summit Outfitters",
    rating: "4.9",
    specialization: "Snow treks & summit prep",
  },
  {
    name: "Meadow Basecamps",
    rating: "4.7",
    specialization: "Valley camps & logistics",
  },
];

export default function ExploreScreen() {
  const [selectedCategory, setSelectedCategory] = useState("Camping");
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const filteredPackages = useMemo(
    () =>
      allPackages.filter((pkg) => {
        const matchesCategory =
          pkg.category.toLowerCase() === selectedCategory.toLowerCase();

        const matchesSearch = pkg.title
          .toLowerCase()
          .includes(searchText.toLowerCase());
        return matchesCategory && matchesSearch;
      }),
    [selectedCategory, searchText]
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={["#020B12", "#071D2F"]}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 40 },
        ]}
      >
        <View style={styles.headerBar}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={20} color="#E8F7FF" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Explore Treks</Text>
            <Text style={styles.headerSubtitle}>
              Curated camps • Passes • Guides
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.85} style={styles.filterButton}>
            <Ionicons name="options-outline" size={16} color="#0F172A" />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.spotlightStrip}
        >
          {spotlightTreks.map((item, index) => (
            <MotiView
              key={item.title}
              from={{ opacity: 0, translateY: 16 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 120 + index * 100 }}
              style={styles.spotlightCard}
            >
              <ImageBackground
                source={{ uri: item.image }}
                style={styles.spotlightImage}
                imageStyle={{ borderRadius: 24 }}
              >
                <LinearGradient
                  colors={["rgba(3,10,17,0.1)", "rgba(3,10,17,0.82)"]}
                  style={styles.spotlightOverlay}
                />
                <View style={styles.spotlightContent}>
                  <View style={styles.badgeChip}>
                    <Ionicons
                      name="sparkles-outline"
                      size={14}
                      color="#0F172A"
                    />
                    <Text style={styles.badgeText}>{item.badge}</Text>
                  </View>
                  <Text style={styles.spotlightTitle}>{item.title}</Text>
                  <Text style={styles.spotlightSubtitle}>{item.subtitle}</Text>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => router.push("/(trek)/details/trek-details")}
                    style={styles.spotlightCta}
                  >
                    <Text style={styles.spotlightCtaText}>View itinerary</Text>
                    <Ionicons name="arrow-forward" size={16} color="#041725" />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </MotiView>
          ))}
        </ScrollView>

        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Ionicons name="search-outline" size={18} color="#8CAFC4" />
            <TextInput
              placeholder="Search for treks, camps or passes"
              placeholderTextColor="#7EA4BA"
              value={searchText}
              onChangeText={setSearchText}
              style={styles.searchInput}
            />
          </View>
          <TouchableOpacity activeOpacity={0.85} style={styles.holoButton}>
            <Ionicons name="filter" size={16} color="#D9F1FF" />
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Choose a focus</Text>
          <TouchableOpacity activeOpacity={0.85}>
            <Text style={styles.sectionLink}>View all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryStrip}
        >
          {categories.map((cat, index) => {
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
                      ? "rgba(76,194,255,0.22)"
                      : "rgba(12,32,48,0.62)",
                    borderColor: focused ? "#4CC2FF" : "rgba(76,151,189,0.32)",
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

        {/* Mini package showcase per category */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.focusStrip}
        >
          {allPackages
            .filter((pkg) => pkg.category === selectedCategory)
            .map((pkg) => (
              <TouchableOpacity
                key={pkg.id}
                activeOpacity={0.9}
                onPress={() => router.push("/(trek)/details/trek-details")}
                style={styles.focusCard}
              >
                <ImageBackground
                  source={{ uri: pkg.image }}
                  style={styles.focusImage}
                  imageStyle={{ borderRadius: 16 }}
                >
                  <LinearGradient
                    colors={["rgba(3,10,17,0.1)", "rgba(3,10,17,0.75)"]}
                    style={styles.focusOverlay}
                  />
                  <View style={styles.focusContent}>
                    <Text style={styles.focusTitle}>{pkg.title}</Text>
                    <Text style={styles.focusSubtitle}>
                      {pkg.duration} • {pkg.difficulty}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trusted partners</Text>
          <Text style={styles.sectionMeta}>Handpicked by Devbhoomi Ops</Text>
        </View>

        <View style={styles.vendorList}>
          {popularVendors.map((vendor, index) => (
            <MotiView
              key={vendor.name}
              from={{ opacity: 0, translateY: 14 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 120 + index * 90 }}
              style={styles.vendorCard}
            >
              <View style={styles.vendorAvatar}>
                <Ionicons name="compass" size={20} color="#4CC2FF" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.vendorName}>{vendor.name}</Text>
                <Text style={styles.vendorSpec}>{vendor.specialization}</Text>
              </View>
              <View style={styles.vendorRating}>
                <Ionicons name="star" size={14} color="#FFD166" />
                <Text style={styles.vendorRatingText}>{vendor.rating}</Text>
              </View>
            </MotiView>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Curated departures</Text>
          <Text style={styles.sectionMeta}>Filtered by your selection</Text>
        </View>

        <View style={styles.packageList}>
          {allPackages.length > 0 ? (
            allPackages.map((pkg, index) => (
              <MotiView
                key={pkg.id}
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 120 + index * 90 }}
                style={styles.card}
              >
                <ImageBackground
                  source={{ uri: pkg.image }}
                  style={styles.cardImage}
                  imageStyle={{ borderRadius: 22 }}
                >
                  <LinearGradient
                    colors={["rgba(3,10,17,0.1)", "rgba(3,10,17,0.86)"]}
                    style={styles.cardOverlay}
                  />
                  <View style={styles.cardTopMeta}>
                    <View style={styles.metaPill}>
                      <Ionicons name="time-outline" size={14} color="#0F172A" />
                      <Text style={styles.metaText}>{pkg.duration}</Text>
                    </View>
                    <View style={styles.metaPillSecondary}>
                      <Ionicons
                        name="pulse-outline"
                        size={14}
                        color="#D9F1FF"
                      />
                      <Text style={styles.metaTextSecondary}>
                        {pkg.difficulty}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{pkg.title}</Text>
                    <Text style={styles.cardDesc}>{pkg.desc}</Text>
                    <View style={styles.cardFooter}>
                      <View>
                        <Text style={styles.priceCaption}>Starts from</Text>
                        <Text style={styles.price}>{pkg.price}</Text>
                      </View>
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() =>
                          router.push("/(trek)/details/trek-details")
                        }
                        style={styles.bookBtn}
                      >
                        <Text style={styles.bookText}>Reserve slot</Text>
                        <Ionicons
                          name="arrow-forward"
                          size={16}
                          color="#041725"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </ImageBackground>
              </MotiView>
            ))
          ) : (
            <Text style={styles.noResult}>
              No departures match your filters.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#020B12",
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
    backgroundColor: "rgba(232,247,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#E8F7FF",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  headerSubtitle: {
    color: "#7EA4BA",
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },

  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E8F7FF",
    alignItems: "center",
    justifyContent: "center",
  },
  focusStrip: {
    paddingHorizontal: 20,
    gap: 14,
    marginBottom: 28,
  },
  focusCard: {
    width: width * 0.55,
    borderRadius: 16,
    overflow: "hidden",
  },
  focusImage: {
    height: width * 0.38,
    justifyContent: "flex-end",
  },
  focusOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  focusContent: {
    padding: 14,
  },
  focusTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
  },
  focusSubtitle: {
    color: "#CFE3F5",
    fontSize: 12,
  },

  spotlightStrip: {
    paddingLeft: 20,
    paddingRight: 12,
    gap: 14,
    marginBottom: 24,
  },
  spotlightCard: {
    width: width * 0.75,
    borderRadius: 24,
    overflow: "hidden",
  },
  spotlightImage: {
    height: width * 0.5,
    justifyContent: "flex-end",
  },
  spotlightOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  spotlightContent: {
    padding: 22,
    gap: 10,
  },
  badgeChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(232,247,255,0.9)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    alignSelf: "flex-start",
  },
  badgeText: {
    color: "#0F172A",
    fontSize: 11,
    fontWeight: "700",
  },
  spotlightTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },
  spotlightSubtitle: {
    color: "#CFE3F5",
    fontSize: 13,
    lineHeight: 18,
  },
  spotlightCta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#E8F7FF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    alignSelf: "flex-start",
  },
  spotlightCtaText: {
    color: "#041725",
    fontWeight: "700",
    fontSize: 13,
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
    backgroundColor: "rgba(12,32,48,0.68)",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "rgba(76,151,189,0.24)",
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    fontSize: 14,
    color: "#E8F7FF",
  },
  holoButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(76,151,189,0.34)",
    backgroundColor: "rgba(12,32,48,0.68)",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  sectionTitle: {
    color: "#D9F1FF",
    fontSize: 16,
    fontWeight: "700",
  },
  sectionLink: {
    color: "#4CC2FF",
    fontSize: 13,
    fontWeight: "600",
  },
  sectionMeta: {
    color: "#7EA4BA",
    fontSize: 12,
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
    borderWidth: 1,
  },
  categoryText: {
    color: "#7EA4BA",
    fontSize: 13,
    fontWeight: "600",
  },
  categoryTextActive: {
    color: "#E8F7FF",
  },
  vendorList: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  vendorCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "rgba(12,32,48,0.72)",
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(76,151,189,0.22)",
  },
  vendorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(76,194,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  vendorName: {
    color: "#E8F7FF",
    fontWeight: "700",
    fontSize: 14,
  },
  vendorSpec: {
    color: "#7EA4BA",
    fontSize: 12,
  },
  vendorRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,209,102,0.14)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  vendorRatingText: {
    color: "#FFD166",
    fontWeight: "700",
    fontSize: 12,
  },
  packageList: {
    paddingHorizontal: 20,
    gap: 18,
  },
  card: {
    borderRadius: 22,
    overflow: "hidden",
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
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  metaPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(232,247,255,0.92)",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  metaText: {
    color: "#041725",
    fontSize: 12,
    fontWeight: "700",
  },
  metaPillSecondary: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(15,38,56,0.7)",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(76,151,189,0.32)",
  },
  metaTextSecondary: {
    color: "#D9F1FF",
    fontSize: 12,
    fontWeight: "700",
  },
  cardContent: {
    paddingHorizontal: 18,
    paddingBottom: 20,
    gap: 10,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  cardDesc: {
    color: "#CFE3F5",
    fontSize: 13,
    lineHeight: 18,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },
  priceCaption: {
    color: "#7EA4BA",
    fontSize: 12,
  },
  price: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  bookBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#E8F7FF",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
  },
  bookText: {
    color: "#041725",
    fontWeight: "700",
    fontSize: 13,
  },
  noResult: {
    color: "#7EA4BA",
    fontSize: 14,
    textAlign: "center",
    paddingVertical: 30,
  },
});
