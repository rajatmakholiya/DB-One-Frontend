import { useRouter } from "expo-router";
import { MotiView } from "moti";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const sections = [
  {
    title: "Local Commerce",
    purposes: [
      "Shop local & handcrafted goods",
      "Promote my local business",
      "Connect with artisans & community",
    ],
  },
  {
    title: "Travel & Rentals",
    purposes: [
      "Book treks or travel experiences",
      "Find rentals or stays",
      "Rent vehicles or adventure equipment",
    ],
  },
  {
    title: "Community & Culture",
    purposes: [
      "Explore local news & events",
      "Join cultural programs & festivals",
      "Support local causes or NGOs",
    ],
  },
  {
    title: "Government & Utilities",
    purposes: [
      "Discover government & cultural programs",
      "Pay bills or renew services",
      "Access public schemes & benefits",
    ],
  },
];

export default function SelectPurpose() {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();

  const toggleSelection = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <MotiView
        from={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 700 }}
        style={styles.card}
      >
        <Text style={styles.step}>Step 2 / 3</Text>
        <Text style={styles.title}>Tailor Your Experience</Text>
        <Text style={styles.subtitle}>
          Select your primary purposes of using Devbhoomi One.
        </Text>

        {sections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>

            {section.purposes.map((p) => {
              const isSelected = selected.includes(p);
              return (
                <TouchableOpacity
                  key={p}
                  onPress={() => toggleSelection(p)}
                  style={[styles.option, isSelected && styles.optionSel]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && styles.optionTextSel,
                    ]}
                  >
                    {p}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}

        <TouchableOpacity
          style={[styles.next, !selected.length && { opacity: 0.6 }]}
          disabled={!selected.length}
          onPress={() => router.push("/(auth)/complete-profile")}
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
  step: {
    color: "#E46C1E",
    fontWeight: "700",
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#2b1b13",
    textAlign: "center",
  },
  subtitle: {
    color: "#6d5c52",
    textAlign: "center",
    marginVertical: 12,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3b2b22",
    marginBottom: 8,
  },
  option: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    marginVertical: 5,
    backgroundColor: "#FFF6EE",
  },
  optionSel: {
    backgroundColor: "#FFE1C1",
    borderColor: "#E46C1E88",
  },
  optionText: {
    color: "#2b1b13",
    fontSize: 15,
  },
  optionTextSel: {
    color: "#8A3C00",
    fontWeight: "700",
  },
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
