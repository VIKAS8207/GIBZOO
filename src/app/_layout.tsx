import { Stack } from "expo-router";
import "../global.css"; // Ensure this import path is still correct!

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* 1. The Login Screen */}
      <Stack.Screen name="index" />
      
      {/* 2. The Tabs Group (This replaces the old dashboard!) */}
      <Stack.Screen name="(tabs)" />
      
      {/* 3. The Detail Screens */}
      <Stack.Screen name="history" />
      <Stack.Screen name="guides" />
      <Stack.Screen name="drivers" />
      <Stack.Screen name="ticket-details" />
    </Stack>
  );
}