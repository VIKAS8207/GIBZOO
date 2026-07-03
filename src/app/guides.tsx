import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function GuidesScreen() {
  const router = useRouter();

  const mockGuides = [
    { id: 'G1', name: 'Amit Sharma', languages: 'English, Hindi', rating: '4.8', charge: 500 },
    { id: 'G2', name: 'Neha Singh', languages: 'Hindi, Chhattisgarhi', rating: '4.9', charge: 600 },
    { id: 'G3', name: 'Ravi Tiwari', languages: 'English, Hindi, French', rating: '4.7', charge: 800 },
  ];

  return (
    <View className="flex-1 bg-[#050505] w-full h-screen">
      <View className="flex-row items-center p-6 pt-12 border-b border-zinc-800">
        <TouchableOpacity onPress={() => router.back()} className="mr-4 bg-zinc-900 p-2 rounded-full">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white font-extrabold text-2xl">Active Guides</Text>
      </View>

      <ScrollView className="flex-1 p-6">
        {mockGuides.map((guide, index) => (
          <Animated.View 
            key={guide.id} 
            entering={FadeInUp.delay(index * 100).springify()}
            className="bg-zinc-900 p-5 rounded-3xl mb-4 border border-zinc-800 flex-row items-center"
          >
            <View className="w-14 h-14 bg-black rounded-full items-center justify-center border border-yellow-500 mr-4">
              <Ionicons name="person" size={24} color="white" />
            </View>
            
            <View className="flex-1">
              <Text className="text-white font-bold text-lg">{guide.name}</Text>
              <Text className="text-zinc-400 text-xs mb-1">{guide.languages}</Text>
              <View className="flex-row items-center">
                <Ionicons name="star" size={14} color="#facc15" />
                <Text className="text-yellow-500 text-xs ml-1 font-bold">{guide.rating}</Text>
              </View>
            </View>

            <View className="items-end">
              <Text className="text-zinc-500 text-xs font-medium mb-1">Per Trip</Text>
              <Text className="text-white font-extrabold text-lg">₹{guide.charge}</Text>
            </View>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}