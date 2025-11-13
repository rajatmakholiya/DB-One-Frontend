import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Auth flow group */}
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/animations" options={{ headerShown: false }} />

      {/* Stays module */}
      <Stack.Screen name="(stays)" options={{ headerShown: false }} />

      {/* Other groups */}
      <Stack.Screen name="(home)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
