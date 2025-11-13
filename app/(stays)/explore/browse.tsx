import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
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

// --- New Theme from your HTML ---
const COLORS = {
  primary: "#df8020",
  backgroundLight: "#f8f7f6",
  textPrimary: "#171411",
  textSubtle: "#877564",
  white: "#FFFFFF",
  borderColor: "#EAEAEA",
};

// --- Mock Data ---
const filterChips = [
  { id: "mountain", title: "Mountain View" },
  { id: "pet", title: "Pet Friendly" },
  { id: "family", title: "Family Friendly" },
  { id: "river", title: "Near River" },
  { id: "luxury", title: "Luxury" },
];

const topKumaon = [
  {
    id: "k1",
    title: "The Himalayan Escape",
    rating: 4.9,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAd16Bw-xZk1X9Juiu3m2qDTxnX_0cowV81YMfSc6t5hu0rhr6EsGjq35MJlxSAa6cnMv82bEiIeGIWYbQv2IBFIV16qUiZmd0ADlMJdeEj-yu6lThN4M-YMaAs4XoNYvpN_cff5FRfoOT0-yiNnzaT0LcBLGqEr4siJNyC10S3Nfd4ibiA4MBmokxt1cF4x6zqn7pnEPgKC3XSmYATx5H_WXBlvnvGnIu2uqa52Rh3yRp6EZ5vatTI4Etko2HWaMUncDCtKjrPf5U",
  },
  {
    id: "k2",
    title: "Oakwood Homestay",
    rating: 4.8,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZGVrc4FyRcjXMEOB6iHGOXiAfcuSwG_YhA98YfTdg8WZFQmEVJd75wCt0ieixbxNUSwQXnN5jihU1Wo3wNMgZdwC-vHc51tRbVpeqvPana3bG4FFpF_9Vtddci8VGfT0r9xPqp5-V7EWt-YRKlrVbsKNQTCLCfFAKNuhHuee2h0Pmq2BCCQFaUdVeZuIYdiDvT5u-87shsiDf1OCmqplsWeETwCXw0mrB7ivJ90M72uExa8ZvRgXxOKOf1w_XLv41ALwJoRof25s",
  },
  {
    id: "k3",
    title: "Riverstone Cottage",
    rating: 4.7,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDczCHzyyI3_x0ZXjFHbwRPcnzQ7HE2KuePG_vu17sDa_EgQ9wWB2_dJbbAnABwN071x8zOhSg07__1lKAOn_Bp1Yk_yURBXcJQURDcs6meeLJQFDx0wqNePk_Lkf1okRvWOUetUdR_30MrA-i6vZZhCqvn6Nr42tj4-oztx4HHmfnVjqpEJGHp4N5jOM0-SUjGHsVqz8I1YOKrPyxqwU_CuDtqSCH0xPlgEd2DDaFrxgPSMlre6rlzMr_1ub_5lm1aM_ghsD9pUZE",
  },
];

const topGarhwal = [
  {
    id: "g1",
    title: "Garhwal Heights",
    rating: 4.9,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD63IOtmhTHEoovyK3uB0tRkDTlO02IuHAJF0g6Myid-4V_R-hOeFRxaz8Qcduw4d6vqYg-KfvHNrzZM983lWbPwvkgwb59Rh83HBuJ_3R9zT7II2QPAKtIayTQYN6IEe8kSgFmuP-On7u2CnkG25WxCaxYH-DTJOrzNX1MgUKyGl8o8OgcPn8RjOQeCTedIJVSqvrLCpfMOn4YFwnw4eVWeW-wvIBWKkNsLCIOIBPZNWnKOA8lDPKMwbR5SuAD0yIcwElirTAbArU",
  },
  {
    id: "g2",
    title: "Pine Valley Homestay",
    rating: 4.8,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAm1qEq0e4T8jycHSEO5_rWaYNIshWyo5YRn5RuX10toTbrHAuo1JYZLK3GQxHj1vOg-ifN36y5qw1BjUWZgy12mMSYKAEILrQMKOkWv8LOobGCYbD-AYlLuvmGAA4MBjm_XH58g6IudJJtQ36_FK0AB6zEcBuGf70Ju2O9JkHGnLnqEOZDaBFv8kQu4F-q2ER37wRN_lMDBspBSRP8n7bHrLC5py0E30sEcriwxHUDc0nyQA1EhBaw56iD_7y7ggkmjMT6_YoDK2Y",
  },
];

// --- Collapsible Weather Component ---
const WeatherAdvisory = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View style={styles.weatherContainer}>
      <TouchableOpacity
        style={styles.weatherHeader}
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.8}
      >
        <View style={styles.weatherInfo}>
          <MaterialIcons name="wb-cloudy" size={30} color={COLORS.primary} />
          <View>
            <Text style={styles.weatherTemp}>14°C, Sunny</Text>
            <Text style={styles.weatherSub}>Tap for travel advisory</Text>
          </View>
        </View>
        <MaterialIcons
          name={isOpen ? "expand-less" : "expand-more"}
          size={24}
          color={COLORS.textSubtle}
        />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.advisoryBox}>
          <MaterialIcons name="warning" size={16} color="#f59e0b" />
          <Text style={styles.advisoryText}>
            Minor road closures near high passes. Check local conditions
            before travel.
          </Text>
        </View>
      )}
    </View>
  );
};

// --- Horizontal Card Component ---
const HomestayCard = ({ item }) => {
  const router = useRouter();
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => router.push({
        pathname: `/(stays)/explore/[id]`,
        params: { id: item.id }
      })}
    >
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.cardImage}
        imageStyle={{ borderRadius: 16 }}
      />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={styles.cardRow}>
          <MaterialIcons name="star" size={16} color={COLORS.primary} />
          <Text style={styles.cardRating}>{item.rating} stars</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// --- Main Screen ---
export default function HomestayBrowseScreen() {
  const [activeChip, setActiveChip] = useState("mountain");
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header Image with Search */}
        <ImageBackground
          source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqrjXiIj5LYGM-diBa-qCZkU3fSB5a3q6mK43URpIlU0XaNHVyYgD324cdXLzSvawzXksQ9UqLKDkkCs_ag1vv6nEuW6NZAtXe6JKM8DO4iTTgLFCr3hndLnluy6eC4dEqYjTb_hyAIkh2GxMklHRkZnnfVPxVadqYFe8Ykgy9ESNaFtHstzU4ZC7ZhIav0mRPSG4UjBPV_5w3X9jhB-j80T6P8L_Dlf1pydw6xyai7KrAQ7GH8VTPSZUyuIytL_nSBOLxl8sUNGI" }}
          style={styles.headerImage}
        >
          <View style={styles.headerContent}>
            <View style={styles.searchWrapper}>
              <View style={styles.searchIcon}>
                <MaterialIcons name="search" size={24} color={COLORS.textSubtle} />
              </View>
              <TextInput
                placeholder="Where to next?"
                placeholderTextColor={COLORS.textSubtle}
                style={styles.searchInput}
              />
            </View>
            <WeatherAdvisory />
          </View>
        </ImageBackground>

        {/* Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipScroll}
        >
          {filterChips.map((chip) => (
            <TouchableOpacity
              key={chip.id}
              style={
                activeChip === chip.id
                  ? styles.chipActive
                  : styles.chipInactive
              }
              onPress={() => setActiveChip(chip.id)}
            >
              <Text
                style={
                  activeChip === chip.id
                    ? styles.chipTextActive
                    : styles.chipTextInactive
                }
              >
                {chip.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Top Rated in Kumaon */}
        <Text style={styles.sectionTitle}>Top Rated in Kumaon</Text>
        <FlatList
          horizontal
          data={topKumaon}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HomestayCard item={item} />}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardList}
        />

        {/* Popular in Garhwal */}
        <Text style={styles.sectionTitle}>Popular in Garhwal</Text>
        <FlatList
          horizontal
          data={topGarhwal}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HomestayCard item={item} />}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardList}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Styles (Unchanged) ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  container: {
    flex: 1,
  },
  headerImage: {
    width: "100%",
    height: Dimensions.get("window").height * 0.33,
    justifyContent: "flex-end",
  },
  headerContent: {
    padding: 16,
    gap: 12,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    height: 56,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  searchIcon: {
    paddingLeft: 16,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: COLORS.textPrimary,
  },
  weatherContainer: {
    backgroundColor: "rgba(248, 247, 246, 0.7)",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(234, 234, 234, 0.5)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  weatherHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  weatherInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  weatherTemp: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: COLORS.textPrimary,
  },
  weatherSub: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: COLORS.textSubtle,
  },
  advisoryBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    paddingTop: 12,
    marginTop: 12,
    borderTopWidth: 1,
    borderColor: COLORS.borderColor,
  },
  advisoryText: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: COLORS.textPrimary,
  },
  chipScroll: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  chipActive: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "rgba(223, 128, 32, 0.2)",
  },
  chipInactive: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: COLORS.backgroundLight,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  chipTextActive: {
    color: COLORS.primary,
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
  chipTextInactive: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: "Poppins-Bold",
    color: COLORS.textPrimary,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
  },
  cardList: {
    paddingLeft: 16,
    paddingRight: 8,
    paddingBottom: 12,
  },
  card: {
    width: 240,
    marginRight: 16,
    gap: 12,
  },
  cardImage: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  cardBody: {
    gap: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: COLORS.textPrimary,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  cardRating: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: COLORS.textSubtle,
  },
});