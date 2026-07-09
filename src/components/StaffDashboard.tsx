import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp, FadeInDown, Layout } from "react-native-reanimated";

export default function StaffDashboard({ role }: { role: string }) {
  // Dynamic Identity
  const userName = role === "Guide" ? "Amit Sharma" : "Rahul Verma";
  
  // Interactive State Management
  const [activeTrips, setActiveTrips] = useState([
    { id: '1', time: "10:30 AM", group: "#2045", guests: 4 },
    { id: '2', time: "01:15 PM", group: "#2048", guests: 12 },
    { id: '3', time: "04:00 PM", group: "#2051", guests: 2 },
  ]);

  const [historyTrips, setHistoryTrips] = useState([
    { id: 'H1', time: "08:00 AM", group: "#2033", guests: 6, status: "Completed" },
  ]);

  // Logic to move a trip from Schedule to History
  const handleClearTrip = (tripId: string) => {
    const tripToMove = activeTrips.find(t => t.id === tripId);
    if (tripToMove) {
      setActiveTrips(prev => prev.filter(t => t.id !== tripId));
      setHistoryTrips(prev => [
        { ...tripToMove, status: "Cleared" },
        ...prev
      ]);
    }
  };

  return (
    <View className="flex-1 w-full h-full bg-black m-0 p-0">
      
      {/* ==========================================
          LAYER 1: Dashboard Header (Pastel Purple)
      ========================================== */}
      <Animated.View entering={FadeInDown.duration(600)} className="bg-[#E6E5F3] pt-16 pb-10 px-6 rounded-b-[40px] z-20">
        <View className="flex-row justify-between items-start">
          <View>
            {/* Role Badge at the top */}
            <View className="bg-black px-3 py-1 rounded-full self-start mb-3 flex-row items-center shadow-sm">
              <Ionicons name={role === "Guide" ? "map" : "car"} size={10} color="white" className="mr-1.5" />
              <Text className="text-white font-extrabold text-[9px] uppercase tracking-widest">{role}</Text>
            </View>
            
            {/* Cleaner, scaled-down Name */}
            <Text className="text-black font-black text-2xl tracking-tight">Hi, {userName}</Text>
            <Text className="text-zinc-600 font-medium text-xs mt-1">Here is your schedule for today</Text>
          </View>
        </View>
      </Animated.View>

      {/* ==========================================
          LAYER 2: Middle Section (Black Background)
      ========================================== */}
      <Animated.View entering={FadeInUp.delay(100).springify()} className="flex-row gap-x-3 px-6 py-6">
        
        {/* Today's Tickets (Vibrant Green) */}
        <View className="flex-1 bg-[#32A042] p-4 rounded-[20px] shadow-sm justify-between">
          <View className="w-8 h-8 bg-black/20 rounded-full items-center justify-center mb-3">
            <Ionicons name="calendar-clear" size={14} color="white" />
          </View>
          <View>
            <Text className="text-white/90 font-bold text-[9px] uppercase tracking-widest mb-0.5">Remaining</Text>
            <Text className="text-white font-black text-3xl tracking-tighter">{activeTrips.length}</Text>
          </View>
        </View>

        {/* Total Completed (Deep Gray matching Fintech Dark Mode) */}
        <View className="flex-1 bg-[#1C1C1E] p-4 rounded-[20px] shadow-sm justify-between">
          <View className="w-8 h-8 bg-white/10 rounded-full items-center justify-center mb-3 border border-white/5">
            <Ionicons name="checkmark-done" size={16} color="white" />
          </View>
          <View>
            <Text className="text-zinc-400 font-bold text-[9px] uppercase tracking-widest mb-0.5">Completed</Text>
            <Text className="text-white font-black text-3xl tracking-tighter">{142 + historyTrips.length - 1}</Text>
          </View>
        </View>

      </Animated.View>

      {/* ==========================================
          LAYER 3: Clean White List Container
      ========================================== */}
      <Animated.View entering={FadeInUp.delay(200).springify()} className="flex-1 bg-white rounded-t-[40px] overflow-hidden">
        <ScrollView className="flex-1 w-full px-6 pt-8" showsVerticalScrollIndicator={false}>
          
          {/* --- ACTIVE SCHEDULE --- */}
          <View className="mb-8">
            <Text className="text-black font-extrabold text-lg tracking-tight mb-2">Your Schedule</Text>
            
            {activeTrips.length === 0 ? (
              <View className="py-8 items-center justify-center border-b border-zinc-100">
                <Ionicons name="sparkles" size={20} color="#a1a1aa" className="mb-2" />
                <Text className="text-zinc-500 font-bold text-xs">All caught up for today!</Text>
              </View>
            ) : (
              activeTrips.map((ticket, index) => (
                <Animated.View 
                  key={ticket.id} 
                  layout={Layout.springify()} 
                  entering={FadeInUp.delay(300 + (index * 50)).springify()}
                  className="py-4 border-b border-zinc-100 flex-row justify-between items-center"
                >
                  <View className="flex-row items-center flex-1 pr-4">
                    <View className="w-10 h-10 bg-[#F4F4F5] rounded-full items-center justify-center mr-3">
                      <Ionicons name="time" size={14} color="black" />
                    </View>
                    <View>
                      <View className="flex-row items-center mb-1">
                        <Text className="text-black font-black text-base tracking-tight mr-2">Group {ticket.group}</Text>
                        <Text className="text-black font-bold text-[10px] bg-[#F4F4F5] px-2 py-0.5 rounded">{ticket.time}</Text>
                      </View>
                      <View className="flex-row items-center">
                        <Ionicons name="people" size={10} color="#a1a1aa" />
                        <Text className="text-zinc-400 font-bold text-[9px] uppercase tracking-widest ml-1">{ticket.guests} Guests</Text>
                      </View>
                    </View>
                  </View>

                  <TouchableOpacity 
                    onPress={() => handleClearTrip(ticket.id)}
                    className="bg-black px-4 py-2 rounded-full shadow-sm"
                  >
                    <Text className="text-white font-bold text-[9px] uppercase tracking-widest">Clear Trip</Text>
                  </TouchableOpacity>
                </Animated.View>
              ))
            )}
          </View>

          {/* --- HISTORY SECTION --- */}
          <View>
            <Text className="text-black font-extrabold text-lg tracking-tight mb-2">History</Text>
            
            {historyTrips.map((ticket, index) => (
              <Animated.View 
                key={ticket.id}
                layout={Layout.springify()} 
                entering={FadeInUp.delay(400 + (index * 50)).springify()}
                className="py-4 border-b border-zinc-100 flex-row justify-between items-center opacity-70"
              >
                <View className="flex-row items-center flex-1 pr-4">
                  <View className="w-10 h-10 bg-white border border-zinc-200 rounded-full items-center justify-center mr-3">
                    <Ionicons name="checkmark" size={14} color="#32A042" />
                  </View>
                  <View>
                    <View className="flex-row items-center mb-1">
                      <Text className="text-zinc-600 font-bold text-base tracking-tight mr-2 line-through">Group {ticket.group}</Text>
                      <Text className="text-zinc-400 font-bold text-[10px]">{ticket.time}</Text>
                    </View>
                    <Text className="text-zinc-400 font-bold text-[9px] uppercase tracking-widest">Completed</Text>
                  </View>
                </View>
              </Animated.View>
            ))}
          </View>

          <View className="h-24" /> 
        </ScrollView>
      </Animated.View>
    </View>
  );
}