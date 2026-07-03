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
    <View className="flex-1 bg-[#050505] w-full h-screen">
      
      {/* Custom Header with Back Button */}
      <View className="flex-row items-center p-6 pt-12 border-b border-zinc-800">
        <TouchableOpacity onPress={() => router.back()} className="mr-4 bg-zinc-900 p-2 rounded-full">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white font-extrabold text-2xl">Trip History</Text>
      </View>

      <Animated.View entering={FadeIn.duration(500)} className="flex-1 p-6">
        
        {/* Top Analytics Row */}
        <View className="flex-row justify-between mb-6 gap-x-3">
          <View className="flex-1 bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
            <Text className="text-zinc-400 text-xs font-bold uppercase mb-1">Rides</Text>
            <Text className="text-yellow-500 font-extrabold text-2xl">142</Text>
          </View>
          <View className="flex-1 bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
            <Text className="text-zinc-400 text-xs font-bold uppercase mb-1">Guide Total</Text>
            <Text className="text-white font-extrabold text-xl">₹42.5k</Text>
          </View>
          <View className="flex-1 bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
            <Text className="text-zinc-400 text-xs font-bold uppercase mb-1">Driver Total</Text>
            <Text className="text-white font-extrabold text-xl">₹85.2k</Text>
          </View>
        </View>

        <Text className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-4">Recent Transactions</Text>

        {/* Data Table / List */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {mockHistory.map((trip) => (
            <View key={trip.id} className="bg-zinc-900 p-4 rounded-2xl mb-3 border border-zinc-800">
              <View className="flex-row justify-between items-center mb-3 pb-3 border-b border-zinc-800/50">
                <Text className="text-yellow-500 font-bold">{trip.date}</Text>
                <Text className="text-white font-extrabold text-lg">₹{trip.amount}</Text>
              </View>
              
              <View className="flex-row justify-between">
                <View className="flex-row items-center">
                  <Ionicons name="car" size={16} color="#94a3b8" className="mr-2" />
                  <Text className="text-zinc-300 text-sm ml-1">{trip.driver}</Text>
                </View>
                <View className="flex-row items-center">
                  <Ionicons name="map" size={16} color="#94a3b8" className="mr-2" />
                  <Text className="text-zinc-300 text-sm ml-1">{trip.guide}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
}