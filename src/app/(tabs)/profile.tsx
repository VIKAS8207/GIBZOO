import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useGlobalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';

export default function ProfileScreen() {
  const router = useRouter();
  
  // 1. GLOBALLY CATCH THE ROLE FROM LOGIN
  const { userRole } = useGlobalSearchParams();
  const role = (userRole as string) || "Gate Officer"; // Default fallback

  const handleLogout = () => {
    // Navigate back to the main login screen
    router.replace('/');
  };

  // ==========================================
  // DYNAMIC ROLE DETAILS COMPONENT (EARTHY THEME)
  // ==========================================
  const renderRoleDetails = () => {
    switch (role) {
      case "Guide":
        return (
          <View className="bg-white p-6 rounded-3xl border-2 border-[#D4A373]/40 mb-8 shadow-xl shadow-[#8B5A2B]/10">
            <Text className="text-[#8B5A2B] font-black uppercase tracking-widest text-xs mb-5">Professional Details</Text>
            
            <View className="flex-row items-center justify-between mb-4 pb-4 border-b-2 border-[#F9DCB4]/30">
              <Text className="text-[#A07A63] font-bold">Languages</Text>
              <Text className="text-[#4A3728] font-black">English, Hindi</Text>
            </View>
            <View className="flex-row items-center justify-between mb-4 pb-4 border-b-2 border-[#F9DCB4]/30">
              <Text className="text-[#A07A63] font-bold">Current Rating</Text>
              <View className="flex-row items-center">
                <Ionicons name="star" size={16} color="#D4A373" />
                <Text className="text-[#4A3728] font-black ml-1.5">4.8 / 5.0</Text>
              </View>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-[#A07A63] font-bold">Total Tours</Text>
              <Text className="text-[#8B5A2B] font-black text-xl">142</Text>
            </View>
          </View>
        );
        
      case "Driver":
        return (
          <View className="bg-white p-6 rounded-3xl border-2 border-[#D4A373]/40 mb-8 shadow-xl shadow-[#8B5A2B]/10">
            <Text className="text-[#8B5A2B] font-black uppercase tracking-widest text-xs mb-5">Vehicle Details</Text>
            
            <View className="flex-row items-center justify-between mb-4 pb-4 border-b-2 border-[#F9DCB4]/30">
              <Text className="text-[#A07A63] font-bold">Assigned Vehicle</Text>
              <Text className="text-[#4A3728] font-black">Safari Jeep (Open)</Text>
            </View>
            <View className="flex-row items-center justify-between mb-4 pb-4 border-b-2 border-[#F9DCB4]/30">
              <Text className="text-[#A07A63] font-bold">License Plate</Text>
              <View className="bg-[#FAF8F5] px-3 py-1.5 rounded-lg border-2 border-[#D4A373]/50">
                <Text className="text-[#8B5A2B] font-black tracking-widest">CG04 AB 1234</Text>
              </View>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-[#A07A63] font-bold">Total Trips</Text>
              <Text className="text-[#8B5A2B] font-black text-xl">340</Text>
            </View>
          </View>
        );

      default: // Gate Officer
        return (
          <View className="bg-white p-6 rounded-3xl border-2 border-[#D4A373]/40 mb-8 shadow-xl shadow-[#8B5A2B]/10">
            <Text className="text-[#8B5A2B] font-black uppercase tracking-widest text-xs mb-5">Assignment Details</Text>
            
            <View className="flex-row items-center justify-between mb-4 pb-4 border-b-2 border-[#F9DCB4]/30">
              <Text className="text-[#A07A63] font-bold">Active Post</Text>
              <Text className="text-[#4A3728] font-black text-lg">North Gate A</Text>
            </View>
            <View className="flex-row items-center justify-between mb-4 pb-4 border-b-2 border-[#F9DCB4]/30">
              <Text className="text-[#A07A63] font-bold">Current Shift</Text>
              <Text className="text-[#4A3728] font-black">08:00 AM - 04:00 PM</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-[#A07A63] font-bold">Status</Text>
              <View className="flex-row items-center bg-green-50 px-3 py-1.5 rounded-full border-2 border-green-200">
                <View className="w-2.5 h-2.5 rounded-full bg-green-500 mr-2" />
                <Text className="text-green-600 font-black text-xs uppercase tracking-wider">On Duty</Text>
              </View>
            </View>
          </View>
        );
    }
  };

  return (
    <View className="flex-1 bg-[#FAF8F5] w-full h-screen">
      
      <Animated.View entering={FadeIn.duration(800)} className="flex-1 p-6 pt-12">
        
        {/* Header Section */}
        <View className="flex-row justify-between items-center mb-8">
          <Text className="text-[#4A3728] font-black text-3xl tracking-tight">My Profile</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          
          {/* Top Identity Card */}
          <Animated.View entering={FadeInUp.delay(100).springify()} className="items-center mb-10">
            {/* Soft Peach Avatar Background with crisp white border */}
            <View className="w-32 h-32 bg-[#F9DCB4] rounded-full items-center justify-center mb-5 border-4 border-white shadow-xl shadow-[#8B5A2B]/20">
              <Ionicons name="person" size={50} color="#8B5A2B" />
            </View>
            
            <Text className="text-[#4A3728] text-3xl font-black mb-1">
              {role === "Gate Officer" ? "Admin User" : role === "Guide" ? "Amit Sharma" : "Rahul Verma"}
            </Text>
            
            <Text className="text-[#A07A63] font-bold mb-4">
              {role.toLowerCase().replace(' ', '')}@gibzoo.com
            </Text>

            <View className="bg-[#8B5A2B] px-6 py-2 rounded-full shadow-md shadow-[#8B5A2B]/30">
              <Text className="text-[#F9DCB4] font-black text-xs tracking-widest uppercase">
                {role}
              </Text>
            </View>
          </Animated.View>

          {/* Dynamic Role Data Section */}
          <Animated.View entering={FadeInUp.delay(200).springify()}>
            {renderRoleDetails()}
          </Animated.View>

          {/* Secure Logout Button */}
          <Animated.View entering={FadeInUp.delay(300).springify()}>
            <TouchableOpacity 
              onPress={handleLogout}
              // Added mb-32 so it easily clears your floating bottom navigation bar
              className="w-full bg-white border-2 border-red-200 py-4 rounded-2xl items-center flex-row justify-center mb-32 shadow-lg shadow-red-500/10"
            >
              <Ionicons name="power" size={22} color="#ef4444" className="mr-2" />
              <Text className="text-red-500 font-black text-lg">Secure Logout</Text>
            </TouchableOpacity>
          </Animated.View>

        </ScrollView>
      </Animated.View>
    </View>
  );
}