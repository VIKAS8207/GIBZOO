import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';

export default function MasterScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'Guide' | 'Driver'>('Guide');

  const totals = { Guide: 42, Driver: 28 };
  const monthlyRevenue = [
    { id: 1, month: 'April 2026', type: 'Peak Season', amount: '+₹1,42,830', icon: 'leaf' },
    { id: 2, month: 'March 2026', type: 'Standard Rate', amount: '+₹98,200', icon: 'water' },
    { id: 3, month: 'February 2026', type: 'Standard Rate', amount: '+₹85,400', icon: 'partly-sunny' },
    { id: 4, month: 'January 2026', type: 'Low Season', amount: '+₹62,100', icon: 'snow' },
  ];

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/home');
    }
  };

  return (
    <View className="flex-1 bg-black w-full h-screen">
      
      {/* Top Sheet (Pastel Purple) */}
      <Animated.View entering={FadeInDown.duration(600)} className="bg-[#E6E5F3] pt-16 pb-6 rounded-b-[40px] items-center z-20">
        <View className="w-full px-6 flex-row justify-start mb-2">
          <TouchableOpacity onPress={handleBack} activeOpacity={0.8} className="w-10 h-10 border border-black/20 rounded-full items-center justify-center">
            <Ionicons name="arrow-back" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <View className="items-center mb-8">
          <View className="w-12 h-12 bg-black rounded-full items-center justify-center mb-3 shadow-sm">
            <Ionicons name="wallet" size={20} color="white" />
          </View>
          <Text className="text-black font-extrabold text-sm mb-1 tracking-wide">Current Month Revenue</Text>
          <Text className="text-black font-black text-5xl tracking-tighter">₹1,42,830</Text>
          <View className="bg-black/5 px-3 py-1 rounded-full mt-3">
            <Text className="text-zinc-600 font-bold text-[10px] uppercase tracking-widest">Total Collected</Text>
          </View>
        </View>

        <View className="w-full px-6 flex-row gap-x-3">
          <TouchableOpacity onPress={() => setActiveTab('Guide')} activeOpacity={0.9} className={`flex-1 py-4 rounded-[24px] items-center justify-center ${activeTab === 'Guide' ? 'bg-black shadow-lg shadow-black/30' : 'bg-black/5'}`}>
            <Text className={`font-black text-sm tracking-wide ${activeTab === 'Guide' ? 'text-white' : 'text-black'}`}>Guide</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('Driver')} activeOpacity={0.9} className={`flex-1 py-4 rounded-[24px] items-center justify-center ${activeTab === 'Driver' ? 'bg-black shadow-lg shadow-black/30' : 'bg-black/5'}`}>
            <Text className={`font-black text-sm tracking-wide ${activeTab === 'Driver' ? 'text-white' : 'text-black'}`}>Driver</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <Animated.View key={activeTab} entering={FadeInUp.duration(400).springify()} className="bg-[#32A042] mx-6 mt-6 p-5 rounded-[24px] flex-row items-center justify-between shadow-lg shadow-[#32A042]/20">
          <View className="flex-row items-center flex-1">
            <View className="w-12 h-12 bg-black/20 rounded-full items-center justify-center mr-4">
              <Ionicons name={activeTab === 'Guide' ? 'map' : 'car'} size={24} color="white" />
            </View>
            <View>
              <Text className="text-white font-black text-base tracking-wide">Total Active {activeTab}s</Text>
              <Text className="text-white/80 font-bold text-xs mt-0.5">Currently allocated</Text>
            </View>
          </View>
          <Text className="text-white font-black text-4xl">{totals[activeTab]}</Text>
        </Animated.View>

        <View className="px-6 mt-10 mb-4 flex-row items-center justify-between">
          <Text className="text-white font-black text-xl tracking-tight">Revenue History</Text>
        </View>

        <View className="px-6 pb-24">
          {monthlyRevenue.map((item, index) => (
            <Animated.View key={item.id} entering={FadeInUp.delay(300 + (index * 100)).springify()} className="bg-[#1C1C1E] p-4 rounded-[24px] mb-3 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-black rounded-full items-center justify-center border border-white/5 mr-4">
                  <Ionicons name={item.icon as any} size={18} color="#32A042" />
                </View>
                <View>
                  <Text className="text-white font-black text-base">{item.month}</Text>
                  <Text className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest mt-1">{item.type}</Text>
                </View>
              </View>
              <Text className="text-white font-black text-lg">{item.amount}</Text>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}