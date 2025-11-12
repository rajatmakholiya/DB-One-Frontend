import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function VerifyOTPScreen() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const inputsRef = useRef<TextInput[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (text: string, index: number) => {
    if (/[^0-9]/.test(text)) return; // only digits
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move focus to next box automatically
    if (text && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    // If all 6 digits are filled
    if (index === otp.length - 1 && text) {
      Keyboard.dismiss();
      const enteredOtp = newOtp.join("");
      if (enteredOtp === "123456") {
        showSuccess();
      } else {
        showError();
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const showSuccess = () => {
    if (Platform.OS === "android") {
      ToastAndroid.show("✅ Verification successful", ToastAndroid.SHORT);
    } else {
      Alert.alert("Verification successful");
    }

    setTimeout(() => {
      router.push("/(auth)/personalize-experience");
    }, 1000);
  };

  const showError = () => {
    if (Platform.OS === "android") {
      ToastAndroid.show("❌ Invalid OTP", ToastAndroid.SHORT);
    } else {
      Alert.alert("Invalid OTP");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={22} color="#2b1b13" />
        </TouchableOpacity>

        <Text style={styles.title}>OTP Verification</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit code we just sent to your mobile number.
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, i) => (
            <TextInput
              key={i}
              ref={(ref) => (inputsRef.current[i] = ref!)}
              value={digit}
              onChangeText={(text) => handleChange(text, i)}
              onKeyPress={(e) => handleKeyPress(e, i)}
              style={styles.otpBox}
              keyboardType="number-pad"
              maxLength={1}
              autoFocus={i === 0}
            />
          ))}
        </View>

        <Text style={styles.timerText}>
          {timer > 0
            ? `Resend code in 00:${timer < 10 ? `0${timer}` : timer}`
            : ""}
        </Text>

        {timer === 0 && (
          <TouchableOpacity onPress={() => setTimer(30)}>
            <Text style={styles.resendText}>Resend OTP</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => {
            Keyboard.dismiss();
            const enteredOtp = otp.join("");
            enteredOtp === "123456" ? showSuccess() : showError();
          }}
        >
          <Text style={styles.primaryText}>Verify</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.secondaryButton]}
          onPress={() => router.push("/(auth)/enter-mobile")}
        >
          <Text style={styles.secondaryText}>Change mobile number</Text>
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
  backButton: { alignSelf: "flex-start" },
  title: { fontSize: 22, fontWeight: "800", color: "#2b1b13", marginTop: 5 },
  subtitle: {
    color: "#6d5c52",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
  },
  otpBox: {
    backgroundColor: "#fff1e7",
    width: 45,
    height: 55,
    textAlign: "center",
    borderRadius: 10,
    fontSize: 20,
    color: "#2b1b13",
  },
  timerText: { color: "#333", fontSize: 14 },
  resendText: { color: "#E46C1E", fontWeight: "700", marginTop: 10 },
  primaryButton: {
    backgroundColor: "#E46C1E",
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  primaryText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  secondaryButton: {
    backgroundColor: "#fff1e7",
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  secondaryText: { color: "#2b1b13", fontWeight: "700", fontSize: 15 },
});
