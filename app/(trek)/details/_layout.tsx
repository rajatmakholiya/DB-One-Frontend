import { Stack } from "expo-router";
import React from "react";

export default function DetailsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: "modal", // or "modal" if you prefer modal-style
      }}
    />
  );
}
