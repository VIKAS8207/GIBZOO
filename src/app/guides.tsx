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
    <View className="flex-1 bg-[#FAF8F5] w-full h-screen">
      
      {/* Custom Header with Back Button */}
      <View className="flex-row items-center p-6 pt-12 border-b-2 border-[#F9DCB4]/50">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="mr-4 bg-white border-2 border-[#D4A373]/40 p-2.5 rounded-full shadow-sm shadow-[#8B5A2B]/10"
        >
          <Ionicons name="arrow-back" size={24} color="#8B5A2B" />
        </TouchableOpacity>
        <Text className="text-[#4A3728] font-black text-2xl tracking-tight">Active Guides</Text>
      </View>

      <ScrollView className="flex-1 p-6" showsVerticalScrollIndicator={false}>
        {mockGuides.map((guide, index) => (
          <Animated.View 
            key={guide.id} 
            entering={FadeInUp.delay(index * 100).springify()}
            className="bg-white p-5 rounded-3xl mb-4 border-2 border-[#D4A373]/30 flex-row items-center shadow-md shadow-[#8B5A2B]/10"
          >
            {/* Guide Avatar */}
            <View className="w-14 h-14 bg-[#F9DCB4]/50 rounded-2xl items-center justify-center border border-[#D4A373]/30 mr-4 shadow-sm shadow-[#8B5A2B]/10">
              <Ionicons name="person" size={24} color="#8B5A2B" />
            </View>
            
            <View className="flex-1">
              <Text className="text-[#4A3728] font-black text-lg">{guide.name}</Text>
              <Text className="text-[#A07A63] font-bold text-xs mb-1.5">{guide.languages}</Text>
              <View className="flex-row items-center">
                <Ionicons name="star" size={14} color="#8B5A2B" />
                <Text className="text-[#8B5A2B] text-xs ml-1 font-black">{guide.rating}</Text>
              </View>
            </View>

            {/* Pricing Section */}
            <View className="items-end">
              <Text className="text-[#A07A63] text-[10px] font-black uppercase tracking-widest mb-1">Per Trip</Text>
              <Text className="text-[#4A3728] font-black text-xl">₹{guide.charge}</Text>
            </View>
          </Animated.View>
        ))}
        <View className="h-10" />
      </ScrollView>
    </View>
  );
}