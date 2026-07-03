import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';

export default function TicketDetailsScreen() {
  const router = useRouter();

  // Mock Ticket Data
  const ticketData = {
    id: "TKT-8849",
    name: "Jungle Safari Full Tour",
    time: "10:30 AM Slot",
    members: 4,
  };

  // State for our custom dropdowns
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<'guide' | 'driver' | null>(null);

  const guidesList = ["Amit Sharma", "Neha Singh", "Ravi Tiwari"];
  const driversList = ["Rahul Verma", "Suresh Kumar", "Vikash Patel"];

  const handleAssign = () => {
    if (!selectedGuide || !selectedDriver) {
      alert("Please select both a Guide and a Driver before assigning.");
      return;
    }
    // In a real app, send data to backend here!
    alert(`Ticket Assigned!\nGuide: ${selectedGuide}\nDriver: ${selectedDriver}`);
    router.back(); // Go back to dashboard
  };

  return (
    <View className="flex-1 bg-[#050505] w-full h-screen">
      
      {/* Header */}
      <View className="flex-row items-center p-6 pt-12 border-b border-zinc-800">
        <TouchableOpacity onPress={() => router.back()} className="mr-4 bg-zinc-900 p-2 rounded-full">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View>
          <Text className="text-yellow-500 font-bold text-xs uppercase tracking-widest mb-1">Scanned Ticket</Text>
          <Text className="text-white font-extrabold text-2xl">Assignment</Text>
        </View>
      </View>

      <ScrollView className="flex-1 p-6" showsVerticalScrollIndicator={false}>
        
        {/* Ticket Details Card */}
        <Animated.View entering={FadeInUp.duration(500)} className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 mb-8">
          <View className="flex-row justify-between items-start mb-6">
            <View>
              <Text className="text-white font-extrabold text-xl">{ticketData.name}</Text>
              <Text className="text-zinc-400 mt-1">ID: {ticketData.id}</Text>
            </View>
            <View className="bg-yellow-500 px-3 py-1 rounded border border-yellow-400">
              <Text className="text-black font-extrabold">VIP</Text>
            </View>
          </View>

          <View className="flex-row justify-between border-t border-zinc-800/50 pt-4">
            <View className="flex-row items-center">
              <Ionicons name="time" size={20} color="#facc15" />
              <Text className="text-white font-bold ml-2">{ticketData.time}</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="people" size={20} color="#facc15" />
              <Text className="text-white font-bold ml-2">{ticketData.members} Members</Text>
            </View>
          </View>
        </Animated.View>

        {/* Guide Selection Dropdown */}
        <Animated.View entering={FadeInUp.delay(100).duration(500)} className="mb-6">
          <Text className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-2 ml-1">Assign Guide</Text>
          <TouchableOpacity 
            onPress={() => setOpenDropdown(openDropdown === 'guide' ? null : 'guide')}
            className="flex-row justify-between items-center bg-black border border-zinc-700 p-4 rounded-xl"
          >
            <Text className={selectedGuide ? "text-white font-bold" : "text-zinc-500 font-medium"}>
              {selectedGuide || "Select a Guide..."}
            </Text>
            <Ionicons name={openDropdown === 'guide' ? "chevron-up" : "chevron-down"} size={20} color="white" />
          </TouchableOpacity>
          
          {/* Dropdown Options */}
          {openDropdown === 'guide' && (
            <View className="bg-zinc-900 border border-zinc-800 rounded-xl mt-2 overflow-hidden">
              {guidesList.map((guide, index) => (
                <TouchableOpacity 
                  key={index}
                  onPress={() => { setSelectedGuide(guide); setOpenDropdown(null); }}
                  className="p-4 border-b border-zinc-800/50 flex-row items-center"
                >
                  <Ionicons name="person" size={16} color="#94a3b8" className="mr-3" />
                  <Text className="text-white font-medium">{guide}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </Animated.View>

        {/* Driver Selection Dropdown */}
        <Animated.View entering={FadeInUp.delay(200).duration(500)} className="mb-10">
          <Text className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-2 ml-1">Assign Driver</Text>
          <TouchableOpacity 
            onPress={() => setOpenDropdown(openDropdown === 'driver' ? null : 'driver')}
            className="flex-row justify-between items-center bg-black border border-zinc-700 p-4 rounded-xl"
          >
            <Text className={selectedDriver ? "text-white font-bold" : "text-zinc-500 font-medium"}>
              {selectedDriver || "Select a Driver..."}
            </Text>
            <Ionicons name={openDropdown === 'driver' ? "chevron-up" : "chevron-down"} size={20} color="white" />
          </TouchableOpacity>
          
          {/* Dropdown Options */}
          {openDropdown === 'driver' && (
            <View className="bg-zinc-900 border border-zinc-800 rounded-xl mt-2 overflow-hidden">
              {driversList.map((driver, index) => (
                <TouchableOpacity 
                  key={index}
                  onPress={() => { setSelectedDriver(driver); setOpenDropdown(null); }}
                  className="p-4 border-b border-zinc-800/50 flex-row items-center"
                >
                  <Ionicons name="car" size={16} color="#94a3b8" className="mr-3" />
                  <Text className="text-white font-medium">{driver}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </Animated.View>

        {/* Final Assign Button */}
        <Animated.View entering={FadeIn.delay(400)}>
          <TouchableOpacity 
            onPress={handleAssign}
            className={`w-full py-4 rounded-xl items-center shadow-lg mb-12 ${
              selectedGuide && selectedDriver ? "bg-yellow-500 shadow-yellow-500/20" : "bg-zinc-800"
            }`}
          >
            <Text className={selectedGuide && selectedDriver ? "text-black font-extrabold text-lg" : "text-zinc-500 font-bold text-lg"}>
              Confirm & Assign
            </Text>
          </TouchableOpacity>
        </Animated.View>

      </ScrollView>
    </View>
  );
}