import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Onboarding screens */}
      <Stack.Screen name="(tabs)/home" options={{ headerShown: false }} />

      <Stack.Screen name="(auth)/animations" />

      {/* Auth flow group */}
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />

      {/* Main app tabs group */}
      {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
