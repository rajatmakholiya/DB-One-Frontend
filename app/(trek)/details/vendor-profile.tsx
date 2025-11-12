import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const RADIUS = 22;
const CARD_SPACING = 18;
const PRIMARY = "#4CC2FF";
const ACCENT = "#70D29C";
const TEXT_SUBTLE = "#86A9BF";
const TEXT_MUTED = "#7EA4BA";
const SURFACE = "rgba(12,32,48,0.72)";
const SURFACE_STRONG = "rgba(15,38,56,0.85)";
const DIVIDER = "rgba(76,151,189,0.28)";
const GLASS = "rgba(12,32,48,0.68)";
const GALLERY_COLUMNS = 3;
const GALLERY_GAP = 12;
const GALLERY_IMAGE_SIZE =
  (width - 40 - GALLERY_GAP * (GALLERY_COLUMNS - 1)) / GALLERY_COLUMNS;

// --- Mock Data ---
const vendor = {
  name: "Himalayan Adventures",
  verified: true,
  rating: 4.8,
  reviews: 128,
  years: 9,
  location: "Pithoragarh, Uttarakhand",
  about:
    "Certified trek operator focused on safe, sustainable Himalayan experiences. Small groups, trained guides, and high-altitude protocols.",
  tags: ["Certified Partner", "Top Rated", "Eco-first"],
};

const featuredImages = [
  "https://images.unsplash.com/photo-1521207418485-99c705420785?auto=format&q=80&w=1280",
  "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&q=80&w=1280",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&q=80&w=1280",
];

const guides = [
  {
    id: "g1",
    name: "Rohan Sharma",
    exp: "6 yrs",
    tag: "High Altitude",
    avatar:
      "https://images.pexels.com/photos/2832034/pexels-photo-2832034.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: "g2",
    name: "Priya Verma",
    exp: "5 yrs",
    tag: "Rescue Certified",
    avatar:
      "https://images.pexels.com/photos/3765114/pexels-photo-3765114.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: "g3",
    name: "Ankit Rawat",
    exp: "7 yrs",
    tag: "Snow & Glacier",
    avatar:
      "https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
];

const packages = [
  {
    id: "p1",
    tier: "Base",
    title: "Guided Trek Essentials",
    desc: "Professional guide, permits and safety briefings included.",
    image:
      "https://images.unsplash.com/photo-1549887534-3db1bd59dcca?auto=format&q=80&w=1080",
    price: "₹2,499",
  },
  {
    id: "p2",
    tier: "Comfort",
    title: "Guide + Gear + Hot Meals",
    desc: "Curated campsites, warm meals and weather-ready gear.",
    image:
      "https://images.unsplash.com/photo-1558980394-0c0c5d2b9d53?auto=format&q=80&w=1080",
    price: "₹3,999",
  },
  {
    id: "p3",
    tier: "Expedition",
    title: "All Inclusive with Transport",
    desc: "End-to-end logistics including transfers and acclimatization support.",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&q=80&w=1080",
    price: "₹5,999",
  },
];

const moreTreks = [
  {
    id: "t1",
    title: "Kedarkantha Summit",
    duration: "4D · 3N",
    difficulty: "Moderate",
    price: "₹2,999",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&q=80&w=1080",
  },
  {
    id: "t2",
    title: "Valley of Flowers",
    duration: "5D · 4N",
    difficulty: "Easy",
    price: "₹3,499",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&q=80&w=1080",
  },
  {
    id: "t3",
    title: "Bali Pass Expedition",
    duration: "7D · 6N",
    difficulty: "Difficult",
    price: "₹6,999",
    image:
      "https://images.unsplash.com/photo-1526481280698-8fcc13fd92c7?auto=format&q=80&w=1080",
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&q=80&w=1080",
  "https://images.unsplash.com/photo-1521207418485-99c705420785?auto=format&q=80&w=1080",
  "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&q=80&w=1080",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&q=80&w=1080",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&q=80&w=1080",
  "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&q=80&w=1080",
];

export default function VendorProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeImage, setActiveImage] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [guidePickerForPkg, setGuidePickerForPkg] = useState<string | null>(
    null
  );
  const [selectedGuideByPkg, setSelectedGuideByPkg] = useState<
    Record<string, string>
  >({});
  const imageListRef = useRef<FlatList<string>>(null);

  const onViewRef = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems?.length) setActiveImage(viewableItems[0].index ?? 0);
    }
  );
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 60 });

  const pickGuide = (pkgId: string, guideId: string) => {
    setSelectedGuideByPkg((prev) => ({ ...prev, [pkgId]: guideId }));
    setGuidePickerForPkg(null);
  };
  const selectedGuide = (pkgId: string) =>
    guides.find((g) => g.id === selectedGuideByPkg[pkgId]);

  const galleryColumns = useMemo(() => {
    const columns: string[][] = Array.from(
      { length: GALLERY_COLUMNS },
      () => []
    );
    galleryImages.forEach((img, index) => {
      columns[index % GALLERY_COLUMNS].push(img);
    });
    return columns;
  }, []);

  const pulse = useSharedValue(1);
  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.04, { duration: 900, easing: Easing.out(Easing.quad) }),
        withTiming(1, { duration: 900, easing: Easing.in(Easing.quad) })
      ),
      -1,
      false
    );
  }, [pulse]);

  const ctaStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  const tabBarHeight = 72;
  const ctaBottomOffset = tabBarHeight + insets.bottom + 12;

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={["#020B12", "#041B2A"]}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: ctaBottomOffset + 160 }}
      >
        <MotiView
          from={{ opacity: 0, translateY: -14 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 420 }}
          style={[styles.navRow, { paddingTop: insets.top + 4 }]}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            hitSlop={12}
            activeOpacity={0.85}
          >
            <View style={styles.navButton}>
              <Ionicons name="chevron-back" size={18} color="#E8F7FF" />
            </View>
          </TouchableOpacity>
          <View style={styles.navTitleWrap}>
            <Text style={styles.navTitle}>{vendor.name}</Text>
            <Text style={styles.navSubtitle}>Trusted alpine operator</Text>
          </View>
          <TouchableOpacity hitSlop={12} activeOpacity={0.85}>
            <View style={styles.navButtonSecondary}>
              <Ionicons name="share-social-outline" size={16} color="#041725" />
            </View>
          </TouchableOpacity>
        </MotiView>

        <MotiView
          from={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 14, delay: 80 }}
          style={styles.carouselWrap}
        >
          <FlatList
            ref={imageListRef}
            data={featuredImages}
            keyExtractor={(u) => u}
            renderItem={({ item }) => (
              <ImageBackground
                source={{ uri: item }}
                style={styles.carouselImage}
                imageStyle={{ borderRadius: RADIUS }}
              >
                <LinearGradient
                  colors={["rgba(3,10,18,0.1)", "rgba(3,10,18,0.85)"]}
                  style={StyleSheet.absoluteFill}
                />
              </ImageBackground>
            )}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={viewConfigRef.current}
          />
          <View style={styles.dotsRow}>
            {featuredImages.map((_, i) => (
              <MotiView
                key={i}
                from={{ scale: 0.6, opacity: 0.4 }}
                animate={{
                  scale: i === activeImage ? 1.2 : 0.9,
                  opacity: i === activeImage ? 1 : 0.5,
                }}
                transition={{ type: "timing", duration: 220 }}
                style={[styles.dot, i === activeImage && styles.dotActive]}
              />
            ))}
          </View>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 18 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 420, delay: 110 }}
          style={styles.headerCard}
        >
          <View style={{ flex: 1, gap: 8 }}>
            <Text style={styles.vendorName}>{vendor.name}</Text>
            <View style={styles.metaRow}>
              <Ionicons name="location-outline" size={14} color={TEXT_SUBTLE} />
              <Text style={styles.metaText}>{vendor.location}</Text>
            </View>
            <View style={styles.metaRow}>
              <Ionicons name="ribbon-outline" size={14} color={TEXT_SUBTLE} />
              <Text style={styles.metaText}>
                {vendor.years} yrs in operation
              </Text>
              {vendor.verified && (
                <View style={styles.verifiedChip}>
                  <Ionicons name="checkmark-circle" size={14} color={ACCENT} />
                  <Text style={styles.verifiedText}>Verified partner</Text>
                </View>
              )}
            </View>
            <View style={styles.metaRow}>
              <Ionicons name="star" size={14} color="#FFD166" />
              <Text style={styles.metaText}>
                {vendor.rating} · {vendor.reviews} field reviews
              </Text>
            </View>
          </View>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 420, delay: 140 }}
          style={styles.card}
        >
          <Text style={styles.sectionTitle}>About the operator</Text>
          <Text style={styles.bodyText}>{vendor.about}</Text>
          <View style={styles.tagRow}>
            {vendor.tags.map((tag, idx) => (
              <MotiView
                key={tag}
                from={{ opacity: 0, translateY: 8 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: "timing", delay: 200 + idx * 80 }}
                style={styles.tagChip}
              >
                <Ionicons name="sparkles-outline" size={12} color="#041725" />
                <Text style={styles.tagText}>{tag}</Text>
              </MotiView>
            ))}
          </View>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 420, delay: 180 }}
          style={styles.card}
        >
          <View style={styles.cardHeaderRow}>
            <Text style={styles.sectionTitle}>Package options</Text>
            <TouchableOpacity activeOpacity={0.85}>
              <Text style={styles.sectionLink}>Compare tiers</Text>
            </TouchableOpacity>
          </View>

          {packages.map((pkg, index) => (
            <MotiView
              key={pkg.id}
              from={{ opacity: 0, translateY: 24 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: "spring",
                damping: 16,
                delay: 120 + index * 90,
              }}
              style={[
                styles.packageRow,
                selectedPackage === pkg.id && styles.packageRowSelected,
              ]}
            >
              <Image source={{ uri: pkg.image }} style={styles.pkgThumb} />
              <View style={{ flex: 1 }}>
                <Text style={styles.pkgTier}>{pkg.tier}</Text>
                <Text style={styles.pkgTitle}>{pkg.title}</Text>
                <Text style={styles.pkgDesc}>{pkg.desc}</Text>
                <Text style={styles.pkgPrice}>{pkg.price}</Text>

                {selectedGuide(pkg.id) && (
                  <View style={styles.selectedGuidePill}>
                    <Image
                      source={{ uri: selectedGuide(pkg.id)!.avatar }}
                      style={styles.guideMini}
                    />
                    <Text style={styles.selectedGuideText}>
                      {selectedGuide(pkg.id)!.name} ·{" "}
                      {selectedGuide(pkg.id)!.tag}
                    </Text>
                    <Ionicons name="checkmark" size={15} color={ACCENT} />
                  </View>
                )}

                <View style={styles.pkgActionRow}>
                  <TouchableOpacity
                    style={styles.hollowBtn}
                    onPress={() => setGuidePickerForPkg(pkg.id)}
                    activeOpacity={0.85}
                  >
                    <Ionicons name="person-outline" size={16} color={ACCENT} />
                    <Text style={styles.hollowBtnText}>
                      {selectedGuide(pkg.id) ? "Change Guide" : "Select Guide"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.solidBtn,
                      selectedPackage === pkg.id && styles.solidBtnActive,
                    ]}
                    onPress={() =>
                      setSelectedPackage((prev) =>
                        prev === pkg.id ? null : pkg.id
                      )
                    }
                    activeOpacity={0.92}
                  >
                    <Text style={styles.solidBtnText}>
                      {selectedPackage === pkg.id ? "Selected" : "Select"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </MotiView>
          ))}
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 18 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring", damping: 14, delay: 220 }}
          style={styles.card}
        >
          <Text style={styles.sectionTitle}>Guides on roster</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 14 }}
          >
            {guides.map((guide, idx) => (
              <MotiView
                key={guide.id}
                from={{ opacity: 0, translateY: 18, scale: 0.9 }}
                animate={{ opacity: 1, translateY: 0, scale: 1 }}
                transition={{
                  type: "spring",
                  damping: 15,
                  delay: 120 + idx * 90,
                }}
                style={styles.guideCard}
              >
                <Image
                  source={{ uri: guide.avatar }}
                  style={styles.guideAvatar}
                />
                <Text style={styles.guideName}>{guide.name}</Text>
                <Text style={styles.guideTag}>{guide.tag}</Text>
                <Text style={styles.guideExp}>{guide.exp} experience</Text>
              </MotiView>
            ))}
          </ScrollView>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 18 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring", damping: 14, delay: 260 }}
          style={styles.card}
        >
          <View style={styles.cardHeaderRow}>
            <Text style={styles.sectionTitle}>More treks</Text>
            <TouchableOpacity activeOpacity={0.85}>
              <Text style={styles.sectionLink}>View catalogue</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: "row", gap: 14 }}>
              {moreTreks.map((trek, idx) => (
                <MotiView
                  key={trek.id}
                  from={{ opacity: 0, scale: 0.92, translateY: 18 }}
                  animate={{ opacity: 1, scale: 1, translateY: 0 }}
                  transition={{
                    type: "spring",
                    damping: 16,
                    delay: 140 + idx * 100,
                  }}
                >
                  <TouchableOpacity activeOpacity={0.9} style={styles.trekCard}>
                    <ImageBackground
                      source={{ uri: trek.image }}
                      style={styles.trekImage}
                      imageStyle={styles.trekImageInner}
                    >
                      <LinearGradient
                        colors={["rgba(3,10,18,0.05)", "rgba(3,10,18,0.82)"]}
                        style={StyleSheet.absoluteFill}
                      />
                    </ImageBackground>
                    <View style={styles.trekContent}>
                      <Text style={styles.trekTitle}>{trek.title}</Text>
                      <Text style={styles.trekMeta}>
                        {trek.duration} • {trek.difficulty}
                      </Text>
                      <Text style={styles.trekPrice}>{trek.price}</Text>
                    </View>
                  </TouchableOpacity>
                </MotiView>
              ))}
            </View>
          </ScrollView>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 18 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 420, delay: 300 }}
          style={styles.card}
        >
          <View style={styles.cardHeaderRow}>
            <Text style={styles.sectionTitle}>Image gallery</Text>
          </View>
          <View style={styles.galleryRow}>
            {galleryColumns.map((column, columnIndex) => (
              <View key={columnIndex} style={styles.galleryColumn}>
                {column.map((img, idx) => (
                  <MotiView
                    key={img}
                    from={{ opacity: 0, translateY: 22 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{
                      type: "timing",
                      delay: 120 + (columnIndex + idx) * 60,
                    }}
                  >
                    <Image source={{ uri: img }} style={styles.galleryImage} />
                  </MotiView>
                ))}
              </View>
            ))}
          </View>
        </MotiView>
      </ScrollView>

      <LinearGradient
        colors={["rgba(2,11,18,0)", "rgba(2,11,18,0.92)"]}
        style={[styles.ctaGradient, { height: ctaBottomOffset + 100 }]}
        pointerEvents="none"
      />

      <View
        style={[styles.ctaBar, { bottom: ctaBottomOffset }]}
        pointerEvents="box-none"
      >
        <Animated.View style={ctaStyle}>
          <TouchableOpacity
            onPress={() =>
              router.push("/(trek)/details/personalize-and-customize")
            }
            activeOpacity={0.92}
            style={styles.ctaButton}
          >
            <Text style={styles.ctaText}>Customize my package</Text>
            <Ionicons name="arrow-forward" size={18} color="#041725" />
          </TouchableOpacity>
        </Animated.View>
      </View>

      <Modal transparent visible={!!guidePickerForPkg} animationType="none">
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setGuidePickerForPkg(null)}
        />
        <MotiView
          from={{ translateY: 420 }}
          animate={{ translateY: guidePickerForPkg ? 0 : 420 }}
          transition={{ type: "spring", damping: 18, mass: 0.8 }}
          style={[styles.modalSheet, { paddingBottom: insets.bottom + 24 }]}
        >
          <View style={styles.modalHandle} />
          <Text style={styles.modalTitle}>Assign a guide</Text>
          <Text style={styles.modalSubtitle}>
            Pick a lead guide for the{" "}
            {packages.find((p) => p.id === guidePickerForPkg)?.tier ??
              "selected"}{" "}
            tier
          </Text>

          {guides.map((guide) => {
            const selected =
              selectedGuideByPkg[guidePickerForPkg ?? ""] === guide.id;
            return (
              <TouchableOpacity
                key={guide.id}
                activeOpacity={0.85}
                onPress={() => pickGuide(guidePickerForPkg!, guide.id)}
                style={[
                  styles.modalGuideRow,
                  selected && styles.modalGuideRowActive,
                ]}
              >
                <Image
                  source={{ uri: guide.avatar }}
                  style={styles.modalGuideAvatar}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.modalGuideName}>{guide.name}</Text>
                  <Text style={styles.modalGuideMeta}>
                    {guide.tag} • {guide.exp}
                  </Text>
                </View>
                <Ionicons
                  name={selected ? "checkmark-circle" : "ellipse-outline"}
                  size={20}
                  color={selected ? ACCENT : TEXT_MUTED}
                />
              </TouchableOpacity>
            );
          })}
        </MotiView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#020B12",
  },
  navRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 18,
  },
  navButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(232,247,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(76,151,189,0.24)",
  },
  navButtonSecondary: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#E8F7FF",
    alignItems: "center",
    justifyContent: "center",
  },
  packageRowSelected: {},
  navTitleWrap: {
    alignItems: "center",
    gap: 2,
  },
  navTitle: {
    color: "#E8F7FF",
    fontSize: 18,
    fontWeight: "700",
  },
  navSubtitle: {
    color: TEXT_MUTED,
    fontSize: 12,
  },
  carouselWrap: {
    marginHorizontal: 20,
    borderRadius: RADIUS,
    overflow: "hidden",
    marginBottom: CARD_SPACING,
    shadowColor: "#01070C",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.28,
    shadowRadius: 24,
    elevation: 10,
  },
  carouselImage: {
    width: width - 40,
    height: width * 0.6,
    borderRadius: RADIUS,
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  dotActive: {
    backgroundColor: "#FFFFFF",
  },
  headerCard: {
    marginHorizontal: 20,
    borderRadius: RADIUS,
    backgroundColor: SURFACE,
    borderWidth: 1,
    borderColor: DIVIDER,
    padding: 18,
    gap: 6,
    marginBottom: CARD_SPACING,
  },
  vendorName: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  metaText: {
    color: TEXT_SUBTLE,
    fontSize: 13,
    fontWeight: "600",
  },
  verifiedChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(112,210,156,0.16)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  verifiedText: {
    color: ACCENT,
    fontSize: 12,
    fontWeight: "700",
  },
  card: {
    marginHorizontal: 20,
    borderRadius: RADIUS,
    backgroundColor: SURFACE,
    borderWidth: 1,
    borderColor: DIVIDER,
    padding: 18,
    marginBottom: CARD_SPACING,
  },
  sectionTitle: {
    color: "#D9F1FF",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 10,
  },
  bodyText: {
    color: TEXT_MUTED,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 10,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 14,
  },
  tagChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(232,247,255,0.82)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  tagText: {
    color: "#041725",
    fontSize: 12,
    fontWeight: "700",
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  sectionLink: {
    color: PRIMARY,
    fontSize: 13,
    fontWeight: "600",
  },
  packageRow: {
    flexDirection: "row",
    gap: 14,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(76,151,189,0.2)",
  },
  pkgThumb: {
    width: 84,
    height: 84,
    borderRadius: 16,
  },
  pkgTier: {
    color: PRIMARY,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  pkgTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    marginTop: 4,
  },
  pkgDesc: {
    color: TEXT_MUTED,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },
  pkgPrice: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 8,
  },
  selectedGuidePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
    backgroundColor: "rgba(112,210,156,0.15)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  guideMini: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  selectedGuideText: {
    color: ACCENT,
    fontSize: 12,
    fontWeight: "600",
  },
  pkgActionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 12,
  },
  hollowBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: ACCENT,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "rgba(112,210,156,0.08)",
  },
  hollowBtnText: {
    color: ACCENT,
    fontSize: 12,
    fontWeight: "700",
  },
  solidBtn: {
    borderRadius: 999,
    backgroundColor: "rgba(76,194,255,0.18)",
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  solidBtnActive: {
    backgroundColor: PRIMARY,
  },
  solidBtnText: {
    color: "#e3ebf1ff",
    fontSize: 12,
    fontWeight: "700",
  },
  guideCard: {
    width: 150,
    borderRadius: RADIUS,
    paddingVertical: 18,
    paddingHorizontal: 14,
    alignItems: "center",
    backgroundColor: SURFACE_STRONG,
    borderWidth: 1,
    borderColor: DIVIDER,
    gap: 6,
  },
  guideAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 4,
  },
  guideName: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
  guideTag: {
    color: TEXT_MUTED,
    fontSize: 12,
  },
  guideExp: {
    color: ACCENT,
    fontSize: 12,
    fontWeight: "700",
  },
  trekCard: {
    width: width * 0.62,
    borderRadius: RADIUS,
    overflow: "hidden",
    backgroundColor: SURFACE,
    borderWidth: 1,
    borderColor: DIVIDER,
  },
  trekImage: {
    width: "100%",
    height: 140,
  },
  trekImageInner: {
    borderTopLeftRadius: RADIUS,
    borderTopRightRadius: RADIUS,
  },
  trekContent: {
    padding: 16,
    gap: 6,
  },
  trekTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  trekMeta: {
    color: TEXT_MUTED,
    fontSize: 12,
  },
  trekPrice: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  searchInputWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: GLASS,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: DIVIDER,
  },
  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 12,
  },
  galleryRow: {
    flexDirection: "row",
    gap: GALLERY_GAP,
    marginTop: 16,
  },
  galleryColumn: {
    width: GALLERY_IMAGE_SIZE,
    gap: GALLERY_GAP,
  },
  galleryImage: {
    width: GALLERY_IMAGE_SIZE,
    height: GALLERY_IMAGE_SIZE,
    borderRadius: 16,
  },
  ctaGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  ctaBar: {
    position: "absolute",
    left: 20,
    right: 20,
  },
  ctaButton: {
    backgroundColor: "#E8F7FF",
    borderRadius: 999,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    shadowColor: "#01070C",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 8,
  },
  ctaText: {
    color: "#041725",
    fontSize: 15,
    fontWeight: "700",
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
  modalSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: SURFACE_STRONG,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 16,
    borderWidth: 1,
    borderColor: DIVIDER,
  },
  modalHandle: {
    width: 46,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.32)",
    alignSelf: "center",
  },
  modalTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  modalSubtitle: {
    color: TEXT_MUTED,
    fontSize: 12,
    textAlign: "center",
  },
  modalGuideRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: GLASS,
    borderWidth: 1,
    borderColor: DIVIDER,
  },
  modalGuideRowActive: {
    borderColor: ACCENT,
    backgroundColor: "rgba(112,210,156,0.18)",
  },
  modalGuideAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  modalGuideName: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  modalGuideMeta: {
    color: TEXT_MUTED,
    fontSize: 12,
  },
});
