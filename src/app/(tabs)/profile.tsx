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
  // DYNAMIC ROLE DETAILS COMPONENT
  // ==========================================
  const renderRoleDetails = () => {
    switch (role) {
      case "Guide":
        return (
          <View className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 mb-6">
            <Text className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-4">Professional Details</Text>
            
            <View className="flex-row items-center justify-between mb-4 pb-4 border-b border-zinc-800/50">
              <Text className="text-zinc-300 font-medium">Languages</Text>
              <Text className="text-white font-bold">English, Hindi</Text>
            </View>
            <View className="flex-row items-center justify-between mb-4 pb-4 border-b border-zinc-800/50">
              <Text className="text-zinc-300 font-medium">Current Rating</Text>
              <View className="flex-row items-center">
                <Ionicons name="star" size={16} color="#facc15" />
                <Text className="text-white font-bold ml-1">4.8 / 5.0</Text>
              </View>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-zinc-300 font-medium">Total Tours</Text>
              <Text className="text-yellow-500 font-extrabold text-lg">142</Text>
            </View>
          </View>
        );
        
      case "Driver":
        return (
          <View className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 mb-6">
            <Text className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-4">Vehicle Details</Text>
            
            <View className="flex-row items-center justify-between mb-4 pb-4 border-b border-zinc-800/50">
              <Text className="text-zinc-300 font-medium">Assigned Vehicle</Text>
              <Text className="text-white font-bold">Safari Jeep (Open)</Text>
            </View>
            <View className="flex-row items-center justify-between mb-4 pb-4 border-b border-zinc-800/50">
              <Text className="text-zinc-300 font-medium">License Plate</Text>
              <View className="bg-black px-2 py-1 rounded border border-yellow-500/50">
                <Text className="text-yellow-500 font-bold tracking-widest">CG04 AB 1234</Text>
              </View>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-zinc-300 font-medium">Total Trips</Text>
              <Text className="text-yellow-500 font-extrabold text-lg">340</Text>
            </View>
          </View>
        );

      default: // Gate Officer
        return (
          <View className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 mb-6">
            <Text className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-4">Assignment Details</Text>
            
            <View className="flex-row items-center justify-between mb-4 pb-4 border-b border-zinc-800/50">
              <Text className="text-zinc-300 font-medium">Active Post</Text>
              <Text className="text-white font-bold text-lg">North Gate A</Text>
            </View>
            <View className="flex-row items-center justify-between mb-4 pb-4 border-b border-zinc-800/50">
              <Text className="text-zinc-300 font-medium">Current Shift</Text>
              <Text className="text-white font-bold">08:00 AM - 04:00 PM</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-zinc-300 font-medium">Status</Text>
              <View className="flex-row items-center bg-green-500/20 px-3 py-1 rounded-full border border-green-500/50">
                <View className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                <Text className="text-green-500 font-bold text-xs uppercase tracking-wider">On Duty</Text>
              </View>
            </View>
          </View>
        );
    }
  };

  return (
    <View className="flex-1 bg-[#050505] w-full h-screen">
      
      <Animated.View entering={FadeIn.duration(800)} className="flex-1 p-6 pt-12">
        
        {/* Header Section */}
        <View className="flex-row justify-between items-center mb-10">
          <Text className="text-white font-extrabold text-3xl tracking-tight">My Profile</Text>
          
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          
          {/* Top Identity Card */}
          <Animated.View entering={FadeInUp.delay(100).springify()} className="items-center mb-8">
            <View className="w-32 h-32 bg-zinc-900 rounded-full items-center justify-center mb-4 border-2 border-yellow-500 shadow-lg shadow-yellow-500/20">
              <Ionicons name="person" size={50} color="white" />
            </View>
            
            <Text className="text-white text-2xl font-extrabold mb-1">
              {role === "Gate Officer" ? "Admin User" : role === "Guide" ? "Amit Sharma" : "Rahul Verma"}
            </Text>
            
            <Text className="text-zinc-400 font-medium mb-3">
              {role.toLowerCase()}@gibzoo.com
            </Text>

            <View className="bg-yellow-500 px-4 py-1.5 rounded-full">
              <Text className="text-[#050505] font-extrabold text-xs tracking-widest uppercase">
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
              className="w-full bg-black border border-red-500/50 py-4 rounded-xl items-center flex-row justify-center mb-10"
            >
              <Ionicons name="power" size={20} color="#ef4444" className="mr-2" />
              <Text className="text-red-500 font-bold text-lg">Secure Logout</Text>
            </TouchableOpacity>
          </Animated.View>

        </ScrollView>
      </Animated.View>
    </View>
  );
}