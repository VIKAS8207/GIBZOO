import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeInUp, FadeInDown } from 'react-native-reanimated';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function TicketDetailsScreen() {
  const router = useRouter();

  // Updated Ticket Data
  const ticketData = {
    id: "TKT-000021",
    name: "Laxmi Kappor",
    contact: "956856985",
    time: "10:30 AM",
    members: 4,
    type: "VIP"
  };

  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  
  const [permission, requestPermission] = useCameraPermissions();
  const [scanningTarget, setScanningTarget] = useState<'guide' | 'driver' | null>(null);

  const isReady = selectedGuide || selectedDriver;

  const openScanner = async (target: 'guide' | 'driver') => {
    if (!permission?.granted) {
      const { granted } = await requestPermission();
      if (!granted) return; 
    }
    setScanningTarget(target);
  };

  const handleSimulateScan = () => {
    if (scanningTarget === 'guide') {
      setSelectedGuide("Amit Sharma");
    } else if (scanningTarget === 'driver') {
      setSelectedDriver("Rahul Verma");
    }
    setScanningTarget(null);
  };

  const handleAssign = () => {
    if (!isReady) return;
    alert(`Ticket Closed!\nGuide: ${selectedGuide || 'None'}\nDriver: ${selectedDriver || 'None'}`);
    router.back(); 
  };

  return (
    <View className="flex-1 bg-[#F4F4F5] w-full h-screen relative">
      
      {/* CHANGE 1 & 2: Neo-Brutalist Header (No Back Arrow) */}
      <View className="pt-16 pb-6 px-6">
        <Text className="text-black font-black text-3xl tracking-tight">Assignment</Text>
        <Text className="text-zinc-500 font-bold mt-1">Scanned Ticket Details</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        
        {/* CHANGE 3: Custom Perforated Ticket UI */}
        <Animated.View entering={FadeInDown.duration(500)} className="mx-6 mb-8 shadow-sm">
          
          {/* Ticket Top Half (Pastel Purple) */}
          <View className="bg-[#E6E5F3] p-6 pt-8 rounded-t-[32px]">
            <Text className="text-black font-black text-2xl">{ticketData.name}</Text>
            <Text className="text-zinc-500 font-medium mt-1">Ticket ID: {ticketData.id}</Text>
          </View>

          {/* Ticket Perforated Divider with Cutouts */}
          <View className="bg-white h-8 justify-center relative overflow-hidden">
            <View className="h-0 w-full border-b-2 border-dashed border-zinc-200" />
            {/* Left Cutout */}
            <View className="absolute left-[-16px] w-8 h-8 bg-[#F4F4F5] rounded-full" />
            {/* Right Cutout */}
            <View className="absolute right-[-16px] w-8 h-8 bg-[#F4F4F5] rounded-full" />
          </View>

          {/* Ticket Bottom Half (White Grid) */}
          <View className="bg-white p-6 pb-8 rounded-b-[32px] flex-row flex-wrap">
            <View className="w-1/2 mb-6">
              <Text className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest mb-1">Time</Text>
              <Text className="text-black font-black text-base">{ticketData.time}</Text>
            </View>
            <View className="w-1/2 mb-6 pl-2">
              <Text className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest mb-1">Members</Text>
              <Text className="text-black font-black text-base">+{ticketData.members}</Text>
            </View>
            <View className="w-1/2">
              <Text className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest mb-1">Ticket</Text>
              <Text className="text-black font-black text-base">{ticketData.type}</Text>
            </View>
            <View className="w-1/2 pl-2">
              <Text className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest mb-1">Contact</Text>
              <Text className="text-black font-black text-base">{ticketData.contact}</Text>
            </View>
          </View>
        </Animated.View>

        <View className="px-6">
          <Text className="text-black font-extrabold text-sm mb-4">Staff Allocation</Text>

          {/* CHANGE 4: Minimalist Staff Allocation - Guide */}
          <Animated.View entering={FadeInUp.delay(100).duration(500)} className="bg-white p-3 rounded-[24px] mb-4 flex-row items-center justify-between">
            <View className="flex-row items-center flex-1 ml-2">
              <View className="w-10 h-10 bg-[#F4F4F5] rounded-full items-center justify-center mr-4">
                <Ionicons name="map" size={16} color="black" />
              </View>
              <View>
                <Text className="text-zinc-400 font-bold uppercase tracking-widest text-[9px] mb-0.5">Guide</Text>
                {selectedGuide ? (
                  <Text className="text-black font-bold text-base">{selectedGuide}</Text>
                ) : (
                  <Text className="text-zinc-400 font-medium text-xs">Tap scanner to assign</Text>
                )}
              </View>
            </View>
            <TouchableOpacity 
              onPress={() => openScanner('guide')}
              className="w-12 h-12 bg-[#E6E5F3] rounded-[18px] items-center justify-center"
            >
              <Ionicons name="qr-code" size={20} color="black" />
            </TouchableOpacity>
          </Animated.View>

          {/* CHANGE 4: Minimalist Staff Allocation - Driver */}
          <Animated.View entering={FadeInUp.delay(200).duration(500)} className="bg-white p-3 rounded-[24px] mb-10 flex-row items-center justify-between">
            <View className="flex-row items-center flex-1 ml-2">
              <View className="w-10 h-10 bg-[#F4F4F5] rounded-full items-center justify-center mr-4">
                <Ionicons name="car" size={18} color="black" />
              </View>
              <View>
                <Text className="text-zinc-400 font-bold uppercase tracking-widest text-[9px] mb-0.5">Driver</Text>
                {selectedDriver ? (
                  <Text className="text-black font-bold text-base">{selectedDriver}</Text>
                ) : (
                  <Text className="text-zinc-400 font-medium text-xs">Tap scanner to assign</Text>
                )}
              </View>
            </View>
            <TouchableOpacity 
              onPress={() => openScanner('driver')}
              className="w-12 h-12 bg-[#E6E5F3] rounded-[18px] items-center justify-center"
            >
              <Ionicons name="qr-code" size={20} color="black" />
            </TouchableOpacity>
          </Animated.View>
        </View>

        <View className="h-24" /> 
      </ScrollView>

      {/* CHANGE 5: Floating, Slim, Pill-shaped Bottom Button */}
      <Animated.View entering={FadeIn.delay(300)} className="absolute bottom-8 left-6 right-6">
        <TouchableOpacity 
          onPress={handleAssign}
          disabled={!isReady}
          className={`w-full py-3.5 rounded-full items-center shadow-sm ${
            isReady ? "bg-black" : "bg-zinc-300"
          }`}
        >
          <Text className={isReady ? "text-white font-bold text-sm tracking-wide" : "text-zinc-500 font-bold text-sm tracking-wide"}>
            Close & Assign Ticket
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* QR SCANNER MODAL */}
      {scanningTarget && (
        <Animated.View entering={FadeIn.duration(300)} className="absolute top-0 left-0 right-0 bottom-0 z-50 bg-black/95">
          <CameraView className="w-full h-full absolute" facing="back" onBarcodeScanned={() => {}} />
          
          <View className="absolute top-0 left-0 right-0 bottom-0 justify-between p-8 pt-20 pb-16">
            <View className="items-center">
              <Text className="text-black font-bold text-sm tracking-widest uppercase bg-white px-6 py-3 rounded-full shadow-lg">
                Scan {scanningTarget.toUpperCase()} ID
              </Text>
            </View>
            
            <View className="items-center">
              <TouchableOpacity 
                onPress={handleSimulateScan}
                className="bg-white px-8 py-4 rounded-full mb-6 flex-row items-center shadow-xl"
              >
                <Ionicons name="scan-circle" size={24} color="black" className="mr-2" />
                <Text className="text-black font-extrabold ml-1 text-base uppercase tracking-wider">
                  Simulate {scanningTarget} Scan
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setScanningTarget(null)} className="bg-[#2C2C2E] p-4 rounded-full border border-white/10">
                <Ionicons name="close" size={32} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
}