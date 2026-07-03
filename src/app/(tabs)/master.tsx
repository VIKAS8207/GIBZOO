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
        
        {/* Custom Segmented Toggle */}
        <Animated.View entering={FadeInDown.duration(500)} className="flex-row bg-zinc-900 p-1 rounded-xl border border-zinc-800 mb-6">
          <TouchableOpacity 
            onPress={() => setActiveTab('Guide')}
            className={`flex-1 py-3 rounded-lg items-center ${activeTab === 'Guide' ? 'bg-yellow-500' : 'bg-transparent'}`}
          >
            <Text className={`font-bold text-sm ${activeTab === 'Guide' ? 'text-black' : 'text-zinc-500'}`}>Active Guides</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setActiveTab('Driver')}
            className={`flex-1 py-3 rounded-lg items-center ${activeTab === 'Driver' ? 'bg-yellow-500' : 'bg-transparent'}`}
          >
            <Text className={`font-bold text-sm ${activeTab === 'Driver' ? 'text-black' : 'text-zinc-500'}`}>Active Drivers</Text>
          </TouchableOpacity>
        </Animated.View>

        <Text className="text-white font-bold text-lg mb-4 ml-1">Real-Time Status</Text>

        {/* Dynamic Status List */}
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1 -mx-2 px-2">
          {currentList.map((person, index) => (
            <Animated.View 
              key={person.id} 
              entering={FadeInUp.delay(index * 100).springify()}
              className="bg-zinc-900 p-4 rounded-2xl mb-3 border border-zinc-800"
            >
              <View className="flex-row justify-between items-center mb-3 pb-3 border-b border-zinc-800/50">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-black rounded-full items-center justify-center border border-zinc-700 mr-3">
                    <Ionicons name={activeTab === 'Guide' ? 'map' : 'car'} size={18} color="#a1a1aa" />
                  </View>
                  <Text className="text-white font-bold text-lg">{person.name}</Text>
                </View>
                
                {/* Visual Status Indicator */}
                <View className={`px-3 py-1 rounded-full border flex-row items-center ${
                  person.status === 'Available' ? 'bg-green-500/10 border-green-500/30' : 
                  person.status === 'Booked' ? 'bg-yellow-500/10 border-yellow-500/30' : 
                  'bg-zinc-800 border-zinc-700'
                }`}>
                  <View className={`w-2 h-2 rounded-full mr-2 ${
                    person.status === 'Available' ? 'bg-green-500' : 
                    person.status === 'Booked' ? 'bg-yellow-500' : 'bg-zinc-500'
                  }`} />
                  <Text className={`text-xs font-bold uppercase tracking-wider ${
                    person.status === 'Available' ? 'text-green-500' : 
                    person.status === 'Booked' ? 'text-yellow-500' : 'text-zinc-500'
                  }`}>{person.status}</Text>
                </View>
              </View>

              {person.status === 'Booked' ? (
                <View className="flex-row justify-between items-center px-1">
                  <Text className="text-zinc-400 text-sm">Assigned: <Text className="text-white font-bold">{person.assignment}</Text></Text>
                  <Text className="text-zinc-500 text-xs">{person.time}</Text>
                </View>
              ) : (
                <Text className="text-zinc-500 text-xs px-1 italic">
                  {person.status === 'Offline' ? 'Currently off duty' : 'Waiting for assignment...'}
                </Text>
              )}
            </Animated.View>
          ))}
          <View className="h-10" />
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
        <Animated.View entering={FadeInDown.duration(500)} className="flex-row justify-between mb-6 gap-x-3">
          <View className="flex-1 bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
            <Text className="text-zinc-400 text-xs font-bold uppercase mb-1">Pending</Text>
            <Text className="text-white font-extrabold text-2xl">2</Text>
          </View>
          <View className="flex-1 bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
            <Text className="text-zinc-400 text-xs font-bold uppercase mb-1">Completed</Text>
            <Text className="text-yellow-500 font-extrabold text-2xl">4</Text>
          </View>
        </Animated.View>

        <Text className="text-white font-bold text-lg mb-4 ml-1">My Assignments</Text>

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1 -mx-2 px-2">
          {assignments.map((task, index) => (
            <Animated.View 
              key={task.id} 
              entering={FadeInUp.delay(index * 100).springify()}
              className="bg-zinc-900 p-5 rounded-3xl mb-4 border border-zinc-800"
            >
              <View className="flex-row justify-between items-center mb-4 pb-4 border-b border-zinc-800/50">
                <View>
                  <Text className="text-white font-extrabold text-xl mb-1">Group {task.group}</Text>
                  <Text className="text-zinc-500 text-xs">{task.id}</Text>
                </View>
                <View className={`px-3 py-1 rounded border ${task.type === 'VIP' ? 'bg-yellow-500/20 border-yellow-500/50' : 'bg-black border-zinc-700'}`}>
                  <Text className={task.type === 'VIP' ? 'text-yellow-500 font-bold text-xs' : 'text-zinc-400 font-bold text-xs'}>{task.type}</Text>
                </View>
              </View>

              <View className="flex-row justify-between items-center px-1">
                <View className="flex-row items-center">
                  <Ionicons name="time" size={16} color="#facc15" />
                  <Text className="text-white font-bold ml-2">{task.time}</Text>
                </View>
                <View className="flex-row items-center">
                  <Ionicons name="people" size={16} color="#a1a1aa" />
                  <Text className="text-zinc-300 ml-2">{task.members} Members</Text>
                </View>
              </View>
            </Animated.View>
          ))}
          <View className="h-32" /> {/* Extra padding for the bottom toggle */}
        </ScrollView>

        {/* Giant Floating Availability Toggle */}
        <Animated.View entering={FadeInUp.delay(300).springify()} className="absolute bottom-6 left-0 right-0">
          <TouchableOpacity 
            onPress={() => setIsAvailable(!isAvailable)}
            className={`w-full py-5 rounded-2xl flex-row items-center justify-center shadow-2xl border ${
              isAvailable 
                ? 'bg-green-500/20 border-green-500/50 shadow-green-500/20' 
                : 'bg-red-500/20 border-red-500/50 shadow-red-500/20'
            }`}
          >
            <View className={`w-3 h-3 rounded-full mr-3 ${isAvailable ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
            <Text className={`font-extrabold text-lg uppercase tracking-widest ${isAvailable ? 'text-green-500' : 'text-red-500'}`}>
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
    <View className="flex-1 bg-[#050505] w-full h-screen">
      <Animated.View entering={FadeIn.duration(800)} className="flex-1 p-6 pt-12">
        
        {/* Universal Header */}
        <View className="mb-6 border-b border-zinc-800/50 pb-4">
          <Text className="text-yellow-500 text-xs font-bold tracking-widest uppercase mb-1">
            {role.toUpperCase()}
          </Text>
          <Text className="text-white font-extrabold text-2xl tracking-tight">
            Master Control
          </Text>
        </View>

        {/* Branch Logic */}
        {role === "Gate Officer" ? renderGateOfficerMaster() : renderStaffMaster()}

      </Animated.View>
    </View>
  );
}