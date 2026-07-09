import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';

export default function HistoryScreen() {
  const router = useRouter();

  // Mock Database
  const mockHistory = [
    { id: '1', date: 'Oct 24, 10:30 AM', driver: 'Rahul Verma', guide: 'Amit Sharma', amount: 1500 },
    { id: '2', date: 'Oct 24, 01:15 PM', driver: 'Suresh Kumar', guide: 'Neha Singh', amount: 1200 },
    { id: '3', date: 'Oct 23, 09:00 AM', driver: 'Vikash Patel', guide: 'Amit Sharma', amount: 1800 },
    { id: '4', date: 'Oct 22, 02:45 PM', driver: 'Rahul Verma', guide: 'Neha Singh', amount: 2100 },
    { id: '5', date: 'Oct 21, 11:20 AM', driver: 'Suresh Kumar', guide: 'Amit Sharma', amount: 1500 },
  ];

  return (
    <View className="flex-1 bg-black w-full h-screen">
      
      {/* ==========================================
          LAYER 1: Fintech Analytics Header (Pastel Purple)
      ========================================== */}
      <Animated.View entering={FadeInDown.duration(600)} className="bg-[#E6E5F3] pt-16 pb-10 px-6 rounded-b-[40px] z-20">
        
        {/* Top Nav Row */}
        <View className="flex-row items-center justify-between mb-8">
          <TouchableOpacity 
            onPress={() => router.back()} 
            className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-sm"
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <View className="bg-black px-4 py-2 rounded-full shadow-sm">
            <Text className="text-white font-extrabold text-[10px] uppercase tracking-widest">Overview</Text>
          </View>
        </View>

        {/* Hero Analytics */}
        <Text className="text-zinc-500 font-bold text-xs uppercase tracking-widest mb-1">Total Trip Volume</Text>
        <Text className="text-black font-black text-6xl tracking-tighter mb-8">₹127.7k</Text>

        {/* Split Data Cards */}
        <View className="flex-row gap-x-4">
          <View className="flex-1 bg-white p-5 rounded-[24px] shadow-sm">
            <View className="w-8 h-8 bg-[#F4F4F5] rounded-full items-center justify-center mb-3">
              <Ionicons name="map" size={14} color="black" />
            </View>
            <Text className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest mb-1">Guide Total</Text>
            <Text className="text-black font-black text-2xl tracking-tight">₹42.5k</Text>
          </View>
          
          <View className="flex-1 bg-white p-5 rounded-[24px] shadow-sm">
            <View className="w-8 h-8 bg-[#F4F4F5] rounded-full items-center justify-center mb-3">
              <Ionicons name="car" size={14} color="black" />
            </View>
            <Text className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest mb-1">Driver Total</Text>
            <Text className="text-black font-black text-2xl tracking-tight">₹85.2k</Text>
          </View>
        </View>
      </Animated.View>

      {/* ==========================================
          LAYER 2: Minimalist Ledger (Clean White)
      ========================================== */}
      <Animated.View entering={FadeInUp.delay(200).springify()} className="flex-1 bg-white mt-2 rounded-t-[40px] overflow-hidden">
        <ScrollView className="flex-1 px-6 pt-8" showsVerticalScrollIndicator={false}>
          
          {/* List Header */}
          <View className="flex-row justify-between items-end mb-6">
            <Text className="text-black font-black text-2xl tracking-tight">Transactions</Text>
            <Text className="text-zinc-400 font-bold text-xs uppercase tracking-widest mb-1">142 Rides</Text>
          </View>

          {/* Ledger Items */}
          {mockHistory.map((trip, index) => (
            <Animated.View 
              key={trip.id} 
              entering={FadeInUp.delay(300 + (index * 50)).springify()}
              className="py-5 border-b border-zinc-100 flex-row items-center justify-between"
            >
              <View className="flex-row items-center flex-1 pr-4">
                {/* Receipt Icon Badge */}
                <View className="w-12 h-12 bg-[#F4F4F5] rounded-full items-center justify-center mr-4">
                  <Ionicons name="receipt" size={18} color="black" />
                </View>
                
                {/* Data Details */}
                <View className="flex-1">
                  <Text className="text-black font-black text-base mb-1">{trip.date}</Text>
                  
                  <View className="flex-row items-center flex-wrap">
                    <View className="flex-row items-center mr-3">
                      <Ionicons name="car" size={10} color="#a1a1aa" />
                      <Text className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest ml-1">{trip.driver}</Text>
                    </View>
                    <View className="flex-row items-center mt-1 sm:mt-0">
                      <Ionicons name="map" size={10} color="#a1a1aa" />
                      <Text className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest ml-1">{trip.guide}</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Amount */}
              <Text className="text-black font-black text-lg">₹{trip.amount}</Text>
            </Animated.View>
          ))}
          
          <View className="h-24" /> {/* Padding for bottom tab bar */}
        </ScrollView>
      </Animated.View>

    </View>
  );
}