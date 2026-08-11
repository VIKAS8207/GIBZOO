import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Tabs, useRouter, usePathname, useGlobalSearchParams } from 'expo-router'; 
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function TabLayout() {
  const router = useRouter();
  const pathname = usePathname(); 
  
  // 1. Role Identification
  const { userRole } = useGlobalSearchParams();
  const role = (userRole as string) || "Gate Officer";
  
  // Create strict boolean checks for each role
  const isGateOfficer = role === "Gate Officer";
  const isStaff = role === "Guide" || role === "Driver";
  const isTicket = role === "Ticket";
  
  const isHome = pathname === '/' || pathname === '/home';

  // 2. Gate Officer Camera State
  const [isCameraVisible, setCameraVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const handleOpenScanner = async () => {
    if (!permission?.granted) {
      const { granted } = await requestPermission();
      if (!granted) return; 
    }
    setCameraVisible(true);
  };

  const handleSimulateScan = () => {
    setCameraVisible(false);
    router.push('/ticket-details'); 
  };

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false, 
          tabBarShowLabel: false, 
          tabBarStyle: {
            backgroundColor: '#FFFFFF', 
            borderTopWidth: 0, 
            elevation: 0, 
            shadowOpacity: 0.05, 
            height: Platform.OS === 'ios' ? 85 : 65,
          },
          tabBarItemStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: Platform.OS === 'ios' ? 10 : 0, 
          },
          tabBarActiveTintColor: '#000000', 
          tabBarInactiveTintColor: '#a1a1aa', 
        }}
      >
        {/* ==========================================
            TAB 1: HOME (Visible to everyone)
        ========================================== */}
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />
            ),
          }}
        />
        
        {/* ==========================================
            TAB 2: MASTER (Gate Officer ONLY)
            This uses the spread operator (...) to prevent the Expo Crash.
        ========================================== */}
        <Tabs.Screen
          name="master" 
          options={{
            ...(isGateOfficer 
              ? {
                  // IF Gate Officer: Show the tab, and apply the morphing "New" button logic
                  title: isHome ? 'Master' : 'New',
                  tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? "cube" : "cube-outline"} size={26} color={color} />
                  ),
                  tabBarButton: isHome ? undefined : (props: any) => (
                    <TouchableOpacity 
                      {...props} 
                      onPress={handleOpenScanner} 
                      activeOpacity={0.8}
                      className="flex-1 items-center justify-center"
                    >
                      <View className="bg-[#18181b] px-10 py-2.5 rounded-full flex-row items-center shadow-sm">
                        <Ionicons name="add" size={16} color="white" />
                        <Text className="text-white font-bold text-sm ml-1 tracking-wide">New</Text>
                      </View>
                    </TouchableOpacity>
                  )
                }
              : {
                  // IF NOT Gate Officer: Hide completely. Never mix 'href' with 'tabBarButton'
                  href: null 
                }
            )
          }}
        />

        {/* ==========================================
            TAB 2: HISTORY (Ticket Role ONLY)
        ========================================== */}
        <Tabs.Screen
          name="history"
          options={{
            ...(isTicket 
              ? {
                  // IF Ticket Maker: Show normal static history tab
                  title: 'History',
                  tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? "receipt" : "receipt-outline"} size={24} color={color} />
                  ),
                }
              : {
                  // IF NOT Ticket Maker: Hide completely
                  href: null
                }
            )
          }}
        />

        {/* ==========================================
            TAB 2: WALLET (Staff ONLY)
        ========================================== */}
        <Tabs.Screen
          name="wallet" 
          options={{
            ...(isStaff 
              ? {
                  // IF Guide/Driver: Show normal static wallet tab
                  title: 'Wallet',
                  tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? "wallet" : "wallet-outline"} size={26} color={color} />
                  ),
                }
              : {
                  // IF NOT Staff: Hide completely
                  href: null
                }
            )
          }}
        />

        {/* ==========================================
            TAB 3: PROFILE (Visible to everyone)
        ========================================== */}
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? "person" : "person-outline"} size={24} color={color} />
            ),
          }}
        />

        {/* ==========================================
            HIDDEN TABS (Fixes terminal warnings)
        ========================================== */}
        <Tabs.Screen name="guides" options={{ href: null }} />
        <Tabs.Screen name="drivers" options={{ href: null }} />
      </Tabs>

      {/* GATE OFFICER ONLY: Full Screen QR Scanner Overlay */}
      {isCameraVisible && isGateOfficer && (
        <Animated.View entering={FadeIn.duration(300)} className="absolute top-0 left-0 right-0 bottom-0 z-50 bg-[#050505]/95">
          <CameraView className="w-full h-full absolute" facing="back" />
          <View className="absolute top-0 left-0 right-0 bottom-0 justify-between p-8 pt-20 pb-16">
            <View className="items-center">
              <Text className="text-white font-bold text-sm tracking-widest uppercase bg-black/80 px-6 py-3 rounded-full border border-white/20 shadow-lg">
                Scan Ticket QR
              </Text>
            </View>
            <View className="items-center">
              <TouchableOpacity onPress={handleSimulateScan} className="bg-white px-8 py-4 rounded-full mb-6 flex-row items-center shadow-xl">
                <Ionicons name="scan-circle" size={24} color="black" className="mr-2" />
                <Text className="text-black font-extrabold ml-1 text-base uppercase tracking-wider">Simulate Scan</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCameraVisible(false)} className="bg-black/80 p-4 rounded-full border border-white/20">
                <Ionicons name="close" size={32} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      )}
    </>
  );
}