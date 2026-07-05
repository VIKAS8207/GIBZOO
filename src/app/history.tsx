import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function HistoryScreen() {
  const router = useRouter();

  // Mock Database
  const mockHistory = [
    { id: '1', date: 'Oct 24, 10:30 AM', driver: 'Rahul Verma', guide: 'Amit Sharma', amount: 1500 },
    { id: '2', date: 'Oct 24, 01:15 PM', driver: 'Suresh Kumar', guide: 'Neha Singh', amount: 1200 },
    { id: '3', date: 'Oct 23, 09:00 AM', driver: 'Vikash Patel', guide: 'Amit Sharma', amount: 1800 },
  ];

  return (
    <View className="flex-1 bg-[#FAF8F5] w-full h-screen">
      
      {/* Custom Header with Back Button */}
      <View className="flex-row items-center p-6 pt-12 border-b-2 border-[#F9DCB4]/50">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="mr-4 bg-white border-2 border-[#D4A373]/40 p-2.5 rounded-full shadow-sm shadow-[#8B5A2B]/10"
        >
          <Ionicons name="arrow-back" size={24} color="#8B5A2B" />
        </TouchableOpacity>
        <Text className="text-[#4A3728] font-black text-2xl tracking-tight">Trip History</Text>
      </View>

      <Animated.View entering={FadeIn.duration(500)} className="flex-1 p-6">
        
        {/* Top Analytics Row */}
        <View className="flex-row justify-between mb-8 gap-x-3">
          <View className="flex-1 bg-white p-4 rounded-3xl border-2 border-[#D4A373]/30 shadow-lg shadow-[#8B5A2B]/10">
            <Text className="text-[#A07A63] text-[10px] font-black uppercase tracking-widest mb-1">Rides</Text>
            <Text className="text-[#8B5A2B] font-black text-2xl">142</Text>
          </View>
          <View className="flex-1 bg-white p-4 rounded-3xl border-2 border-[#D4A373]/30 shadow-lg shadow-[#8B5A2B]/10">
            <Text className="text-[#A07A63] text-[10px] font-black uppercase tracking-widest mb-1">Guide Total</Text>
            <Text className="text-[#4A3728] font-black text-xl">₹42.5k</Text>
          </View>
          <View className="flex-1 bg-white p-4 rounded-3xl border-2 border-[#D4A373]/30 shadow-lg shadow-[#8B5A2B]/10">
            <Text className="text-[#A07A63] text-[10px] font-black uppercase tracking-widest mb-1">Driver Total</Text>
            <Text className="text-[#4A3728] font-black text-xl">₹85.2k</Text>
          </View>
        </View>

        <Text className="text-[#8B5A2B] font-black uppercase tracking-widest text-xs mb-4">Recent Transactions</Text>

        {/* Data Table / List */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {mockHistory.map((trip) => (
            <View key={trip.id} className="bg-white p-5 rounded-3xl mb-4 border-2 border-[#D4A373]/30 shadow-md shadow-[#8B5A2B]/10">
              <View className="flex-row justify-between items-center mb-4 pb-4 border-b-2 border-[#F9DCB4]/40">
                <Text className="text-[#8B5A2B] font-black text-xs uppercase tracking-widest">{trip.date}</Text>
                <Text className="text-[#4A3728] font-black text-xl">₹{trip.amount}</Text>
              </View>
              
              <View className="flex-row justify-between px-1">
                <View className="flex-row items-center">
                  <Ionicons name="car" size={16} color="#8B5A2B" className="mr-2" />
                  <Text className="text-[#A07A63] font-bold text-xs ml-1">{trip.driver}</Text>
                </View>
                <View className="flex-row items-center">
                  <Ionicons name="map" size={16} color="#8B5A2B" className="mr-2" />
                  <Text className="text-[#A07A63] font-bold text-xs ml-1">{trip.guide}</Text>
                </View>
              </View>
            </View>
          ))}
          <View className="h-10" />
        </ScrollView>
      </Animated.View>
    </View>
  );
}