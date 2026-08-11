import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp, Layout } from 'react-native-reanimated';

export default function TicketHistoryScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy History Data
  const historyData = [
    { id: 'TKT-00045', name: 'Ramesh Singh', date: 'Today, 10:30 AM', members: 4, type: 'VIP', status: 'Completed' },
    { id: 'TKT-00044', name: 'Suresh Kumar', date: 'Yesterday, 02:15 PM', members: 2, type: 'Standard', status: 'Completed' },
    { id: 'TKT-00043', name: 'Arpan Dubey', date: 'Yesterday, 11:00 AM', members: 6, type: 'Standard', status: 'Cancelled' },
    { id: 'TKT-00042', name: 'Laxmi Kapoor', date: '12 Jul, 09:00 AM', members: 4, type: 'VIP', status: 'Completed' },
    { id: 'TKT-00041', name: 'Vikash Patel', date: '11 Jul, 04:30 PM', members: 8, type: 'Group', status: 'Completed' },
  ];

  return (
    <View className="flex-1 bg-[#F4F4F5] w-full h-full">
      
      {/* ==========================================
          LAYER 1: The Purple Header Sheet
      ========================================== */}
      <Animated.View entering={FadeInDown.duration(600)} className="bg-[#E6E5F3] pt-20 pb-12 px-6 rounded-b-[40px] z-20 shadow-sm">
        <Text className="text-black font-black text-4xl tracking-tighter mb-1">Ticket History</Text>
        <Text className="text-zinc-600 font-medium text-sm mb-6">Review past bookings and allocations.</Text>

        {/* Minimalist Search Bar */}
        <View className="bg-white flex-row items-center px-4 py-3.5 rounded-2xl shadow-sm border border-black/5">
          <Ionicons name="search" size={20} color="#a1a1aa" />
          <TextInput
            className="flex-1 ml-3 font-medium text-black"
            placeholder="Search by ID or Name..."
            placeholderTextColor="#a1a1aa"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </Animated.View>

      {/* ==========================================
          LAYER 2: Clean White Ledger (Edge-to-Edge)
      ========================================== */}
      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        
        <Text className="text-black font-extrabold text-sm mb-4 uppercase tracking-widest">Recent Records</Text>

        <View className="mb-10">
          {historyData.map((ticket, index) => (
            <Animated.View 
              key={ticket.id} 
              layout={Layout.springify()} 
              entering={FadeInUp.delay(200 + (index * 50)).springify()}
              className="bg-white p-5 rounded-[24px] mb-3 flex-row justify-between items-center shadow-sm border border-zinc-100"
            >
              <View className="flex-row items-center flex-1">
                {/* Icon Box */}
                <View className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${ticket.status === 'Completed' ? 'bg-[#F4F4F5]' : 'bg-red-50'}`}>
                  <Ionicons 
                    name={ticket.status === 'Completed' ? 'checkmark-done' : 'close'} 
                    size={18} 
                    color={ticket.status === 'Completed' ? 'black' : '#ef4444'} 
                  />
                </View>

                {/* Info Text */}
                <View className="flex-1">
                  <Text className="text-black font-black text-base tracking-tight mb-0.5" numberOfLines={1}>{ticket.name}</Text>
                  <Text className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">{ticket.id} • {ticket.date}</Text>
                </View>
              </View>

              {/* Right Side Tags */}
              <View className="items-end">
                <Text className="text-black font-extrabold text-sm">{ticket.members} Pax</Text>
                <Text className="text-zinc-400 font-bold text-[9px] uppercase tracking-widest mt-1">{ticket.type}</Text>
              </View>
            </Animated.View>
          ))}
        </View>

        <View className="h-24" />
      </ScrollView>
    </View>
  );
}