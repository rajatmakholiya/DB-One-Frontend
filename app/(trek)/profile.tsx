import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { MotiText, MotiView } from "moti";
import React, { useMemo, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

/* ---------------- THEME (same schema) ---------------- */
const BG_GRADIENT = ["#030A12", "#041725"];
const BG = "#020B12";
const SURFACE = "rgba(15,38,56,0.70)";
const SURFACE_SOFT = "rgba(15,38,56,0.55)";
const BORDER = "rgba(76,151,189,0.22)";
const TEXT = "#EEF7FF";
const TEXT_MUTED = "#7EA4BA";
const ACCENT = "#4CC2FF";
const SUCCESS = "#70D29C";
const WARNING = "#FFD166";

/* ---------------- MOCK DATA ---------------- */
const initialChecklist = [
  { id: "boots", label: "Trekking Boots", checked: true },
  { id: "bag", label: "Backpack (30-40L)", checked: true },
  { id: "water", label: "Water Bottle/Bladder", checked: false },
  { id: "sunscreen", label: "Sunscreen & Hat", checked: true },
];

const activeTrek = {
  title: "Valley of Flowers Trek",
  days: 5,
  done: 3,
  cover:
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&q=80&w=800",
};

const pastTreks = [
  {
    title: "Kedarnath Trek",
    tag: "Spiritual Journey",
    rating: 5.0,
    date: "Aug 2023",
    cover:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&q=80&w=800",
  },
  {
    title: "Roopkund Trek",
    tag: "Glacial Lake",
    rating: 4.8,
    date: "Jun 2023",
    cover:
      "https://images.unsplash.com/photo-1521207418485-99c705420785?auto=format&q=80&w=800",
  },
  {
    title: "Nag Tibba Trek",
    tag: "Weekend Summit",
    rating: 4.7,
    date: "Jan 2023",
    cover:
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&q=80&w=800",
  },
];

/* ---------------- COMPONENT ---------------- */
export default function ProfileScreen() {
  const router = useRouter();

  const [tab, setTab] = useState<"Active" | "Past">("Active");
  const [checklist, setChecklist] = useState(initialChecklist);
  const [newItem, setNewItem] = useState("");
  const [difficulty, setDifficulty] = useState<"Easy" | "Moderate">("Easy");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [avatarScale, setAvatarScale] = useState(1);
  const [activeMediaTab, setActiveMediaTab] = useState<
    "Posts" | "Tags" | "Videos"
  >("Posts");
  const progressPct = useMemo(
    () => Math.round((activeTrek.done / activeTrek.days) * 100),
    []
  );

  function toggleItem(id: string) {
    setChecklist((prev) =>
      prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i))
    );
  }

  function addItem(label: string) {
    const trimmed = label.trim();
    if (!trimmed) return;
    setChecklist((prev) => [
      ...prev,
      { id: `${Date.now()}`, label: trimmed, checked: false },
    ]);
    setNewItem("");
  }

  // Local "AI" suggestion (rule-based; replace with your API later)
  function suggestWithAI() {
    const base: string[] =
      difficulty === "Easy"
        ? ["Light Fleece", "Extra Socks", "Energy Bars"]
        : ["Trekking Poles", "Thermal Layer", "Rain Poncho"];

    // context-aware: add hydration/sun based on season guess
    const contextual = ["Electrolyte Sachets", "Mini First-Aid Kit"];
    const suggestions = [...base, ...contextual].filter(
      (s) => !checklist.some((c) => c.label.toLowerCase() === s.toLowerCase())
    );

    // add the first 2 unique suggestions
    suggestions.slice(0, 2).forEach(addItem);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={BG_GRADIENT} style={StyleSheet.absoluteFill} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color={TEXT} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        <View style={{ position: "relative" }}>
          <Image
            source={{
              uri: "https://tse3.mm.bing.net/th/id/OIP.5fEZvYSxwaZgQVAP0nNzCQHaE7?cb=12&pid=Api",
            }}
            style={{ width, height: 220 }}
          />
          <LinearGradient
            colors={["rgba(0,0,0,0.4)", "transparent", BG]}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 220,
            }}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              left: 16,
              top: 50,
              backgroundColor: "rgba(0,0,0,0.4)",
              borderRadius: 20,
              padding: 4,
            }}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </TouchableOpacity>
          <Text
            style={{
              position: "absolute",
              top: 50,
              alignSelf: "center",
              color: TEXT,
              fontSize: 20,
              fontWeight: "700",
            }}
          >
            Profile
          </Text>

          {/* Centered Avatar */}
          <View
            style={{
              position: "absolute",
              bottom: -40,
              alignSelf: "center",
              borderWidth: 3,
              borderColor: BG,
              borderRadius: 60,
            }}
          >
            <Pressable onPress={() => setIsModalVisible(true)}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&q=80&w=256",
                }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                }}
              />
            </Pressable>
          </View>
        </View>
        <View style={{ height: 60 }} />

        {/* Profile Info */}
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text style={{ color: TEXT, fontSize: 18, fontWeight: "700" }}>
            Anya Sharma
          </Text>
          <Text style={{ color: TEXT_MUTED, marginTop: 4 }}>
            Intermediate Trekker | Dehradun
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#D1FADF",
              paddingHorizontal: 20,
              paddingVertical: 8,
              borderRadius: 20,
              marginTop: 10,
            }}
          >
            <Text style={{ color: "#166534", fontWeight: "700" }}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <MotiView
          from={{ opacity: 0, translateY: 14 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 120 }}
          style={styles.statsRow}
        >
          <StatCard value="5" label="Treks Completed" />
          <StatCard value="3" label="Favorite Trails" />
          <StatCard value="2" label="Reviews Written" />
        </MotiView>

        {/* Posts | Tags | Videos */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginVertical: 16,
          }}
        >
          {["Posts", "Tags", "Videos"].map((t) => {
            const active = activeMediaTab === t;
            return (
              <TouchableOpacity
                key={t}
                onPress={() => setActiveMediaTab(t as any)}
              >
                <Text
                  style={{
                    color: active ? ACCENT : TEXT_MUTED,
                    fontWeight: "700",
                  }}
                >
                  {t}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {activeMediaTab === "Posts" && (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              paddingHorizontal: 16,
            }}
          >
            {[
              "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&q=80&w=400",
              "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&q=80&w=400",
              "https://tse3.mm.bing.net/th/id/OIP.5fEZvYSxwaZgQVAP0nNzCQHaE7?cb=12&pid=Api",
            ].map((url) => (
              <Image
                key={url}
                source={{ uri: url }}
                style={{
                  width: width / 3 - 12,
                  height: 110,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              />
            ))}
          </View>
        )}

        {activeMediaTab === "Tags" && (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              paddingHorizontal: 16,
            }}
          >
            {[
              "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&q=80&w=400",
              "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&q=80&w=400",
              "https://tse3.mm.bing.net/th/id/OIP.5fEZvYSxwaZgQVAP0nNzCQHaE7?cb=12&pid=Api",
            ].map((url) => (
              <Image
                key={url}
                source={{ uri: url }}
                style={{
                  width: width / 3 - 12,
                  height: 110,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              />
            ))}
          </View>
        )}

        {activeMediaTab === "Videos" && (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              paddingHorizontal: 16,
            }}
          >
            {[
              "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&q=80&w=400",
              "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&q=80&w=400",
            ].map((url) => (
              <View key={url} style={{ position: "relative" }}>
                <Image
                  source={{ uri: url }}
                  style={{
                    width: width / 2.3,
                    height: 120,
                    borderRadius: 12,
                    marginBottom: 10,
                  }}
                />
                <Ionicons
                  name="play-circle"
                  size={32}
                  color="#fff"
                  style={{ position: "absolute", top: 44, left: "40%" }}
                />
              </View>
            ))}
          </View>
        )}

        {/* Active & Past Treks */}
        <SectionHeader title="Active & Past Treks" />
        <View style={styles.tabRow}>
          {(["Active", "Past"] as const).map((t) => {
            const focused = tab === t;
            return (
              <TouchableOpacity key={t} onPress={() => setTab(t)}>
                <MotiView
                  animate={{
                    backgroundColor: focused
                      ? "rgba(73,164,219,0.25)"
                      : "rgba(20,40,55,0.5)",
                    borderColor: focused ? ACCENT : "rgba(92,139,167,0.4)",
                  }}
                  transition={{ type: "timing", duration: 180 }}
                  style={styles.filterChip}
                >
                  <Text style={[styles.filterText, focused && { color: TEXT }]}>
                    {t}
                  </Text>
                </MotiView>
              </TouchableOpacity>
            );
          })}
        </View>

        {tab === "Active" ? (
          <MotiView
            from={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: 0 }}
            style={styles.activeCard}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={{ uri: activeTrek.cover }}
                style={styles.activeImg}
              />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.cardTitle}>{activeTrek.title}</Text>
                <Text style={styles.subtle}>
                  Day {activeTrek.done} of {activeTrek.days}
                </Text>

                {/* Animated Progress */}
                <View style={styles.progressBar}>
                  <MotiView
                    from={{ width: 0 }}
                    animate={{ width: `${Math.min(progressPct, 100)}%` }}
                    transition={{ type: "timing", duration: 700 }}
                    style={styles.progressFill}
                  />
                </View>
                <Text style={styles.subtle}>{progressPct}%</Text>
              </View>
            </View>
          </MotiView>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
            style={{ marginBottom: 8 }}
          >
            {pastTreks.map((t, i) => (
              <MotiView
                key={t.title}
                from={{ opacity: 0, translateY: 12 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 60 + i * 80 }}
                style={styles.pastCard}
              >
                <Image source={{ uri: t.cover }} style={styles.pastImg} />
                <Text style={styles.cardTitle} numberOfLines={1}>
                  {t.title}
                </Text>
                <Text style={styles.subtle}>{t.tag}</Text>
                <View style={styles.rowBetween}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons name="star" size={12} color={WARNING} />
                    <Text style={[styles.subtle, { marginLeft: 4 }]}>
                      {t.rating}
                    </Text>
                  </View>
                  <Text style={styles.subtle}>{t.date}</Text>
                </View>
              </MotiView>
            ))}
          </ScrollView>
        )}

        {/* Gear Checklist */}
        <SectionHeader title="My Gear Checklist" />
        <MotiView
          from={{ opacity: 0, translateY: 12 }}
          animate={{ opacity: 1, translateY: 0 }}
          style={styles.checklistCard}
        >
          <View style={styles.rowBetween}>
            <View style={styles.difficultyRow}>
              <Chip
                label="Easy (1-3 days)"
                active={difficulty === "Easy"}
                onPress={() => setDifficulty("Easy")}
              />
              <Chip
                label="Moderate"
                active={difficulty === "Moderate"}
                onPress={() => setDifficulty("Moderate")}
              />
            </View>

            {/* AI Suggest */}
            <TouchableOpacity onPress={suggestWithAI} style={styles.aiBtn}>
              <Ionicons name="sparkles-outline" size={14} color={ACCENT} />
              <Text style={styles.aiText}>AI Suggest</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 10 }}>
            {checklist.map((item, idx) => (
              <MotiView
                key={item.id}
                from={{ opacity: 0, translateY: 8 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: idx * 60 }}
                style={styles.checkRow}
              >
                <TouchableOpacity
                  onPress={() => toggleItem(item.id)}
                  style={[
                    styles.checkIcon,
                    item.checked && {
                      backgroundColor: "rgba(112,210,156,0.15)",
                      borderColor: SUCCESS,
                    },
                  ]}
                >
                  {item.checked ? (
                    <Ionicons name="checkmark" size={14} color={SUCCESS} />
                  ) : (
                    <Ionicons
                      name="ellipse-outline"
                      size={14}
                      color={TEXT_MUTED}
                    />
                  )}
                </TouchableOpacity>
                <Text
                  style={[
                    styles.checkText,
                    item.checked && { color: TEXT, textDecorationLine: "none" },
                  ]}
                >
                  {item.label}
                </Text>
              </MotiView>
            ))}
          </View>

          {/* Add custom */}
          <View style={styles.addRow}>
            <Ionicons name="add" size={18} color={ACCENT} />
            <TextInput
              placeholder="Add custom item..."
              placeholderTextColor={TEXT_MUTED}
              value={newItem}
              onChangeText={setNewItem}
              onSubmitEditing={() => addItem(newItem)}
              style={styles.input}
              returnKeyType="done"
            />
            <TouchableOpacity
              onPress={() => addItem(newItem)}
              style={styles.addBtn}
            >
              <Text style={styles.addBtnText}>Add</Text>
            </TouchableOpacity>
          </View>
        </MotiView>

        {/* Saved Packages */}
        <SectionHeader title="Saved Packages" />
        <MotiView
          from={{ opacity: 0, translateY: 12 }}
          animate={{ opacity: 1, translateY: 0 }}
          style={styles.savedCard}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1520975922284-9e0a6a1a3b5a?auto=format&q=80&w=800",
              }}
              style={styles.savedImg}
            />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={styles.cardTitle}>Kedarnath Trek</Text>
              <Text style={styles.subtle}>Spiritual journey</Text>
            </View>
            <TouchableOpacity style={styles.heartBtn}>
              <Ionicons name="heart" size={18} color="#E66" />
            </TouchableOpacity>
          </View>
        </MotiView>

        {/* Badges */}
        <SectionHeader title="Certifications & Badges" />
        <View style={styles.badgeRow}>
          <Badge label="First Aid Certified" />
          <Badge label="Mountain Safety" />
        </View>

        {/* Reviews & Community */}
        <SectionHeader title="Reviews & Community Activity" />
        <MotiView
          from={{ opacity: 0, translateY: 12 }}
          animate={{ opacity: 1, translateY: 0 }}
          style={styles.reviewCard}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&q=80&w=800",
              }}
              style={styles.reviewImg}
            />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={styles.cardTitle}>Kedarnath Trek</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="star" size={12} color={WARNING} />
                <Text style={[styles.subtle, { marginLeft: 4 }]}>5.0</Text>
              </View>
              <Text style={[styles.subtle, { marginTop: 6 }]}>
                “Amazing experience! The views were breathtaking.”
              </Text>
              <Text style={[styles.subtle, { marginTop: 6 }]}>August 2023</Text>
            </View>
          </View>
        </MotiView>
      </ScrollView>

      {/* Explore Treks CTA */}
      <View style={styles.ctaWrap}>
        <MotiView
          from={{ opacity: 0, translateY: 24 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 320 }}
          style={styles.ctaCard}
        >
          <LinearGradient
            colors={["rgba(76,194,255,0.18)", "rgba(76,194,255,0.05)"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaGradient}
          />
          <View style={styles.ctaCardContent}>
            <View style={{ flex: 1 }}>
              <Text style={styles.ctaHeading}>Explore new treks</Text>
              <Text style={styles.ctaSubtitle}>
                Curated alpine departures, updated weekly for your profile.
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push("/(trek)/explore")}
              activeOpacity={0.9}
              style={styles.ctaButton}
            >
              <Ionicons name="compass-outline" size={18} color="#041725" />
              <Text style={styles.ctaButtonText}>Discover</Text>
              <Ionicons name="arrow-forward" size={16} color="#041725" />
            </TouchableOpacity>
          </View>
        </MotiView>
      </View>
      {/* Modal Overlay for Avatar */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.85)",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setIsModalVisible(false)}
        >
          {/* <MotiView
            from={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 12 }}
          > */}
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&q=80&w=256",
            }}
            style={{
              width: width * 0.8,
              height: width * 0.8,
              borderRadius: width * 0.4,
            }}
          />
          {/* </MotiView> */}
          <TouchableOpacity
            onPress={() => setIsModalVisible(false)}
            style={{
              position: "absolute",
              top: 60,
              right: 30,
            }}
          >
            <Ionicons name="close-outline" size={32} color="#fff" />
          </TouchableOpacity>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

/* ---------------- SMALL SUB-COMPONENTS ---------------- */
function SectionHeader({ title }: { title: string }) {
  return (
    <MotiText
      from={{ opacity: 0, translateY: 8 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 220 }}
      style={styles.sectionTitle}
    >
      {title}
    </MotiText>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function Chip({
  label,
  active,
  onPress,
}: {
  label: string;
  active?: boolean;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <MotiView
        animate={{
          backgroundColor: active
            ? "rgba(73,164,219,0.25)"
            : "rgba(20,40,55,0.5)",
          borderColor: active ? ACCENT : "rgba(92,139,167,0.4)",
        }}
        transition={{ type: "timing", duration: 180 }}
        style={styles.filterChip}
      >
        <Text style={[styles.filterText, active && { color: TEXT }]}>
          {label}
        </Text>
      </MotiView>
    </TouchableOpacity>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <View style={styles.badge}>
      <Ionicons name="ribbon-outline" size={14} color={SUCCESS} />
      <Text style={styles.badgeText}>{label}</Text>
    </View>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BG },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  headerTitle: { color: TEXT, fontSize: 18, fontWeight: "700" },

  /* Profile */
  profileCard: {
    marginHorizontal: 16,
    backgroundColor: SURFACE,
    borderColor: BORDER,
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
  },
  avatarLg: { width: 64, height: 64, borderRadius: 32 },
  name: { color: TEXT, fontSize: 18, fontWeight: "700" },
  subTitle: { color: TEXT_MUTED, marginTop: 2 },
  actionRow: {
    marginTop: 14,
    flexDirection: "row",
    gap: 10,
  },
  pillBtn: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  pillText: { fontWeight: "700" },
  primaryPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F7FF",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    gap: 6,
  },
  primaryPillText: { color: "#041725", fontWeight: "800", fontSize: 13 },

  /* Stats */
  statsRow: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
    marginTop: 14,
  },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(73,164,219,0.12)",
    borderRadius: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "rgba(73,164,219,0.25)",
    alignItems: "center",
  },
  statValue: { color: TEXT, fontSize: 20, fontWeight: "800" },
  statLabel: {
    color: TEXT_MUTED,
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },

  /* Section */
  sectionTitle: {
    color: TEXT,
    fontSize: 16,
    fontWeight: "700",
    marginTop: 18,
    marginBottom: 10,
    paddingHorizontal: 16,
  },

  /* Tabs */
  tabRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 10,
  },
  filterChip: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
    height: 34,
  },
  filterText: { color: TEXT_MUTED, fontWeight: "600", fontSize: 12 },

  /* Active Card */
  activeCard: {
    marginHorizontal: 16,
    backgroundColor: SURFACE,
    borderColor: BORDER,
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
  },
  activeImg: { width: 76, height: 76, borderRadius: 12 },
  cardTitle: { color: TEXT, fontWeight: "700" },
  subtle: { color: TEXT_MUTED, marginTop: 2, fontSize: 12 },
  progressBar: {
    height: 6,
    backgroundColor: "rgba(73,164,219,0.22)",
    borderRadius: 999,
    overflow: "hidden",
    marginTop: 8,
  },
  progressFill: { height: "100%", backgroundColor: ACCENT },

  /* Past card */
  pastCard: {
    width: Math.min(220, width * 0.6),
    backgroundColor: SURFACE,
    borderColor: BORDER,
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
  },
  pastImg: { width: "100%", height: 110, borderRadius: 12, marginBottom: 8 },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  /* Checklist */
  checklistCard: {
    marginHorizontal: 16,
    backgroundColor: SURFACE,
    borderColor: BORDER,
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
  },
  difficultyRow: { flexDirection: "row", gap: 8, alignItems: "center" },
  aiBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(76,194,255,0.12)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(76,194,255,0.3)",
    gap: 6,
  },
  aiText: { color: ACCENT, fontWeight: "700", fontSize: 12 },
  checkRow: { flexDirection: "row", alignItems: "center", paddingVertical: 8 },
  checkIcon: {
    width: 22,
    height: 22,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(112,210,156,0.35)",
    marginRight: 10,
  },
  checkText: { color: TEXT, fontSize: 13 },

  addRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(20,40,55,0.45)",
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  input: {
    color: TEXT,
    flex: 1,
    marginLeft: 6,
    paddingVertical: 6,
  },
  addBtn: {
    backgroundColor: "#E8F7FF",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 6,
  },
  addBtnText: { color: "#041725", fontWeight: "800", fontSize: 12 },

  /* Saved */
  savedCard: {
    marginHorizontal: 16,
    backgroundColor: SURFACE,
    borderColor: BORDER,
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
  },
  savedImg: { width: 70, height: 70, borderRadius: 10 },
  heartBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
  },

  /* Badges */
  badgeRow: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 6,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(112,210,156,0.12)",
    borderWidth: 1,
    borderColor: "rgba(112,210,156,0.35)",
  },
  badgeText: { color: TEXT, fontWeight: "700", fontSize: 12 },

  /* Review */
  reviewCard: {
    marginHorizontal: 16,
    backgroundColor: SURFACE,
    borderColor: BORDER,
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
  },
  reviewImg: { width: 70, height: 70, borderRadius: 10 },

  /* CTA */
  ctaWrap: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 20,
  },
  ctaCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: BORDER,
    overflow: "hidden",
    backgroundColor: "rgba(232,247,255,0.05)",
  },
  ctaGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  ctaCardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  ctaHeading: {
    color: TEXT,
    fontSize: 16,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  ctaSubtitle: {
    color: TEXT_MUTED,
    fontSize: 12,
    marginTop: 4,
    lineHeight: 16,
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#E8F7FF",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
    shadowColor: "#01070C",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.24,
    shadowRadius: 12,
  },
  ctaButtonText: { color: "#041725", fontWeight: "700", fontSize: 13 },
});
