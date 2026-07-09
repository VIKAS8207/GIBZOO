import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useGlobalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';

export default function ProfileScreen() {
  const router = useRouter();
  
  // GLOBALLY CATCH THE ROLE FROM LOGIN
  const { userRole } = useGlobalSearchParams();
  const role = (userRole as string) || "Gate Officer"; // Default fallback

  const handleLogout = () => {
    router.replace('/');
  };

  // Determine Identity based on role
  const userName = role === "Gate Officer" ? "Admin User" : role === "Guide" ? "Amit Sharma" : "Rahul Verma";
  const userEmail = `${role.toLowerCase().replace(' ', '')}@gibzoo.com`;
  const userId = role === "Gate Officer" ? "ID: GZ-001" : role === "Guide" ? "ID: GZ-842" : "ID: GZ-913";

  // ==========================================
  // DYNAMIC LIST ITEMS (Role Specific Detail)
  // ==========================================
  const renderListDetail = () => {
    let icon, title, subtitle;
    if (role === "Guide") {
      icon = "language"; title = "Languages"; subtitle = "English, Hindi";
    } else if (role === "Driver") {
      icon = "car-sport"; title = "Assigned Vehicle"; subtitle = "Safari Jeep (Open)";
    } else {
      icon = "time"; title = "Current Shift"; subtitle = "08:00 AM - 04:00 PM";
    }

    return (
      <View className="py-5 border-b border-zinc-100 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View className="w-12 h-12 bg-[#F4F4F5] rounded-full items-center justify-center mr-4">
            <Ionicons name={icon as any} size={18} color="black" />
          </View>
          <View>
            <Text className="text-black font-black text-base mb-0.5">{title}</Text>
            <Text className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">{subtitle}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white w-full h-screen">
      
      {/* ==========================================
          LAYER 1: The Purple Header (Clean & Contained)
      ========================================== */}
      <Animated.View entering={FadeInDown.duration(600)} className="bg-[#E6E5F3] pt-20 pb-10 px-6 rounded-b-[40px] z-20">
        
        {/* Top Options */}
        <View className="flex-row justify-between items-center mb-6">
          <View className="bg-black px-4 py-1.5 rounded-full shadow-sm">
            <Text className="text-white font-extrabold text-[10px] uppercase tracking-widest">{role}</Text>
          </View>
          <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm">
            <Ionicons name="pencil" size={16} color="black" />
          </TouchableOpacity>
        </View>

        {/* Profile Identity */}
        <View className="flex-row items-center mt-2">
          <View className="w-20 h-20 bg-black rounded-full items-center justify-center mr-5 border-4 border-white shadow-sm">
            <Ionicons name="person" size={32} color="white" />
          </View>
          <View>
            <Text className="text-black font-black text-3xl tracking-tight">{userName}</Text>
            <Text className="text-zinc-600 font-bold text-xs mt-1">{userId}</Text>
            <Text className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest mt-1.5">{userEmail}</Text>
          </View>
        </View>
      </Animated.View>

      {/* ==========================================
          LAYER 2: Minimalist Menu List
      ========================================== */}
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6 pt-6">
        
        <Animated.View entering={FadeInUp.delay(100).springify()}>
          
          {/* Role Specific Detail Row */}
          {renderListDetail()}

          {/* Standard Menu Items */}
          <TouchableOpacity className="py-5 border-b border-zinc-100 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-[#F4F4F5] rounded-full items-center justify-center mr-4">
                <Ionicons name="help-buoy" size={18} color="black" />
              </View>
              <Text className="text-black font-black text-base">Help & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#a1a1aa" />
          </TouchableOpacity>

          <TouchableOpacity className="py-5 border-b border-zinc-100 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-[#F4F4F5] rounded-full items-center justify-center mr-4">
                <Ionicons name="document-text" size={18} color="black" />
              </View>
              <Text className="text-black font-black text-base">Terms of Service</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#a1a1aa" />
          </TouchableOpacity>

          <TouchableOpacity className="py-5 border-b border-zinc-100 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-[#F4F4F5] rounded-full items-center justify-center mr-4">
                <Ionicons name="shield-checkmark" size={18} color="black" />
              </View>
              <Text className="text-black font-black text-base">Privacy Policy</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#a1a1aa" />
          </TouchableOpacity>

          {/* Secure Logout */}
          <TouchableOpacity onPress={handleLogout} className="py-6 flex-row items-center mt-2">
            <View className="w-12 h-12 bg-red-50 border border-red-100 rounded-full items-center justify-center mr-4">
              <Ionicons name="log-out" size={20} color="#ef4444" />
            </View>
            <Text className="text-[#ef4444] font-black text-base">Secure Logout</Text>
          </TouchableOpacity>

        </Animated.View>

        {/* Bottom spacer for floating navigation bar */}
        <View className="h-24" />

      </ScrollView>
    </View>
  );
}