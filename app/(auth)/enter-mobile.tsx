import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function EnterMobileScreen() {
  const [mobile, setMobile] = useState("");
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={22} color="#2b1b13" />
        </TouchableOpacity>

        <Text style={styles.title}>Enter Mobile Number</Text>
        <Text style={styles.subtitle}>
          Please enter your mobile number to receive a verification code.
        </Text>

        <TextInput
          placeholder="Mobile Number"
          keyboardType="phone-pad"
          style={styles.input}
          value={mobile}
          onChangeText={setMobile}
          placeholderTextColor="#8c746a"
        />

        <TouchableOpacity
          style={[
            styles.primaryButton,
            { opacity: mobile.length < 10 ? 0.6 : 1 },
          ]}
          disabled={mobile.length < 10}
          onPress={() => router.push("/(auth)/verify-otp")}
        >
          <Text style={styles.primaryText}>Send OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f5f2",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: width * 0.9,
    padding: 25,
    alignItems: "center",
  },
  backButton: {
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#2b1b13",
    textAlign: "center",
    marginTop: 5,
  },
  subtitle: {
    color: "#6d5c52",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff1e7",
    borderRadius: 10,
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: "#2b1b13",
  },
  primaryButton: {
    backgroundColor: "#E46C1E",
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  primaryText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  bottomStrip: {
    backgroundColor: "#d9a760",
    height: 100,
    width: "120%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: 30,
  },
});
