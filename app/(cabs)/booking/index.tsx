import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import React, { useMemo, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
type Field = "pickup" | "drop" | null;

const recentPlaces = [
  { title: "Home", addr: "Bhimtal, Nainital" },
  { title: "Office", addr: "Mall Road, Nainital" },
  { title: "College", addr: "Kumaon University, Nainital" },
  { title: "Market", addr: "Tibetan Market, Nainital" },
];

const aiPlaces = [
  { title: "Ranikhet Bus Stand", addr: "Bus Depot Rd, Ranikhet" },
  { title: "Almora Clock Tower", addr: "Lala Bazar, Almora" },
  { title: "Kausani Tea Gardens", addr: "Tea Estate Rd, Kausani" },
  { title: "Binsar Wildlife Sanctuary", addr: "Binsar Gate, Almora" },
  { title: "Mukteshwar Temple", addr: "Temple Rd, Mukteshwar" },
];
const index = [...recentPlaces, ...aiPlaces];

export default function CabLocationScreen() {
  const insets = useSafeAreaInsets();
  const pickupRef = useRef<TextInput>(null);
  const dropRef = useRef<TextInput>(null);
  const router = useRouter();

  const [currentAddress] = useState("Mallital Bazaar Rd, Nainital"); // mock current
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [activeField, setActiveField] = useState<Field>(null);
  const [query, setQuery] = useState("");

  const isTyping = query.trim().length > 0;
  const showAISuggestions = activeField !== null && !isTyping;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return index
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) || p.addr.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [query]);

  const focusPickup = () => {
    setActiveField("pickup");
    setQuery(pickup);
    pickupRef.current?.focus();
  };
  const focusDrop = () => {
    setActiveField("drop");
    setQuery(drop);
    dropRef.current?.focus();
  };

  const onChangeActiveText = (txt: string) => {
    setQuery(txt);
    if (activeField === "pickup") setPickup(txt);
    if (activeField === "drop") setDrop(txt);
  };

  const applyPlace = (p: { title: string; addr: string }) => {
    const value = `${p.title} • ${p.addr}`;
    if (activeField === "pickup") {
      setPickup(value);
      setActiveField("drop");
      setQuery("");
      dropRef.current?.focus();
    } else {
      setDrop(value);
      setActiveField(null);
      setQuery("");
    }
  };

  const useGPS = () => {
    setPickup(currentAddress);
    setActiveField("drop");
    setQuery("");
    dropRef.current?.focus();
  };

  const clearPickup = () => {
    setPickup("");
    setActiveField("pickup");
    setQuery("");
    pickupRef.current?.focus();
  };
  const clearDrop = () => {
    setDrop("");
    setActiveField("drop");
    setQuery("");
    dropRef.current?.focus();
  };

  const ContinueBtn = () => (
    <View
      style={[
        styles.footerContainer,
        { paddingBottom: Math.max(insets.bottom, 14) },
      ]}
    >
      <View style={styles.footerBackground} />
      <TouchableOpacity
        style={[styles.continueBtn, !(pickup && drop) && { opacity: 0.6 }]}
        disabled={!(pickup && drop)}
        onPress={() => router.push("/(cabs)/booking/customize-ride")}
      >
        <Text style={styles.continueText}>Continue to Booking 🌄</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fffdf7" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
        {/* header */}
        <MotiView
          from={{ opacity: 0, translateY: -6 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 320 }}
        >
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.header}>Where to?</Text>
              <Text style={styles.status}>🟢 Online</Text>
            </View>
            <View style={styles.addrBubble}>
              <Ionicons name="navigate-outline" size={16} color="#E46C1E" />
              <Text numberOfLines={1} style={styles.addrText}>
                {currentAddress}
              </Text>
            </View>
          </View>
        </MotiView>

        {/* inputs */}
        <MotiView
          from={{ opacity: 0, translateY: 8 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 340, delay: 70 }}
          style={styles.searchBox}
        >
          {/* pickup */}
          <View style={styles.inputRow}>
            <View style={styles.dotGreen} />
            <TextInput
              ref={pickupRef}
              placeholder="Pickup location"
              placeholderTextColor="#7c7c7c"
              value={pickup}
              onFocus={focusPickup}
              onChangeText={onChangeActiveText}
              style={styles.input}
            />
            {!!pickup && (
              <TouchableOpacity onPress={clearPickup} style={styles.clearBtn}>
                <Ionicons name="close-circle" size={18} color="#b7b7b7" />
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.gpsBtn} onPress={useGPS}>
              <Ionicons name="location-outline" size={18} color="#E46C1E" />
              <Text style={styles.gpsText}>Use GPS</Text>
            </TouchableOpacity>
          </View>
          {/* drop */}
          <View style={styles.inputRow}>
            <View style={styles.dotRed} />
            <TextInput
              ref={dropRef}
              placeholder="Where to?"
              placeholderTextColor="#7c7c7c"
              value={drop}
              onFocus={focusDrop}
              onChangeText={onChangeActiveText}
              style={styles.input}
            />
            {!!drop && (
              <TouchableOpacity onPress={clearDrop} style={styles.clearBtn}>
                <Ionicons name="close-circle" size={18} color="#b7b7b7" />
              </TouchableOpacity>
            )}
          </View>

          {/* autocomplete */}
          {isTyping && results.length > 0 && (
            <View style={styles.autocompletePanel}>
              <FlatList
                keyboardShouldPersistTaps="always"
                data={results}
                keyExtractor={(item, i) => item.title + i}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.resultRow}
                    onPress={() => applyPlace(item)}
                  >
                    <Ionicons name="location-outline" size={18} color="#666" />
                    <View style={{ marginLeft: 10 }}>
                      <Text style={styles.resultTitle}>{item.title}</Text>
                      <Text style={styles.resultAddr}>{item.addr}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </MotiView>

        {/* scroll area */}
        <ScrollView
          contentContainerStyle={{ paddingBottom: 160 }}
          showsVerticalScrollIndicator={false}
        >
          {showAISuggestions && (
            <MotiView
              from={{ opacity: 0, translateY: 8 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "timing", duration: 300 }}
            >
              <Text style={styles.sectionTitle}>🤖 AI Suggestions</Text>
              <View style={styles.aiGrid}>
                {aiPlaces.map((p, i) => (
                  <TouchableOpacity
                    key={i}
                    style={styles.aiChip}
                    onPress={() => applyPlace(p)}
                  >
                    <Text style={styles.aiText}>{p.title}</Text>
                    <Text style={styles.aiSub}>{p.addr}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </MotiView>
          )}

          <MotiView
            from={{ opacity: 0, translateY: 8 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 320, delay: 80 }}
          >
            <Text style={styles.sectionTitle}>Recent & Saved</Text>
            <View style={styles.recentGrid}>
              {recentPlaces.map((p, i) => (
                <MotiView
                  key={i}
                  from={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "timing", duration: 220, delay: i * 60 }}
                  style={styles.recentCard}
                >
                  <Ionicons name="location-outline" size={18} color="#E46C1E" />
                  <View style={{ marginLeft: 8 }}>
                    <Text style={styles.placeTitle}>{p.title}</Text>
                    <Text style={styles.placeDesc}>{p.addr}</Text>
                  </View>
                </MotiView>
              ))}
            </View>
          </MotiView>
        </ScrollView>

        <ContinueBtn />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 18 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: { fontSize: 22, fontFamily: "Poppins-Bold", color: "#222" },
  status: { fontSize: 13, color: "#7a7a7a", marginTop: 2 },
  addrBubble: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff7ef",
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    maxWidth: "55%",
  },
  addrText: {
    color: "#333",
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    marginLeft: 4,
  },

  searchBox: {
    backgroundColor: "#fafafa",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    marginTop: 10,
  },
  inputRow: { flexDirection: "row", alignItems: "center", marginVertical: 6 },
  dotGreen: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#00c853",
    marginRight: 10,
  },
  dotRed: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#e53935",
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#262626",
    fontFamily: "Poppins-Medium",
    paddingVertical: 8,
  },
  clearBtn: { padding: 6 },
  gpsBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff4ea",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginLeft: 6,
  },
  gpsText: {
    marginLeft: 6,
    color: "#E46C1E",
    fontFamily: "Poppins-SemiBold",
    fontSize: 13,
  },

  autocompletePanel: {
    marginTop: 10,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#eee",
    maxHeight: 240,
    overflow: "hidden",
  },
  resultRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#f0f0f0",
  },
  resultTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#1e1e1e",
  },
  resultAddr: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#6d6d6d",
    marginTop: 1,
  },

  sectionTitle: {
    fontSize: 15,
    fontFamily: "Poppins-SemiBold",
    color: "#444",
    marginTop: 16,
    marginBottom: 8,
  },
  aiGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  aiChip: {
    width: (width - 18 * 2 - 10) / 2,
    backgroundColor: "#f9f6f0",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  aiText: { fontFamily: "Poppins-SemiBold", fontSize: 13, color: "#333" },
  aiSub: {
    fontFamily: "Poppins-Regular",
    fontSize: 11,
    color: "#7b7b7b",
    marginTop: 2,
  },
  recentGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  recentCard: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  placeTitle: {
    fontSize: 14,
    color: "#1e1e1e",
    fontFamily: "Poppins-SemiBold",
  },
  placeDesc: { fontSize: 12, color: "#777" },
  footerContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  footerBackground: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
    backgroundColor: "#fffdf7",
    borderTopWidth: 1,
    borderColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  continueBtn: {
    width: width - 36,
    backgroundColor: "#E46C1E",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    shadowColor: "#E46C1E",
    shadowOpacity: 0.28,
    shadowRadius: 10,
  },
  continueText: {
    color: "#fffdf7",
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
  },
});
