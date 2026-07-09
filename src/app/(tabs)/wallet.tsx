import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';

export default function WalletScreen() {
  const payouts = [
    { id: 1, date: 'Today, 12:30 PM', group: '#2045', amount: '+₹500', status: 'Completed' },
    { id: 2, date: 'Yesterday, 04:15 PM', group: '#2041', amount: '+₹650', status: 'Completed' },
    { id: 3, date: 'Monday, 11:00 AM', group: '#2032', amount: '+₹400', status: 'Completed' },
    { id: 4, date: 'Sunday, 09:30 AM', group: '#2021', amount: '+₹800', status: 'Completed' },
    { id: 5, date: 'Friday, 03:00 PM', group: '#2015', amount: '+₹500', status: 'Completed' },
  ];

  return (
    <View className="flex-1 bg-white w-full h-screen">
      
      {/* ==========================================
          LAYER 1: Vibrant Green Top Sheet
      ========================================== */}
      <Animated.View entering={FadeInDown.duration(600)} className="bg-[#32A042] pt-20 pb-12 rounded-b-[40px] items-center z-20 px-6">
        <View className="items-center">
          <View className="w-12 h-12 bg-black/20 rounded-full items-center justify-center mb-3">
            <Ionicons name="cash" size={24} color="white" />
          </View>
          <Text className="text-white font-bold text-sm mb-1 tracking-wide">My Pocket</Text>
          <Text className="text-white font-black text-6xl tracking-tighter">₹12,450</Text>
          <Text className="text-white/90 font-bold text-xs mt-2">Earned this month</Text>
        </View>
      </Animated.View>

      {/* ==========================================
          LAYER 2: Minimalist Ledger (Clean White)
      ========================================== */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 mt-8 mb-2 flex-row items-center justify-between">
          <Text className="text-black font-extrabold text-xl tracking-tight">Recent Payouts</Text>
        </View>

        {/* Line-Separated Payout List */}
        <View className="px-6 pb-24">
          {payouts.map((item, index) => (
            <Animated.View 
              key={item.id} 
              entering={FadeInUp.delay(200 + (index * 50)).springify()}
              className="py-5 border-b border-zinc-100 flex-row items-center justify-between"
            >
              <View className="flex-row items-center flex-1 pr-4">
                <View className="w-10 h-10 bg-[#F4F4F5] rounded-full items-center justify-center mr-4">
                  <Ionicons name="checkmark-done" size={16} color="#32A042" />
                </View>
                <View>
                  <Text className="text-black font-black text-base tracking-tight">Group {item.group}</Text>
                  <Text className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest mt-1">{item.date}</Text>
                </View>
              </View>
              <Text className="text-[#32A042] font-black text-lg">
                {item.amount}
              </Text>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}