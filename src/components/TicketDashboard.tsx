import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp, Layout } from "react-native-reanimated";

export default function TicketDashboard() {
  const router = useRouter();

  // Functional State for recent tickets (Updated with Vehicle Type)
  const [recentTickets, setRecentTickets] = useState([
    { id: 'TKT-101', name: 'Ramesh Singh', type: 'VIP', members: 4, vehicleType: 'LMV' },
    { id: 'TKT-102', name: 'Suresh Kumar', type: 'Standard', members: 2, vehicleType: 'HMV' },
  ]);

  return (
    <View className="flex-1 bg-[#F4F4F5] w-full h-full">
      
      {/* ==========================================
          LAYER 1: Header Area (Pastel Purple)
      ========================================== */}
      <Animated.View entering={FadeInDown.duration(600)} className="bg-[#E6E5F3] pt-16 pb-8 px-6 rounded-b-[40px] z-20 shadow-sm">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <View className="bg-black px-3 py-1.5 rounded-full self-start mb-3 shadow-sm">
              <Text className="text-white font-extrabold text-[10px] uppercase tracking-widest">Ticket Desk</Text>
            </View>
            <Text className="text-black font-black text-3xl tracking-tight">Booking Portal</Text>
          </View>
          
          {/* Universal Profile Connection */}
          <TouchableOpacity 
            onPress={() => router.push('/(tabs)/profile')}
            className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-sm"
          >
            <Ionicons name="person" size={20} color="black" />
          </TouchableOpacity>
        </View>

        {/* Quick Stats - Neo Brutalist Contrast */}
        <View className="flex-row gap-x-4">
          <View className="flex-1 bg-white p-5 rounded-[24px] shadow-sm border border-zinc-100">
            <Text className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest mb-1">Sold Today</Text>
            <Text className="text-black font-black text-3xl tracking-tighter">142</Text>
          </View>
          <View className="flex-1 bg-black p-5 rounded-[24px] shadow-sm">
            <Text className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest mb-1">Revenue</Text>
            <Text className="text-white font-black text-3xl tracking-tighter">₹12k</Text>
          </View>
        </View>
      </Animated.View>

      {/* ==========================================
          LAYER 2: Clean White Action Ledger
      ========================================== */}
      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        
        {/* Core Action: Route to Create Ticket Page */}
        <Animated.View entering={FadeInUp.delay(100).springify()}>
          <TouchableOpacity 
            onPress={() => router.push('/create-ticket')}
            className="w-full bg-black py-5 rounded-[24px] flex-row items-center justify-center mb-10 shadow-lg shadow-black/20"
          >
            <Ionicons name="add-circle" size={24} color="white" className="mr-2" />
            <Text className="text-white font-black text-lg uppercase tracking-widest">Create New Ticket</Text>
          </TouchableOpacity>
        </Animated.View>

        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-black font-extrabold text-sm uppercase tracking-widest">Recent Bookings</Text>
        </View>
        
        {/* Recent Tickets List */}
        <View className="mb-10">
          {recentTickets.map((tkt, index) => (
            <Animated.View 
              key={tkt.id} 
              layout={Layout.springify()}
              entering={FadeInUp.delay(200 + (index * 50)).springify()}
              className="bg-white p-5 rounded-[24px] mb-3 flex-row justify-between items-center shadow-sm border border-zinc-100"
            >
              <View className="flex-row items-center flex-1">
                {/* Icon Box */}
                <View className="w-12 h-12 bg-[#F4F4F5] rounded-full items-center justify-center mr-4">
                  <Ionicons name="ticket" size={18} color="black" />
                </View>

                {/* Info Text */}
                <View className="flex-1 pr-2">
                  <Text className="text-black font-black text-base tracking-tight mb-0.5" numberOfLines={1}>{tkt.name}</Text>
                  
                  <View className="flex-row items-center mb-1">
                    <Text className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">
                      {tkt.id} • {tkt.members} Pax
                    </Text>
                  </View>

                  {/* Vehicle Assignment Tag */}
                  <View className="flex-row items-center">
                    <Ionicons name="car" size={10} color="#a1a1aa" className="mr-1" />
                    <Text className="text-black font-bold text-[9px] uppercase tracking-widest">{tkt.vehicleType}</Text>
                  </View>
                </View>
              </View>

              {/* Right Side Ticket Type Tag */}
              <View className="bg-black/5 px-3 py-1.5 rounded-full border border-black/5">
                <Text className="text-black font-extrabold text-[10px] uppercase tracking-widest">{tkt.type}</Text>
              </View>
            </Animated.View>
          ))}
        </View>

        <View className="h-24" />
      </ScrollView>
    </View>
  );
}