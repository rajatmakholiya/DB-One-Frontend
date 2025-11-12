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
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const CARD_GAP = 14;
const GROUP_CARD_WIDTH = (width - 40 - CARD_GAP) / 2;
const PRIMARY = "#4CC2FF";
const ACCENT = "#70D29C";
const TEXT_MUTED = "#87ACC1";
const TEXT_SUBTLE = "#7EA4BA";
const SURFACE = "rgba(12,32,48,0.75)";
const SURFACE_SOFT = "rgba(12,32,48,0.58)";
const DIVIDER = "rgba(76,151,189,0.26)";

const groupTypes = [
  {
    id: 1,
    title: "Corporate",
    image:
      "https://images.unsplash.com/photo-1573496774426-6b1acb260507?auto=format&q=80&w=1080",
  },
  {
    id: 2,
    title: "Couples",
    image:
      "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&q=80&w=1080",
  },
  {
    id: 3,
    title: "College Friends",
    image:
      "https://images.unsplash.com/photo-1533239090000-57185c580a50?auto=format&q=80&w=1080",
  },
  {
    id: 4,
    title: "Family",
    image:
      "https://images.unsplash.com/photo-1601643156987-c7d2b9640987?auto=format&q=80&w=1080",
  },
];

const addonsList = [
  "Transport (Pickup/Drop)",
  "Meals (Veg, Non-Veg, Jain, Kumaoni)",
  "Stay (Shared Tent, Private Tent, Luxury Camp)",
  "Experience Boosters (Bonfire Night, Yoga Session, Stargazing)",
];

export default function PersonalizeExperienceScreen() {
  const [selectedGroup, setSelectedGroup] = useState(2);
  const [addons, setAddons] = useState([addonsList[1], addonsList[3]]);
  const [groupSize, setGroupSize] = useState(4);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const activeAddons = useMemo(() => new Set(addons), [addons]);

  const toggleAddon = (item: string) => {
    setAddons((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const estimatedAmount =
    12500 + activeAddons.size * 850 + (groupSize - 1) * 2100;

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={["#020B12", "#061D2F"]}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 200 }}
      >
        <MotiView
          from={{ opacity: 0, translateY: -16 }}
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
            <Text style={styles.screenEyebrow}>Step 3 of 5</Text>
            <Text style={styles.screenTitle}>Personalize experience</Text>
          </View>
          <View style={styles.navPlaceholder} />
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: -12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring", damping: 14, delay: 60 }}
          style={styles.heroCard}
        >
          <View style={styles.heroContent}>
            <Text style={styles.heroHeading}>Craft the trek vibe</Text>
            <Text style={styles.heroSubheading}>
              Choose whos trekking with you, tailor the stay, and well
              auto-rebalance logistics for your group.
            </Text>
          </View>
          <LinearGradient
            colors={["rgba(76,194,255,0.22)", "rgba(76,194,255,0)"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={styles.heroAccent}
          />
        </MotiView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Group type</Text>
          <Text style={styles.sectionCaption}>
            Let us know whos coming along
          </Text>
        </View>
        <View style={styles.groupGrid}>
          {groupTypes.map((group, index) => {
            const selected = group.id === selectedGroup;
            return (
              <MotiView
                key={group.id}
                from={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  damping: 14,
                  delay: 120 + index * 90,
                }}
                style={styles.groupWrapper}
              >
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => setSelectedGroup(group.id)}
                >
                  <ImageBackground
                    source={{ uri: group.image }}
                    style={styles.groupCard}
                    imageStyle={{ borderRadius: 20 }}
                  >
                    <LinearGradient
                      colors={["rgba(2,11,18,0.05)", "rgba(2,11,18,0.82)"]}
                      style={StyleSheet.absoluteFill}
                    />
                    <Text style={styles.groupLabel}>{group.title}</Text>
                    {selected && (
                      <View style={styles.groupBadge}>
                        <Ionicons name="checkmark" size={16} color="#041725" />
                      </View>
                    )}
                  </ImageBackground>
                </TouchableOpacity>
              </MotiView>
            );
          })}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Add-ons</Text>
          <Text style={styles.sectionCaption}>
            Layer in services for smoother ops
          </Text>
        </View>
        <View style={styles.addonColumn}>
          {addonsList.map((item, index) => {
            const selected = activeAddons.has(item);
            return (
              <MotiView
                key={item}
                from={{ opacity: 0, translateY: 14 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: "timing",
                  duration: 320,
                  delay: 200 + index * 90,
                }}
                style={[styles.addonCard, selected && styles.addonCardActive]}
              >
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => toggleAddon(item)}
                  style={styles.addonInner}
                >
                  <View style={styles.addonTextWrap}>
                    <Text style={styles.addonTitle}>{item}</Text>
                    <Text style={styles.addonHint}>
                      {selected
                        ? "We'll build this into logistics"
                        : "Tap to include"}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.addonCheck,
                      selected && styles.addonCheckActive,
                    ]}
                  >
                    {selected && (
                      <Ionicons name="checkmark" size={16} color="#041725" />
                    )}
                  </View>
                </TouchableOpacity>
              </MotiView>
            );
          })}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Group size</Text>
          <Text style={styles.sectionCaption}>
            We recalibrate permits & crew
          </Text>
        </View>
        <MotiView
          from={{ opacity: 0, translateY: 16 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring", damping: 16, delay: 340 }}
          style={styles.counterCard}
        >
          <View>
            <Text style={styles.counterLabel}>Number of trekkers</Text>
            <Text style={styles.counterSub}>
              Ideal 4-12 for alpine conditions
            </Text>
          </View>
          <View style={styles.counterBox}>
            <TouchableOpacity
              onPress={() => setGroupSize(Math.max(1, groupSize - 1))}
              style={styles.counterBtn}
              activeOpacity={0.8}
            >
              <Ionicons name="remove" size={16} color="#E8F7FF" />
            </TouchableOpacity>
            <Text style={styles.counterValue}>{groupSize}</Text>
            <TouchableOpacity
              onPress={() => setGroupSize(groupSize + 1)}
              style={styles.counterBtn}
              activeOpacity={0.8}
            >
              <Ionicons name="add" size={16} color="#E8F7FF" />
            </TouchableOpacity>
          </View>
        </MotiView>
      </ScrollView>

      <LinearGradient
        colors={["rgba(2,11,18,0)", "rgba(2,11,18,0.92)"]}
        style={[styles.bottomGradient, { height: insets.bottom + 180 }]}
        pointerEvents="none"
      />

      {/* remove absolute position from bottom section */}
      <View
        style={[
          styles.bottomCard,
          {
            marginHorizontal: 20,
            marginBottom: insets.bottom + 40,
          },
        ]}
      >
        <View style={styles.priceRow}>
          <View>
            <Text style={styles.priceEyebrow}>Live estimate</Text>
            <Text style={styles.priceValue}>
              ₹{estimatedAmount.toLocaleString("en-IN")}
            </Text>
            <Text style={styles.priceMeta}>
              {groupSize} trekkers · {activeAddons.size} add-ons
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.ctaButton}
            onPress={() => router.push("/(trek)/details/review-package")}
          >
            <Text style={styles.ctaText}>Review My Package</Text>
            <Ionicons name="arrow-forward" size={18} color="#041725" />
          </TouchableOpacity>
        </View>
      </View>
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(232,247,255,0.12)",
    borderWidth: 1,
    borderColor: DIVIDER,
  },
  navPlaceholder: {
    width: 42,
    height: 42,
  },
  navTitleWrap: {
    alignItems: "center",
    gap: 4,
  },
  screenEyebrow: {
    color: TEXT_MUTED,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  screenTitle: {
    color: "#E8F7FF",
    fontSize: 20,
    fontWeight: "700",
  },
  heroCard: {
    marginHorizontal: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: DIVIDER,
    backgroundColor: SURFACE,
    padding: 20,
    marginBottom: 24,
    overflow: "hidden",
  },
  heroContent: {
    gap: 10,
  },
  heroHeading: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  heroSubheading: {
    color: TEXT_SUBTLE,
    fontSize: 13,
    lineHeight: 19,
  },
  heroAccent: {
    position: "absolute",
    right: -40,
    bottom: -80,
    width: 180,
    height: 180,
    transform: [{ rotate: "-28deg" }],
    opacity: 0.7,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  sectionTitle: {
    color: "#E8F7FF",
    fontSize: 16,
    fontWeight: "700",
  },
  sectionCaption: {
    color: TEXT_MUTED,
    fontSize: 12,
    marginTop: 4,
  },
  groupGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: CARD_GAP,
    paddingHorizontal: 20,
    marginBottom: 28,
  },
  groupWrapper: {
    width: GROUP_CARD_WIDTH,
  },
  groupCard: {
    height: GROUP_CARD_WIDTH * 0.8,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "flex-end",
    padding: 16,
  },
  groupLabel: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  groupBadge: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#E8F7FF",
    alignItems: "center",
    justifyContent: "center",
  },
  addonColumn: {
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  addonCard: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: DIVIDER,
    backgroundColor: SURFACE_SOFT,
  },
  addonCardActive: {
    borderColor: PRIMARY,
    backgroundColor: "rgba(76,194,255,0.18)",
  },
  addonInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 16,
    gap: 18,
  },
  addonTextWrap: {
    flex: 1,
    gap: 6,
  },
  addonTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  addonHint: {
    color: TEXT_MUTED,
    fontSize: 12,
  },
  addonCheck: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: DIVIDER,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(232,247,255,0.08)",
  },
  addonCheckActive: {
    backgroundColor: PRIMARY,
    borderColor: PRIMARY,
  },
  counterCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: DIVIDER,
    backgroundColor: SURFACE,
    paddingHorizontal: 20,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  counterLabel: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  counterSub: {
    color: TEXT_MUTED,
    fontSize: 12,
    marginTop: 4,
  },
  counterBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(232,247,255,0.08)",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: DIVIDER,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  counterBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(232,247,255,0.12)",
  },
  counterValue: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    minWidth: 28,
    textAlign: "center",
  },
  bottomGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  bottomCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: DIVIDER,
    backgroundColor: SURFACE,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 20,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 18,
  },
  priceEyebrow: {
    color: TEXT_SUBTLE,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  priceValue: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 4,
  },
  priceMeta: {
    color: TEXT_MUTED,
    fontSize: 12,
    marginTop: 4,
  },
  ctaButton: {
    backgroundColor: "#E8F7FF",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    shadowColor: "#01070C",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.24,
    shadowRadius: 14,
    elevation: 6,
  },
  ctaText: {
    color: "#041725",
    fontSize: 13,
    fontWeight: "700",
  },
});
