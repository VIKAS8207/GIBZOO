import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useGlobalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeInUp, FadeInDown } from 'react-native-reanimated';

export default function MasterScreen() {
  // 1. GLOBALLY CATCH THE ROLE
  const { userRole } = useGlobalSearchParams();
  const role = (userRole as string) || "Gate Officer"; 

  // Gate Officer State
  const [activeTab, setActiveTab] = useState<'Guide' | 'Driver'>('Guide');

  // Staff (Guide/Driver) State
  const [isAvailable, setIsAvailable] = useState(true);

  // ==========================================
  // GATE OFFICER UI: Dispatch & Monitoring
  // ==========================================
  const renderGateOfficerMaster = () => {
    // Mock Real-time Data
    const guides = [
      { id: 'g1', name: 'Amit Sharma', status: 'Available', time: '--' },
      { id: 'g2', name: 'Neha Singh', status: 'Booked', time: 'Until 12:30 PM', assignment: 'Group #2045' },
      { id: 'g3', name: 'Ravi Tiwari', status: 'Offline', time: '--' },
    ];

    const drivers = [
      { id: 'd1', name: 'Rahul Verma', status: 'Booked', time: 'Until 01:15 PM', assignment: 'Group #2044' },
      { id: 'd2', name: 'Suresh Kumar', status: 'Available', time: '--' },
      { id: 'd3', name: 'Vikash Patel', status: 'Available', time: '--' },
    ];

    const currentList = activeTab === 'Guide' ? guides : drivers;

    return (
      <View className="flex-1">
        
        {/* Custom Segmented Toggle - Earthy Theme */}
        <Animated.View entering={FadeInDown.duration(500)} className="flex-row bg-white p-1.5 rounded-2xl border-2 border-[#D4A373]/30 mb-8 shadow-sm shadow-[#8B5A2B]/10">
          <TouchableOpacity 
            onPress={() => setActiveTab('Guide')}
            className={`flex-1 py-3 rounded-xl items-center ${activeTab === 'Guide' ? 'bg-[#8B5A2B] shadow-md' : 'bg-transparent'}`}
          >
            <Text className={`font-black text-xs uppercase tracking-widest ${activeTab === 'Guide' ? 'text-[#F9DCB4]' : 'text-[#A07A63]'}`}>Active Guides</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setActiveTab('Driver')}
            className={`flex-1 py-3 rounded-xl items-center ${activeTab === 'Driver' ? 'bg-[#8B5A2B] shadow-md' : 'bg-transparent'}`}
          >
            <Text className={`font-black text-xs uppercase tracking-widest ${activeTab === 'Driver' ? 'text-[#F9DCB4]' : 'text-[#A07A63]'}`}>Active Drivers</Text>
          </TouchableOpacity>
        </Animated.View>

        <Text className="text-[#8B5A2B] font-black text-lg mb-4 ml-1">Real-Time Status</Text>

        {/* Dynamic Status List */}
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1 -mx-2 px-2">
          {currentList.map((person, index) => (
            <Animated.View 
              key={person.id} 
              entering={FadeInUp.delay(index * 100).springify()}
              className="bg-white p-5 rounded-3xl mb-4 border-2 border-[#D4A373]/30 shadow-lg shadow-[#8B5A2B]/10"
            >
              <View className="flex-row justify-between items-center mb-4 pb-4 border-b-2 border-[#F9DCB4]/50">
                <View className="flex-row items-center">
                  <View className="w-12 h-12 bg-[#F9DCB4]/50 rounded-2xl items-center justify-center border border-[#D4A373]/30 mr-4 shadow-sm shadow-[#8B5A2B]/10">
                    <Ionicons name={activeTab === 'Guide' ? 'map' : 'car'} size={20} color="#8B5A2B" />
                  </View>
                  <Text className="text-[#4A3728] font-black text-xl">{person.name}</Text>
                </View>
                
                {/* Visual Status Indicator */}
                <View className={`px-3 py-1.5 rounded-xl border-2 flex-row items-center ${
                  person.status === 'Available' ? 'bg-green-50 border-green-200' : 
                  person.status === 'Booked' ? 'bg-orange-50 border-orange-200' : 
                  'bg-zinc-50 border-zinc-200'
                }`}>
                  <View className={`w-2 h-2 rounded-full mr-2 ${
                    person.status === 'Available' ? 'bg-green-500' : 
                    person.status === 'Booked' ? 'bg-orange-500' : 'bg-zinc-400'
                  }`} />
                  <Text className={`text-[10px] font-black uppercase tracking-widest ${
                    person.status === 'Available' ? 'text-green-600' : 
                    person.status === 'Booked' ? 'text-orange-600' : 'text-zinc-500'
                  }`}>{person.status}</Text>
                </View>
              </View>

              {person.status === 'Booked' ? (
                <View className="flex-row justify-between items-center px-1">
                  <Text className="text-[#A07A63] text-sm font-medium">Assigned: <Text className="text-[#8B5A2B] font-black">{person.assignment}</Text></Text>
                  <Text className="text-[#A07A63] text-xs font-bold">{person.time}</Text>
                </View>
              ) : (
                <Text className="text-[#A07A63] text-xs font-medium px-1 italic">
                  {person.status === 'Offline' ? 'Currently off duty' : 'Waiting for assignment...'}
                </Text>
              )}
            </Animated.View>
          ))}
          <View className="h-32" /> {/* Gap for the floating nav bar */}
        </ScrollView>
      </View>
    );
  };

  // ==========================================
  // STAFF UI: Itinerary & Availability
  // ==========================================
  const renderStaffMaster = () => {
    // Mock Assignments Data
    const assignments = [
      { id: 'TKT-8849', group: '#2045', time: '10:30 AM', type: 'VIP', members: 4 },
      { id: 'TKT-8850', group: '#2048', time: '02:00 PM', type: 'Normal', members: 12 },
    ];

    return (
      <View className="flex-1">
        
        {/* Top Summary Stats */}
        <Animated.View entering={FadeInDown.duration(500)} className="flex-row justify-between mb-8 gap-x-4">
          <View className="flex-1 bg-white p-5 rounded-3xl border-2 border-[#D4A373]/30 shadow-lg shadow-[#8B5A2B]/10">
            <Text className="text-[#A07A63] text-[10px] font-black uppercase tracking-widest mb-1">Pending</Text>
            <Text className="text-[#4A3728] font-black text-3xl">2</Text>
          </View>
          <View className="flex-1 bg-white p-5 rounded-3xl border-2 border-[#D4A373]/30 shadow-lg shadow-[#8B5A2B]/10">
            <Text className="text-[#A07A63] text-[10px] font-black uppercase tracking-widest mb-1">Completed</Text>
            <Text className="text-[#8B5A2B] font-black text-3xl">4</Text>
          </View>
        </Animated.View>

        <Text className="text-[#8B5A2B] font-black text-lg mb-4 ml-1">My Assignments</Text>

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1 -mx-2 px-2">
          {assignments.map((task, index) => (
            <Animated.View 
              key={task.id} 
              entering={FadeInUp.delay(index * 100).springify()}
              className="bg-white p-6 rounded-3xl mb-5 border-2 border-[#D4A373]/30 shadow-xl shadow-[#8B5A2B]/10"
            >
              <View className="flex-row justify-between items-center mb-5 pb-5 border-b-2 border-[#F9DCB4]/50">
                <View>
                  <Text className="text-[#4A3728] font-black text-2xl mb-1">Group {task.group}</Text>
                  <Text className="text-[#A07A63] font-bold text-xs">{task.id}</Text>
                </View>
                <View className={`px-4 py-2 rounded-xl border-2 ${task.type === 'VIP' ? 'bg-[#F9DCB4] border-[#D4A373]' : 'bg-[#FAF8F5] border-[#F9DCB4]'}`}>
                  <Text className={task.type === 'VIP' ? 'text-[#8B5A2B] font-black text-xs uppercase tracking-widest' : 'text-[#A07A63] font-black text-xs uppercase tracking-widest'}>{task.type}</Text>
                </View>
              </View>

              <View className="flex-row justify-between items-center px-1">
                <View className="flex-row items-center">
                  <Ionicons name="time" size={18} color="#8B5A2B" />
                  <Text className="text-[#4A3728] font-bold ml-2">{task.time}</Text>
                </View>
                <View className="flex-row items-center">
                  <Ionicons name="people" size={18} color="#8B5A2B" />
                  <Text className="text-[#A07A63] font-bold ml-2">{task.members} Members</Text>
                </View>
              </View>
            </Animated.View>
          ))}
          <View className="h-48" /> {/* Massive padding to clear both the toggle AND the nav bar */}
        </ScrollView>

        {/* Giant Floating Availability Toggle */}
        <Animated.View entering={FadeInUp.delay(300).springify()} className="absolute bottom-28 left-0 right-0 px-2">
          <TouchableOpacity 
            onPress={() => setIsAvailable(!isAvailable)}
            className={`w-full py-5 rounded-3xl flex-row items-center justify-center shadow-2xl border-2 ${
              isAvailable 
                ? 'bg-white border-green-400 shadow-green-500/20' 
                : 'bg-white border-red-400 shadow-red-500/20'
            }`}
          >
            <View className={`w-3 h-3 rounded-full mr-3 ${isAvailable ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
            <Text className={`font-black text-lg uppercase tracking-widest ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
              {isAvailable ? "Status: Available" : "Status: Offline"}
            </Text>
          </TouchableOpacity>
        </Animated.View>

      </View>
    );
  };

  // ==========================================
  // MAIN COMPONENT RETURN
  // ==========================================
  return (
    <View className="flex-1 bg-[#FAF8F5] w-full h-screen">
      <Animated.View entering={FadeIn.duration(800)} className="flex-1 p-6 pt-12">
        
        {/* Universal Header */}
        <View className="mb-8 border-b-2 border-[#F9DCB4]/50 pb-4">
          <Text className="text-[#8B5A2B] text-[10px] font-extrabold tracking-widest uppercase mb-1">
            {role.toUpperCase()}
          </Text>
          <Text className="text-[#4A3728] font-black text-3xl tracking-tight">
            Master Control
          </Text>
        </View>

        {/* Branch Logic */}
        {role === "Gate Officer" ? renderGateOfficerMaster() : renderStaffMaster()}

      </Animated.View>
    </View>
  );
}