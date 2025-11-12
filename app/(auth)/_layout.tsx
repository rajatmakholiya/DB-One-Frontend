import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="enter-mobile" />
      <Stack.Screen name="verify-otp" />
      <Stack.Screen name="personalize-experience" />
      <Stack.Screen name="select-purpose" />
      <Stack.Screen name="complete-profile" />
      <Stack.Screen name="animations" /> {/* creating magic */}
    </Stack>
  );
}
