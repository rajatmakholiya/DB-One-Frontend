import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* -------------------- constants -------------------- */
const { width } = Dimensions.get("window");

/* -------------------- image map -------------------- */
const imageMap: Record<string, any> = {
  cab: require("../assets/images/quick_actions/cab.png"),
  homestay: require("../assets/images/quick_actions/homestay.png"),
  trek_pass: require("../assets/images/quick_actions/trek_pass.png"),
  event: require("../assets/images/quick_actions/event.png"),
  bike: require("../assets/images/quick_actions/book_bike.png"),
  jobs: require("../assets/images/quick_actions/jobs.png"),
  professional: require("../assets/images/quick_actions/proffesional.png"),
  payments: require("../assets/images/quick_actions/payments.png"),
  goods: require("../assets/images/quick_actions/goods.png"),
  property: require("../assets/images/quick_actions/property.png"),
  pooja: require("../assets/images/quick_actions/pooja.png"),
  feed: require("../assets/images/quick_actions/feed.png"),
  shop: require("../assets/images/quick_actions/feed.png"),
  certificate: require("../assets/images/quick_actions/certificate.png"),
};

/* --- 1. Primary Experiences --- */
const coreActions = [
  {
    title: "Book Ride",
    icon: "car-outline",
    route: "/(cabs)/onboarding",
    imageKey: "cab",
  },
  {
    title: "Bike Rentals",
    icon: "bicycle-outline",
    route: "/(bikes)/explore",
    imageKey: "bike",
  },
  {
    title: "Trek & Pass",
    icon: "walk-outline",
    route: "/(trek)/dashboard",
    imageKey: "trek_pass",
  },
  {
    title: "Book Event",
    icon: "bonfire-outline",
    route: "/(events)/discover",
    imageKey: "event",
  },
  {
    title: "Car Rentals",
    icon: "car-sport-outline",
    route: "/(cars)/explore",
    imageKey: "cab",
  },
  {
    title: "Homestays",
    icon: "home-outline",
    route: "/(stays)/explore",
    imageKey: "homestay",
  },
];

/* --- 2. Daily Services --- */
const serviceActions = [
  {
    title: "Devbhoomi Jobs",
    icon: "briefcase-outline",
    route: "/(jobs)/explore",
    imageKey: "jobs",
  },
  {
    title: "Book Professional",
    icon: "person-add-outline",
    route: "/(services)/professionals",
    imageKey: "professional",
  },
  {
    title: "Renew License",
    icon: "document-text-outline",
    route: "/(gov)/license",
    imageKey: "certificate",
  },
  {
    title: "Pay Bills",
    icon: "card-outline",
    route: "/(payments)/bills",
    imageKey: "payments",
  },
];

/* --- 3. Commerce & Culture --- */
const commerceActions = [
  {
    title: "Shop Now",
    icon: "pricetags-outline",
    route: "/(market)/shop",
    imageKey: "shop",
  },
  {
    title: "Buy / Sell Goods",
    icon: "storefront-outline",
    route: "/(market)/sell",
    imageKey: "goods",
  },
  {
    title: "Rent Property",
    icon: "business-outline",
    route: "/(property)/browse",
    imageKey: "property",
  },
  {
    title: "Pooja Services",
    icon: "flower-outline",
    route: "/(pooja)/book",
    imageKey: "pooja",
  },
  {
    title: "Community Feed",
    icon: "newspaper-outline",
    route: "/(feed)/latest",
    imageKey: "feed",
  },
];

/* --- Carousels / Showcase Data --- */
const homestays = [
  {
    title: "Himalayan View Homestay",
    subtitle: "Mussoorie",
    img: {
      uri: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
    },
  },
  {
    title: "Riverside Cottage",
    subtitle: "Rishikesh",
    img: {
      uri: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    },
  },
];

const treks = [
  {
    title: "Valley of Flowers",
    subtitle: "National Park, Uttarakhand",
    img: {
      uri: "https://images.pexels.com/photos/1660995/pexels-photo-1660995.jpeg",
    },
  },
  {
    title: "Roopkund Lake Trek",
    subtitle: "Mystery Lake Adventure",
    img: {
      uri: "https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg",
    },
  },
];

const professionals = [
  {
    title: "Electrician Services",
    subtitle: "24x7 emergency available",
    img: {
      uri: "https://images.pexels.com/photos/4792479/pexels-photo-4792479.jpeg",
    },
  },
  {
    title: "Home Cleaning Experts",
    subtitle: "Top-rated verified cleaners",
    img: {
      uri: "https://images.pexels.com/photos/4239147/pexels-photo-4239147.jpeg",
    },
  },
];

const goods = [
  {
    title: "Local Handicrafts",
    subtitle: "Handmade with love in Kumaon",
    img: {
      uri: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
    },
  },
  {
    title: "Organic Produce",
    subtitle: "Fresh from local farmers",
    img: {
      uri: "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg",
    },
  },
];

const news = [
  {
    title: "Pithoragarh Fair Draws 10,000 Visitors",
    img: {
      uri: "https://images.pexels.com/photos/1556666/pexels-photo-1556666.jpeg",
    },
    time: "5 h ago",
  },
  {
    title: "Temple Renovation in Almora Begins",
    img: {
      uri: "https://images.pexels.com/photos/2726339/pexels-photo-2726339.jpeg",
    },
    time: "2 h ago",
  },
];

const activities = [
  { title: "Roopkund Trek", status: "Success" },
  { title: "License Renewal", status: "Pending" },
];

/* =======================================================
   MAIN COMPONENT
======================================================= */

export default function HomeScreen() {
  const router = useRouter();

  const renderActionGrid = (actions: any[]) => (
    <View style={styles.quickGrid}>
      {actions.map((item) => (
        <Pressable
          key={item.title}
          style={({ pressed }) => [
            styles.quickCard,
            pressed && { transform: [{ scale: 0.97 }] },
          ]}
          onPress={() => router.push(item.route)}
        >
          <ImageBackground
            source={imageMap[item.imageKey]}
            style={styles.bgImage}
            imageStyle={{ borderRadius: 16 }}
          >
            <View style={styles.overlay} />
            <View style={styles.content}>
              <Ionicons name={item.icon} size={26} color="#fff" />
              <Text style={styles.label}>{item.title}</Text>
            </View>
          </ImageBackground>
        </Pressable>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ===== HEADER ===== */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Pressable>
              <Ionicons name="menu-outline" size={26} color="#fff" />
            </Pressable>
            <Text style={styles.headerTitle}>Devbhoomi One</Text>
            <Pressable>
              <Ionicons name="person-circle-outline" size={28} color="#fff" />
            </Pressable>
          </View>
          <Text style={styles.greeting}>Good afternoon, Shubham!</Text>
          <Text style={styles.subtext}>
            Everything you need for life in Uttarakhand.
          </Text>
          <ImageBackground
            source={require("../assets/images/trek/onboarding_1.png")}
            style={styles.weatherBox}
            imageStyle={{ borderRadius: 16 }}
          >
            <View style={styles.leftSection}>
              <Text style={styles.city}>Dehradun</Text>
              <Text style={styles.temp}>24 °C</Text>
              <Text style={styles.weatherText}>Partly Cloudy</Text>
            </View>

            <View style={styles.rightSection}></View>
          </ImageBackground>
        </View>
        {/* ===== Featured Today ===== */}
        <RevealSection title="Featured Today">
          <View style={styles.featuredCard}>
            <Image
              source={{
                uri: "https://images.pexels.com/photos/1660995/pexels-photo-1660995.jpeg",
              }}
              style={styles.featuredImg}
            />
            <View style={styles.featuredOverlay} />
            <View style={styles.featuredTextBox}>
              <Text style={styles.featuredTitle}>Valley of Flowers Trek</Text>
              <Text style={styles.featuredDesc}>
                Explore the breathtaking landscapes of Uttarakhand.
              </Text>
            </View>
          </View>
        </RevealSection>
        {/* ===== Primary Experiences ===== */}
        <RevealSection title="Travel, Stay & Experiences">
          {renderActionGrid(coreActions)}
          <Carousel title="Top Treks" data={treks} />
          <Carousel title="Local Homestays" data={homestays} />
        </RevealSection>
        {/* ===== Daily Services ===== */}
        <RevealSection title="Jobs, Bills & Professionals">
          {renderActionGrid(serviceActions)}
          <Carousel title="Top Professionals" data={professionals} />
        </RevealSection>
        {/* ===== Commerce & Culture ===== */}
        <RevealSection title="Shop, Properties & Culture">
          {renderActionGrid(commerceActions)}
          <Carousel title="Marketplace Highlights" data={goods} />
          <Carousel title="Cultural News" data={news} />
        </RevealSection>
        {/* ===== Recent Activities ===== */}
        <RevealSection title="Recent Activities">
          {activities.map((item) => (
            <View key={item.title} style={styles.activityRow}>
              <Text style={styles.activityTitle}>{item.title}</Text>
              <View
                style={{
                  backgroundColor:
                    item.status === "Success" ? "#DFF6E0" : "#FFF5DA",
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                }}
              >
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
          ))}
        </RevealSection>
      </ScrollView>
    </SafeAreaView>
  );
}

/* =======================================================
   SHARED COMPONENTS
======================================================= */
const RevealSection = ({ title, children }: any) => (
  <MotiView
    from={{ opacity: 0, translateY: 40 }}
    animate={{ opacity: 1, translateY: 0 }}
    transition={{ damping: 12, mass: 0.9 }}
    style={styles.section}
  >
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </MotiView>
);

const Carousel = ({ title, data }: any) => (
  <View style={{ marginTop: 10, marginBottom: 6 }}>
    <Text style={styles.subSectionTitle}>{title}</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {data.map((item: any) => (
        <View key={item.title} style={styles.carouselCard}>
          <Image source={item.img} style={styles.carouselImg} />
          <Text style={styles.carouselTitle}>{item.title}</Text>
          <Text style={styles.carouselSubtitle}>{item.subtitle}</Text>
        </View>
      ))}
    </ScrollView>
  </View>
);

/* =======================================================
   STYLES
======================================================= */
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#E46C1E",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    padding: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSection: {
    flex: 1,
  },
  rightSection: {
    alignItems: "flex-end",
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
  greeting: { color: "#fff", fontSize: 20, fontWeight: "800", marginTop: 20 },
  subtext: { color: "#fff", fontSize: 14, marginTop: 4, opacity: 0.9 },
  weatherBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
  },
  city: { fontSize: 16, fontWeight: "700", color: "#fff" },
  temp: { fontSize: 22, fontWeight: "800", color: "#fff", marginTop: 4 },
  weatherText: { color: "#fff", fontWeight: "800" },
  container: { flex: 1, backgroundColor: "#f7f5f2" },
  section: { paddingHorizontal: 20, marginTop: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2b1b13",
    marginBottom: 10,
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2b1b13",
    marginBottom: 8,
  },
  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  quickCard: {
    width: "47%",
    marginBottom: 14,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
  },
  bgImage: { height: 120, justifyContent: "flex-end" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(4, 1, 1, 0.35)",
  },
  content: { padding: 10, flexDirection: "row", alignItems: "center" },
  label: { color: "#fff", fontSize: 15, fontWeight: "600" },
  featuredCard: { borderRadius: 16, overflow: "hidden" },
  featuredImg: { width: "100%", height: 200 },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  featuredTextBox: { position: "absolute", bottom: 20, left: 15 },
  featuredTitle: { color: "#fff", fontSize: 20, fontWeight: "800" },
  featuredDesc: { color: "#fff", fontSize: 13, marginTop: 4 },
  carouselCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: width * 0.6,
    marginRight: 14,
    overflow: "hidden",
  },
  carouselImg: { width: "100%", height: 120 },
  carouselTitle: { fontWeight: "700", color: "#2b1b13", margin: 8 },
  carouselSubtitle: {
    color: "#6d5c52",
    fontSize: 12,
    marginHorizontal: 8,
    marginBottom: 8,
  },
  activityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    elevation: 3,
  },
  activityTitle: { fontWeight: "600", color: "#2b1b13" },
  statusText: { fontSize: 12, fontWeight: "600", color: "#2b1b13" },
});
