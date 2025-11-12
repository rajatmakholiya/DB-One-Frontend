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

export const options = { headerShown: false };
export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.brand}>Devbhoomi One</Text>
        <Text style={styles.title}>
          {isLogin ? "Welcome Back" : "Create Account"}
        </Text>
        <Text style={styles.subtitle}>
          {isLogin
            ? "Sign in to discover the heart of Kumaon, where culture meets community."
            : "Join KumaonBazaar to explore culture, community, and handcrafted goods."}
        </Text>

        {/* Form Inputs */}
        <TextInput
          placeholder="Email"
          placeholderTextColor="#8c746a"
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#8c746a"
          secureTextEntry
          style={styles.input}
        />
        {!isLogin && (
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#8c746a"
            secureTextEntry
            style={styles.input}
          />
        )}

        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>
            {isLogin ? "Sign In" : "Sign Up"}
          </Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.orText}>Or continue with</Text>
          <View style={styles.divider} />
        </View>

        {/* Social Buttons */}
        <TouchableOpacity
          onPress={() => router.push("/(auth)/enter-mobile")}
          style={styles.socialButton}
        >
          <Ionicons name="call-outline" size={18} color="#000" />
          <Text style={styles.socialText}>Continue with Phone</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-google" size={18} color="#000" />
          <Text style={styles.socialText}>Continue with Google</Text>
        </TouchableOpacity>

        {/* Switch between Login/Signup */}
        <Text style={styles.footerText}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <Text style={styles.linkText} onPress={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign up" : "Sign in"}
          </Text>
        </Text>
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
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    width: width * 0.9,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  brand: {
    fontSize: 28,
    fontWeight: "700",
    color: "#3c2c23",
    textAlign: "center",
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#2b1b13",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#5f4a3c",
    textAlign: "center",
    marginVertical: 10,
  },
  input: {
    backgroundColor: "#fff1e7",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginTop: 12,
    color: "#3c2c23",
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: "#E46C1E",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 20,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  orText: {
    marginHorizontal: 10,
    color: "#7b6b61",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff1e7",
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 10,
  },
  socialText: {
    fontWeight: "700",
    fontSize: 15,
    marginLeft: 8,
    color: "#2b1b13",
  },
  footerText: {
    textAlign: "center",
    marginTop: 25,
    color: "#3c2c23",
  },
  linkText: {
    color: "#E46C1E",
    fontWeight: "700",
  },
});
