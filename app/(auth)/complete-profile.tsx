import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function CreateProfile() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [passion, setPassion] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  const handlePick = async () => {
    const r = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!r.canceled) setImage(r.assets[0].uri);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MotiView
        from={{ opacity: 0, translateY: 60 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 700 }}
        style={styles.card}
      >
        <Text style={styles.step}>Step 3 / 3</Text>
        <Text style={styles.title}>Create Your Profile</Text>

        <TouchableOpacity style={styles.upload} onPress={handlePick}>
          {image ? (
            <Image source={{ uri: image }} style={styles.img} />
          ) : (
            <>
              <Ionicons
                name="person-circle-outline"
                size={70}
                color="#E46C1E"
              />
              <Text style={styles.uploadText}>Upload Profile Picture</Text>
            </>
          )}
        </TouchableOpacity>

        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#8c746a"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Your Passion (craft, culture, etc.)"
          placeholderTextColor="#8c746a"
          multiline
          value={passion}
          onChangeText={setPassion}
          style={[styles.input, { height: 80, textAlignVertical: "top" }]}
        />

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Profile Visibility</Text>
          <Switch
            value={isVisible}
            onValueChange={setIsVisible}
            trackColor={{ false: "#ccc", true: "#E46C1E" }}
            thumbColor="#fff"
          />
        </View>

        <TouchableOpacity
          style={styles.next}
          onPress={() => router.push("/(auth)/animations")}
        >
          <Text style={styles.nextText}>Complete Profile</Text>
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
  upload: { alignItems: "center", marginVertical: 15 },
  uploadText: { color: "#E46C1E", fontWeight: "700", marginTop: 5 },
  img: { width: 90, height: 90, borderRadius: 45 },
  input: {
    backgroundColor: "#fff1e7",
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: "#2b1b13",
    marginTop: 10,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  switchLabel: { color: "#2b1b13", fontSize: 15 },
  next: {
    backgroundColor: "#E46C1E",
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 10,
  },
  nextText: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 16,
  },
});
