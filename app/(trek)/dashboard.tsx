import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

/* ------------ DATA (with Unsplash / Pexels Images) ------------ */
const placeTreks = [
  {
    title: "Pithoragarh Treks",
    desc: "Explore the rugged beauty",
    image: {
      uri: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&q=80&w=800",
    },
  },
  {
    title: "Chamoli Treks",
    desc: "Discover majestic peaks",
    image: {
      uri: "https://images.unsplash.com/photo-1521207418485-99c705420785?auto=format&q=80&w=800",
    },
  },
  {
    title: "Kedarnath Trail",
    desc: "Spiritual heights await",
    image: {
      uri: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&q=80&w=800",
    },
  },
];

const vendors = [
  {
    name: "Himalayan Adventures",
    location: "Pithoragarh",
    logo: {
      uri: "https://images.unsplash.com/photo-1549887534-3db1bd59dcca?auto=format&q=80&w=200",
    },
  },
  {
    name: "Mountain Trails",
    location: "Chamoli",
    logo: {
      uri: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&q=80&w=200",
    },
  },

  {
    name: "Himalayan Adventures",
    location: "Pithoragarh",
    logo: {
      uri: "https://images.unsplash.com/photo-1549887534-3db1bd59dcca?auto=format&q=80&w=200",
    },
  },
  {
    name: "Mountain Trails",
    location: "Chamoli",
    logo: {
      uri: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&q=80&w=200",
    },
  },
];

const guides = [
  {
    name: "Rohan Sharma",
    tag: "High Altitude Expert",
    image: {
      uri: "https://images.pexels.com/photos/2832034/pexels-photo-2832034.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  },
  {
    name: "Priya Verma",
    tag: "Rescue Certified",
    image: {
      uri: "https://images.pexels.com/photos/3765114/pexels-photo-3765114.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  },
  {
    name: "Ankit Rawat",
    tag: "Devbhoomi Trek Leader",
    image: {
      uri: "https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  },
];

const categories = ["Spiritual", "Snow", "Adventure", "Eco"];

const myTreks = [
  { title: "Milam Glacier Trek", status: "Upcoming" },
  { title: "Valley of Flowers", status: "Ongoing" },
  { title: "Roopkund Trek", status: "Completed" },
];

const dashboardHighlights = [
  { title: "Active Treks", value: "12", caption: "3 new this week" },
  { title: "Registered Guides", value: "48", caption: "96% readiness" },
  { title: "Partner Vendors", value: "32", caption: "Trusted network" },
];

const allPackages = [
  {
    id: 1,
    category: "Spiritual",
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
    category: "Snow",
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
    category: "Adventure",
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

/* ------------ COMPONENT ------------ */
export default function TrekkingDashboard() {
  const [selectedCategory, setSelectedCategory] = useState("Camping");

  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={["#051726", "#020B12"]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={styles.backgroundGradient}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.headerBar}>
          <View>
            <Text style={styles.screenTitle}>Camps & Guides</Text>
            <Text style={styles.screenCaption}>
              Curated trek ecosystem across Devbhoomi
            </Text>
          </View>
          <View style={styles.statusBadge}>
            <Ionicons name="sparkles-outline" size={16} color="#0F172A" />
            <Text style={styles.statusBadgeText}>Live overview</Text>
          </View>
        </View>

        <View style={styles.heroCard}>
          <ImageBackground
            source={{
              uri: "https://images.unsplash.com/photo-1529119368496-2dfda6ec2804?auto=format&q=80&w=1080",
            }}
            style={styles.heroBackground}
            imageStyle={styles.heroImage}
          >
            <LinearGradient
              colors={["rgba(7, 20, 32, 0.1)", "rgba(7, 20, 32, 0.85)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.7, y: 1 }}
              style={styles.heroOverlay}
            />
            <View style={styles.heroContent}>
              <Text style={styles.heroEyebrow}>Trekking Hub</Text>
              <Text style={styles.heroTitle}>
                Strategic oversight for every trek
              </Text>
              <Text style={styles.heroSubtitle}>
                Monitor permits, readiness, and on-ground teams from a single
                command centre designed for operators.
              </Text>
              <TouchableOpacity style={styles.heroCta}>
                <Text style={styles.heroCtaText}>Review operations</Text>
                <Ionicons name="arrow-forward" size={18} color="#0F172A" />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.sectionSpacing}>
          <SectionTitle title="Insights" />
          <View style={styles.metricRow}>
            {dashboardHighlights.map((item, index) => (
              <MotiView
                key={item.title}
                from={{ opacity: 0, translateY: 18 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: index * 120 }}
                style={styles.metricCard}
              >
                <Text style={styles.metricValue}>{item.value}</Text>
                <Text style={styles.metricTitle}>{item.title}</Text>
                <Text style={styles.metricCaption}>{item.caption}</Text>
              </MotiView>
            ))}
          </View>
        </View>

        <View style={styles.sectionSpacing}>
          <SectionTitle title="Quick Access" />
          <View style={styles.quickRow}>
            {[
              { title: "My Treks", icon: "map-outline" },
              { title: "Explore", icon: "compass-outline" },
              { title: "Vendors", icon: "storefront-outline" },
              { title: "Guides", icon: "people-outline" },
            ].map((item, index) => (
              <MotiView
                key={item.title}
                from={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 100 }}
                style={styles.quickCard}
              >
                <TouchableOpacity
                  activeOpacity={0.85}
                  style={styles.quickInner}
                >
                  <View style={styles.quickIconHolder}>
                    <Ionicons
                      name={item.icon as any}
                      size={20}
                      color="#0F172A"
                    />
                  </View>
                  <Text style={styles.quickTitle}>{item.title}</Text>
                </TouchableOpacity>
              </MotiView>
            ))}
          </View>
        </View>

        <View style={styles.sectionSpacing}>
          <SectionTitle title="Place-wise Treks" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {placeTreks.map((p, index) => (
              <MotiView
                key={p.title}
                from={{ opacity: 0, translateY: 24 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: index * 140 }}
                style={styles.placeCard}
              >
                <ImageBackground
                  source={p.image}
                  style={styles.placeImage}
                  imageStyle={styles.placeImageInner}
                >
                  <LinearGradient
                    colors={["rgba(8, 21, 34, 0.15)", "rgba(5, 15, 24, 0.85)"]}
                    style={styles.placeOverlay}
                  />
                  <View style={styles.placeContent}>
                    <Text style={styles.placeTitle}>{p.title}</Text>
                    <Text style={styles.placeDesc}>{p.desc}</Text>
                  </View>
                </ImageBackground>
              </MotiView>
            ))}
          </ScrollView>
        </View>

        <View style={styles.sectionSpacing}>
          <SectionTitle title="Vendors & Trek Partners" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {vendors.map((v, index) => (
              <MotiView
                key={`${v.name}-${index}`}
                from={{ opacity: 0, translateY: 18 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: index * 100 }}
                style={styles.vendorCard}
              >
                <View style={styles.vendorLogoWrapper}>
                  <Image source={v.logo} style={styles.vendorLogo} />
                </View>
                <Text style={styles.vendorName}>{v.name}</Text>
                <Text style={styles.vendorLoc}>{v.location}</Text>
              </MotiView>
            ))}
          </ScrollView>
        </View>

        <View style={styles.sectionSpacing}>
          <SectionTitle title="Top Guides & Trek Leaders" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {guides.map((g, index) => (
              <MotiView
                key={g.name}
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: index * 110 }}
                style={styles.guideCard}
              >
                <View style={styles.guideImageWrapper}>
                  <Image source={g.image} style={styles.guideImg} />
                </View>
                <Text style={styles.guideName}>{g.name}</Text>
                <Text style={styles.guideTag}>{g.tag}</Text>
              </MotiView>
            ))}
          </ScrollView>
        </View>

        <View style={styles.sectionSpacing}>
          <SectionTitle title="Speciality-wise Treks" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {categories.map((c, index) => (
              <TouchableOpacity
                key={c}
                activeOpacity={0.85}
                onPress={() => setSelectedCategory(c)} // Update selected category
              >
                <MotiView
                  from={{ opacity: 0, translateY: 14 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ delay: index * 80 }}
                  style={[
                    styles.categoryTag,
                    selectedCategory === c && styles.categoryTagActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === c && styles.categoryTextActive,
                    ]}
                  >
                    {c}
                  </Text>
                </MotiView>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

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

        <View style={styles.sectionSpacing}>
          <SectionTitle title="My Treks" />
          <View style={styles.myTreksList}>
            {myTreks.map((t, index) => (
              <MotiView
                key={t.title}
                from={{ opacity: 0, translateY: 16 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: index * 120 }}
                style={styles.myTrekCard}
              >
                <View>
                  <Text style={styles.myTrekTitle}>{t.title}</Text>
                  <Text style={styles.myTrekStatus}>{t.status}</Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.85}
                  style={styles.detailsBtn}
                >
                  <Text style={styles.detailsText}>Details</Text>
                  <Ionicons name="chevron-forward" size={16} color="#E8F7FF" />
                </TouchableOpacity>
              </MotiView>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ------------ Subcomponent ------------ */
const SectionTitle = ({ title }: { title: string }) => (
  <View style={styles.sectionHeader}>
    <View style={styles.sectionAccent} />
    <Text style={styles.sectionTitle}>{title}</Text>
  </View>
);

/* ------------ STYLES ------------ */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#3ea6f6ff",
  },
  backgroundGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  headerBar: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    paddingTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  screenTitle: {
    color: "#E8F7FF",
    fontSize: 22,
    fontWeight: "700",
  },
  screenCaption: {
    marginTop: 4,
    color: "#9AC1D6",
    fontSize: 13,
  },
  statusBadge: {
    backgroundColor: "#F2FBFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusBadgeText: {
    color: "#0F172A",
    fontWeight: "600",
    fontSize: 12,
  },
  focusStrip: {
    paddingHorizontal: 20,
    gap: 14,
    marginBottom: 28,
  },
  heroCard: {
    marginHorizontal: 20,
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 24,
    shadowColor: "#020B12",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 8,
  },
  heroBackground: {
    height: 220,
    justifyContent: "flex-end",
  },
  heroImage: {
    borderRadius: 24,
    transform: [{ scale: 1.02 }],
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  heroContent: {
    padding: 24,
  },
  heroEyebrow: {
    color: "#C3E4FF",
    fontSize: 13,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
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
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 6,
    marginBottom: 6,
  },
  heroSubtitle: {
    color: "#C8D8E4",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 18,
  },
  heroCta: {
    backgroundColor: "#E8F7FF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
  },
  heroCtaText: {
    color: "#0F172A",
    fontWeight: "700",
    fontSize: 13,
  },
  sectionSpacing: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    paddingHorizontal: 20,
  },
  sectionAccent: {
    width: 6,
    height: 24,
    borderRadius: 4,
    backgroundColor: "#33B6FF",
    marginRight: 10,
  },
  sectionTitle: {
    color: "#D7EAF5",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  metricRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    gap: 12,
  },
  metricCard: {
    flex: 1,
    backgroundColor: "rgba(12, 32, 48, 0.9)",
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(62, 120, 143, 0.2)",
    shadowColor: "#01070C",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 14,
    elevation: 6,
  },
  metricValue: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
  },
  metricTitle: {
    color: "#B6D5E5",
    fontSize: 14,
    fontWeight: "600",
  },
  metricCaption: {
    marginTop: 6,
    color: "#7EA4BA",
    fontSize: 12,
  },
  quickRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 12,
    columnGap: 12,
    paddingHorizontal: 20,
  },
  quickCard: {
    width: "47%",
    borderRadius: 18,
    backgroundColor: "rgba(15, 38, 56, 0.85)",
    borderWidth: 1,
    borderColor: "rgba(62, 120, 143, 0.24)",
    overflow: "hidden",
    shadowColor: "#01070C",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 5,
  },
  quickInner: {
    paddingVertical: 18,
    paddingHorizontal: 18,
    alignItems: "flex-start",
    gap: 12,
  },
  quickIconHolder: {
    backgroundColor: "#E8F7FF",
    borderRadius: 14,
    padding: 10,
  },
  quickTitle: {
    color: "#D7EAF5",
    fontWeight: "600",
    fontSize: 15,
  },
  horizontalList: {
    paddingHorizontal: 20,
    gap: 14,
  },
  placeCard: {
    width: 220,
    marginRight: 14,
  },
  placeImage: {
    height: 150,
    borderRadius: 20,
    overflow: "hidden",
  },
  placeImageInner: {
    borderRadius: 20,
  },
  placeOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  placeContent: {
    position: "absolute",
    left: 16,
    bottom: 16,
    right: 16,
  },
  placeTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  placeDesc: {
    color: "#C3D9E6",
    fontSize: 12,
    marginTop: 4,
  },
  vendorCard: {
    width: 190,
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "rgba(15, 38, 56, 0.85)",
    marginRight: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(62, 120, 143, 0.24)",
    gap: 12,
    shadowColor: "#01070C",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 6,
  },
  vendorLogoWrapper: {
    padding: 8,
    borderRadius: 16,
    backgroundColor: "rgba(232, 247, 255, 0.08)",
  },
  vendorLogo: {
    width: 62,
    height: 62,
    borderRadius: 12,
  },
  vendorName: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
    textAlign: "center",
  },
  vendorLoc: {
    color: "#8CAFC4",
    fontSize: 12,
  },
  guideCard: {
    width: 150,
    paddingVertical: 18,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "rgba(15, 38, 56, 0.85)",
    marginRight: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(62, 120, 143, 0.24)",
    gap: 10,
    shadowColor: "#01070C",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 6,
  },
  guideImageWrapper: {
    borderRadius: 40,
    padding: 4,
    backgroundColor: "rgba(232, 247, 255, 0.12)",
  },
  guideImg: {
    width: 76,
    height: 76,
    borderRadius: 38,
  },
  guideName: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
    textAlign: "center",
  },
  guideTag: {
    color: "#8CAFC4",
    fontSize: 12,
    textAlign: "center",
  },
  categoryTag: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(101, 151, 173, 0.6)",
    backgroundColor: "rgba(15, 38, 56, 0.7)",
    marginRight: 12,
  },
  categoryTagActive: {
    backgroundColor: "#33B6FF",
    borderColor: "#33B6FF",
  },
  categoryText: {
    color: "#B6D5E5",
    fontSize: 13,
    fontWeight: "600",
  },
  categoryTextActive: {
    color: "#041725",
  },
  myTreksList: {
    paddingHorizontal: 20,
    gap: 14,
  },
  myTrekCard: {
    backgroundColor: "rgba(15, 38, 56, 0.85)",
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(62, 120, 143, 0.24)",
    shadowColor: "#01070C",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 6,
  },
  myTrekTitle: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },
  myTrekStatus: {
    marginTop: 4,
    color: "#70D29C",
    fontSize: 12,
    fontWeight: "600",
  },
  detailsBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(45, 115, 165, 0.65)",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  detailsText: {
    color: "#E8F7FF",
    fontWeight: "600",
    fontSize: 12,
  },
});
