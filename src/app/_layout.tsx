import { Stack } from "expo-router";
import "../global.css"; 

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* 1. Get Started Screen */}
      <Stack.Screen name="index" />
      
      {/* 2. Login Screen (Our renamed file) */}
      <Stack.Screen name="login" />
      
      {/* 3. The Tabs & Detail Screens */}
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="history" />
      <Stack.Screen name="guides" />
      <Stack.Screen name="drivers" />
      <Stack.Screen name="ticket-details" />
    </Stack>
  );
}