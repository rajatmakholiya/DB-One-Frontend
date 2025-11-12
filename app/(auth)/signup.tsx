import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export const options = { headerShown: false };
export default function SignupScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>Devbhoomi One</Text>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>
        Join Devbhoomi One to explore culture, community, and handcrafted goods.
      </Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        placeholderTextColor="#8c746a"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        placeholderTextColor="#8c746a"
        secureTextEntry
      />
      <TextInput
        placeholder="Confirm Password"
        style={styles.input}
        placeholderTextColor="#8c746a"
        secureTextEntry
      />

      <TouchableOpacity style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Sign Up</Text>
      </TouchableOpacity>

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

      <Text style={styles.footer}>
        Already have an account?{" "}
        <Text style={styles.link} onPress={() => router.push("/(auth)/login")}>
          Sign In
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  brand: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    color: "#3c2c23",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#2b1b13",
    textAlign: "center",
    marginTop: 10,
  },
  subtitle: {
    textAlign: "center",
    color: "#6d5c52",
    fontSize: 14,
    marginVertical: 12,
  },
  input: {
    backgroundColor: "#fff1e7",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginTop: 12,
    color: "#3c2c23",
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
  primaryButton: {
    backgroundColor: "#E46C1E",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 20,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  footer: {
    marginTop: 25,
    textAlign: "center",
    color: "#3c2c23",
  },
  link: {
    color: "#E46C1E",
    fontWeight: "700",
  },
});
