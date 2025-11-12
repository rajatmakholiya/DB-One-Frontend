import { useRouter } from "expo-router";
import { MotiView } from "moti";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const interests = [
  "Handicrafts",
  "Woolens",
  "Organic Products",
  "Cultural Experiences",
  "Local Art",
  "Traditional Clothing",
  "Home Decor",
  "Food & Beverages",
  "Trekking & Tours",
  "Community & Forums",
  "Supporting Artisans",
];

export default function PersonalizeExperience() {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();

  const toggle = (item: string) =>
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <MotiView
        from={{ opacity: 0, translateY: 40 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 700 }}
        style={styles.card}
      >
        <Text style={styles.step}>Step 1 / 3</Text>
        <Text style={styles.title}>Personalize your experience</Text>
        <Text style={styles.subtitle}>
          Select interests to tailor your KumaonBazaar feed.
        </Text>

        <View style={styles.grid}>
          {interests.map((i) => {
            const isSelected = selected.includes(i);
            return (
              <MotiView
                key={i}
                from={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "timing", duration: 300 }}
              >
                <Pressable
                  onPress={() => toggle(i)}
                  style={[styles.tag, isSelected && styles.tagSelected]}
                >
                  <Text
                    style={[
                      styles.tagText,
                      isSelected && styles.tagTextSelected,
                    ]}
                  >
                    {i}
                  </Text>
                </Pressable>
              </MotiView>
            );
          })}
        </View>

        <TouchableOpacity
          style={[styles.next, !selected.length && { opacity: 0.6 }]}
          disabled={!selected.length}
          onPress={() => router.push("/(auth)/select-purpose")}
        >
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </MotiView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f5f2",
    paddingVertical: 60,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: "90%",
    padding: 25,
  },
  step: { color: "#E46C1E", fontWeight: "700", marginBottom: 8 },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#2b1b13",
    textAlign: "center",
  },
  subtitle: { color: "#6d5c52", textAlign: "center", marginVertical: 12 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginTop: 10,
  },
  tag: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#FFF6EE",
  },
  tagSelected: {
    backgroundColor: "#FFE1C1",
    borderWidth: 1,
    borderColor: "#E46C1E55",
  },
  tagText: { color: "#2b1b13", fontSize: 14 },
  tagTextSelected: { color: "#8A3C00", fontWeight: "700" },
  next: {
    backgroundColor: "#E46C1E",
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 30,
  },
  nextText: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 16,
  },
});
