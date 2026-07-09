import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';

export default function PendingDriversScreen() {
  const router = useRouter();

  // Mock Tickets: Guide is assigned, but Driver is missing.
  const pendingTickets = [
    { id: 'TKT-000031', group: 'Group #2101', time: '08:30 AM', members: 4, guide: 'Amit Sharma' },
    { id: 'TKT-000032', group: 'Group #2105', time: '09:15 AM', members: 6, guide: 'Ravi Tiwari' },
    { id: 'TKT-000033', group: 'Group #2110', time: '11:00 AM', members: 2, guide: 'Neha Singh' },
    { id: 'TKT-000034', group: 'Group #2115', time: '01:30 PM', members: 8, guide: 'Amit Sharma' },
  ];

  return (
    <View className="flex-1 bg-black w-full h-screen">
      
      {/* ==========================================
          LAYER 1: Header (Pastel Purple)
      ========================================== */}
      <Animated.View entering={FadeInDown.duration(600)} className="bg-[#E6E5F3] pt-20 pb-10 px-6 rounded-b-[40px] z-20">
        <View className="bg-black px-4 py-1.5 rounded-full self-start mb-5 shadow-sm">
          <Text className="text-white font-extrabold text-[10px] uppercase tracking-widest">Pending Dispatch</Text>
        </View>
        <Text className="text-black font-black text-4xl tracking-tighter">Assign Driver</Text>
        <Text className="text-zinc-600 font-medium text-sm mt-2">
          {pendingTickets.length} groups are waiting for vehicle allocation.
        </Text>
      </Animated.View>

      {/* ==========================================
          LAYER 2: Black Middle Section
      ========================================== */}
      <View className="items-center justify-center py-6">
        <Text className="text-zinc-400 font-medium text-xs tracking-wide">
          These tickets have guides but no drivers.
        </Text>
      </View>

      {/* ==========================================
          LAYER 3: Minimalist List Container (Clean White)
      ========================================== */}
      <Animated.View entering={FadeInUp.delay(200).springify()} className="flex-1 bg-white rounded-t-[40px] overflow-hidden">
        <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
          {pendingTickets.map((ticket, index) => (
            <View 
              key={ticket.id} 
              className="py-5 border-b border-zinc-100 flex-row items-center justify-between"
            >
              <View className="flex-1 pr-4">
                {/* Group & Time */}
                <View className="flex-row items-center justify-between mb-1">
                  <Text className="text-black font-black text-xl tracking-tight">{ticket.group}</Text>
                  <Text className="text-black font-extrabold text-sm">{ticket.time}</Text>
                </View>
                
                {/* Ticket ID & Members */}
                <Text className="text-zinc-500 font-medium text-xs mb-3">
                  {ticket.id} • {ticket.members} Members
                </Text>

                {/* Status Indicators */}
                <View className="flex-row items-center">
                  <Text className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mr-4">
                    Guide: <Text className="text-black">{ticket.guide}</Text>
                  </Text>
                  <Text className="text-red-500 text-[10px] font-bold uppercase tracking-widest">
                    Driver: Missing
                  </Text>
                </View>
              </View>

              {/* Action Button -> Routes to Scanner/Details */}
              <TouchableOpacity 
                onPress={() => router.push('/ticket-details')}
                className="w-12 h-12 bg-[#F4F4F5] rounded-full items-center justify-center"
              >
                <Ionicons name="qr-code" size={18} color="black" />
              </TouchableOpacity>
            </View>
          ))}
          <View className="h-20" />
        </ScrollView>
      </Animated.View>

    </View>
  );
}