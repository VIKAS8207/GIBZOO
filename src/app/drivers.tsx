import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function DriversScreen() {
  const router = useRouter();

  const mockDrivers = [
    { id: 'D1', name: 'Rahul Verma', vehicle: 'Safari Jeep (Open)', plate: 'CG04 AB 1234', charge: 1000 },
    { id: 'D2', name: 'Suresh Kumar', vehicle: 'Gypsy 4x4', plate: 'CG04 XY 9876', charge: 800 },
    { id: 'D3', name: 'Vikash Patel', vehicle: 'Minivan (AC)', plate: 'CG04 MN 4567', charge: 1500 },
  ];

  return (
    <View className="flex-1 bg-[#050505] w-full h-screen">
      <View className="flex-row items-center p-6 pt-12 border-b border-zinc-800">
        <TouchableOpacity onPress={() => router.back()} className="mr-4 bg-zinc-900 p-2 rounded-full">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white font-extrabold text-2xl">Fleet & Drivers</Text>
      </View>

      <ScrollView className="flex-1 p-6">
        {mockDrivers.map((driver, index) => (
          <Animated.View 
            key={driver.id} 
            entering={FadeInDown.delay(index * 100).springify()}
            className="bg-zinc-900 p-5 rounded-3xl mb-4 border border-zinc-800 flex-row items-center"
          >
            <View className="w-14 h-14 bg-black rounded-xl items-center justify-center border border-zinc-700 mr-4">
              <Ionicons name="car-sport" size={28} color="#facc15" />
            </View>
            
            <View className="flex-1">
              <Text className="text-white font-bold text-lg">{driver.name}</Text>
              <Text className="text-zinc-300 text-sm">{driver.vehicle}</Text>
              
              <View className="bg-black self-start px-2 py-1 rounded mt-2 border border-zinc-800">
                <Text className="text-yellow-500 text-[10px] font-extrabold tracking-widest">{driver.plate}</Text>
              </View>
            </View>

            <View className="items-end justify-center">
              <Text className="text-zinc-500 text-xs font-medium mb-1">Rate</Text>
              <Text className="text-white font-extrabold text-xl">₹{driver.charge}</Text>
            </View>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}