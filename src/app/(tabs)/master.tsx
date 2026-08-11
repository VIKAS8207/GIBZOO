import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp, FadeInDown, Layout } from 'react-native-reanimated';

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
    <View className="flex-1 bg-white w-full h-full">
      
      {/* ==========================================
          LAYER 1: The Purple Header Sheet
      ========================================== */}
      <Animated.View entering={FadeInDown.duration(600)} className="bg-[#E6E5F3] pt-16 pb-6 px-6 rounded-b-[40px] z-20 shadow-sm">
        {/* Back Button */}
        <View className="flex-row justify-start mb-6">
          <TouchableOpacity 
            onPress={handleBack} 
            activeOpacity={0.8} 
            className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm"
          >
            <Ionicons name="arrow-back" size={20} color="black" />
          </TouchableOpacity>
        </View>

        {/* Revenue Hero */}
        <View className="items-center mb-8">
          <View className="w-12 h-12 bg-black rounded-full items-center justify-center mb-3 shadow-sm">
            <Ionicons name="wallet" size={20} color="white" />
          </View>
          <Text className="text-black font-extrabold text-sm mb-1 tracking-wide">Current Month Revenue</Text>
          <Text className="text-black font-black text-5xl tracking-tighter">₹1,42,830</Text>
          <View className="bg-white/50 px-3 py-1 rounded-full mt-3 border border-black/5">
            <Text className="text-zinc-600 font-bold text-[10px] uppercase tracking-widest">Total Collected</Text>
          </View>
        </View>

        {/* Tab Switcher (Pill Design) */}
        <View className="flex-row gap-x-3 bg-white p-1.5 rounded-full shadow-sm">
          <TouchableOpacity 
            onPress={() => setActiveTab('Guide')} 
            activeOpacity={0.9} 
            className={`flex-1 py-3 rounded-full items-center justify-center ${activeTab === 'Guide' ? 'bg-black' : 'bg-transparent'}`}
          >
            <Text className={`font-black text-sm tracking-wide ${activeTab === 'Guide' ? 'text-white' : 'text-zinc-500'}`}>Guide</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setActiveTab('Driver')} 
            activeOpacity={0.9} 
            className={`flex-1 py-3 rounded-full items-center justify-center ${activeTab === 'Driver' ? 'bg-black' : 'bg-transparent'}`}
          >
            <Text className={`font-black text-sm tracking-wide ${activeTab === 'Driver' ? 'text-white' : 'text-zinc-500'}`}>Driver</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* ==========================================
          LAYER 2: Clean White Data View
      ========================================== */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        
        {/* Active Staff Card (Removed 'key' to fix the unmount crash) */}
        <Animated.View 
          entering={FadeInUp.delay(200).springify()}
          layout={Layout.springify()} 
          className="bg-[#F4F4F5] mx-6 mt-8 p-6 rounded-[32px] flex-row items-center justify-between shadow-sm"
        >
          <View className="flex-row items-center flex-1">
            <View className="w-12 h-12 bg-white rounded-full items-center justify-center mr-4 border border-zinc-200">
              <Ionicons name={activeTab === 'Guide' ? 'map' : 'car'} size={24} color="black" />
            </View>
            <View>
              <Text className="text-black font-black text-base tracking-wide">Total Active {activeTab}s</Text>
              <Text className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest mt-1">Currently allocated</Text>
            </View>
          </View>
          <Text className="text-black font-black text-4xl tracking-tighter">{totals[activeTab]}</Text>
        </Animated.View>

        <View className="px-6 mt-10 mb-2 flex-row items-center justify-between">
          <Text className="text-black font-extrabold text-xl tracking-tight">Revenue History</Text>
        </View>

        {/* Minimalist Line-Separated Ledger */}
        <View className="px-6 pb-24">
          {monthlyRevenue.map((item, index) => (
            <Animated.View 
              key={item.id} 
              entering={FadeInUp.delay(300 + (index * 50)).springify()} 
              className="py-5 border-b border-zinc-100 flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-[#F4F4F5] rounded-full items-center justify-center mr-4">
                  <Ionicons name={item.icon as any} size={16} color="black" />
                </View>
                <View>
                  <Text className="text-black font-black text-base">{item.month}</Text>
                  <Text className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest mt-1">{item.type}</Text>
                </View>
              </View>
              <Text className="text-[#32A042] font-black text-lg">{item.amount}</Text>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}