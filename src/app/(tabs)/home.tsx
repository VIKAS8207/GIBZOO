import React, { useState, useCallback } from "react";
import { Text, View, TouchableOpacity, ScrollView, Dimensions, BackHandler } from "react-native";
import { useRouter, useGlobalSearchParams, useFocusEffect } from "expo-router";
import Animated, { FadeIn, FadeInDown, FadeInUp } from "react-native-reanimated";
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';

// Chart Kit Imports
import { BarChart } from "react-native-chart-kit";

// Segregated Components
import StaffDashboard from "../../components/StaffDashboard";
import TicketDashboard from "../../components/TicketDashboard"; // <-- ADDED TICKET DASHBOARD IMPORT

const screenWidth = Dimensions.get("window").width;

export default function DashboardScreen() {
  const router = useRouter();
  
  // FIX: Using useGlobalSearchParams so it catches the login params perfectly
  const { userRole } = useGlobalSearchParams();
  const role = (userRole as string) || "Gate Officer"; 
  
  const [isCameraVisible, setCameraVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    // Simulate a network delay
    setTimeout(() => setIsSyncing(false), 1500);
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        router.replace('/login');
        return true; 
      };
      const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => backHandler.remove();
    }, [])
  );

  const openCamera = async () => {
    if (!permission?.granted) {
      const { granted } = await requestPermission();
      if (!granted) return; 
    }
    setCameraVisible(true);
  };

  const handleBarcodeScanned = (result: any) => {
    setCameraVisible(false);
    router.push('/ticket-details');
  };

  // ==========================================
  // GATE OFFICER UI: Neo-Brutalist Fintech Style
  // ==========================================
  const renderGateOfficerUI = () => {
    
    // Full-Width Clean Black & White Bar Chart Data
    const barData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [{ data: [62, 85, 98, 142, 115, 128] }] 
    };

    const barChartConfig = {
      backgroundColor: "#FFFFFF",
      backgroundGradientFrom: "#FFFFFF",
      backgroundGradientTo: "#FFFFFF",
      decimalPlaces: 0,
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
      labelColor: (opacity = 1) => `rgba(161, 161, 170, ${opacity})`, 
      barPercentage: 0.55,
      strokeWidth: 1,
      propsForBackgroundLines: {
        strokeDasharray: "4", 
        stroke: "#F4F4F5", 
      }
    };

    return (
      <View className="flex-1 bg-black w-full h-full">
        
        {/* ==========================================
            LAYER 1: The Purple Header Sheet
        ========================================== */}
        <Animated.View entering={FadeInDown.duration(600)} className="bg-[#E6E5F3] pt-16 pb-12 px-6 rounded-b-[40px] items-center z-20 relative">
          
          <View className="flex-row justify-between w-full mb-8 items-start">
            <View>
              <Text className="text-black font-bold text-xl tracking-tight">Hi {role}!</Text>
              <Text className="text-zinc-500 font-medium mt-0.5">Welcome to your dashboard</Text>
            </View>
            
            {/* The new Sync Button */}
            <TouchableOpacity 
              onPress={handleSync}
              disabled={isSyncing}
              className={`px-5 py-2.5 rounded-full flex-row items-center ${isSyncing ? 'bg-zinc-600' : 'bg-black'}`}
            >
              <Ionicons name="sync" size={16} color="white" />
              <Text className="text-white font-bold text-xs ml-2 tracking-wide uppercase">
                {isSyncing ? "Syncing..." : "Sync"}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="bg-black/5 px-2.5 py-1 rounded mb-2">
            <Text className="text-black font-extrabold text-[10px] tracking-widest uppercase">Arpan Dubey</Text>
          </View>
          
          <View className="flex-row items-baseline mb-4">
            <Text className="text-black font-black text-[56px] tracking-tighter">Gate No 1</Text>
          </View>

          {/* The overlapping History Pill */}
          <TouchableOpacity 
            onPress={() => router.push('/history')}
            className="absolute -bottom-4 bg-[#32A042] px-5 py-2 rounded-full flex-row items-center border-[4px] border-black z-30"
          >
            <Ionicons name="analytics" size={14} color="white" className="mr-1" />
            <Text className="text-white font-bold text-xs tracking-wider">History</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* ==========================================
            LAYER 2: The Navigation Island (Black)
        ========================================== */}
        <Animated.View entering={FadeIn.delay(300).duration(500)} className="flex-row justify-center items-center py-8 z-10 gap-x-3 px-6">
          
          <TouchableOpacity 
            onPress={() => router.push('/guides')}
            className="flex-1 bg-[#2C2C2E] py-4 rounded-[20px] flex-row items-center justify-center"
          >
            <Text className="text-white font-bold mr-2">Guide</Text>
            <Ionicons name="arrow-up-circle-outline" size={18} color="white" />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={openCamera}
            className="bg-[#E6E5F3] w-14 h-14 rounded-[20px] items-center justify-center"
          >
            <Ionicons name="qr-code" size={22} color="black" />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => router.push('/drivers')}
            className="flex-1 bg-[#2C2C2E] py-4 rounded-[20px] flex-row items-center justify-center"
          >
            <Ionicons name="arrow-down-circle-outline" size={18} color="white" className="mr-2" />
            <Text className="text-white font-bold">Driver</Text>
          </TouchableOpacity>

        </Animated.View>

        {/* ==========================================
            LAYER 3: The Data Sheet (White)
        ========================================== */}
        <Animated.View entering={FadeInUp.delay(400).duration(600).springify()} className="flex-1 bg-white rounded-t-[40px] z-20 mt-2 overflow-hidden">
          <ScrollView showsVerticalScrollIndicator={false} className="p-6 pt-8">
            
           {/* ==========================================
               WIDER STATS GRID: Balanced & Spacious
           ========================================== */}
            <View className="flex-row justify-between mb-8 gap-x-2 ">
              
              {/* 1. Trip Traffic Card (Black) */}
              <View className="flex-1 bg-black rounded-[32px] p-6 justify-between min-h-[220px]">
                <View>
                  <Text className="text-white font-extrabold text-sm mb-1">Trip Traffic</Text>
                  <Text className="text-zinc-500 font-medium text-[10px] uppercase tracking-widest">Volume Report</Text>
                </View>
                
                <View className="mt-6">
                  <Text className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest mb-1">Yesterday</Text>
                  <Text className="text-white font-black text-4xl tracking-tighter">42</Text>
                </View>

                <View className="mt-6 pt-4 border-t border-zinc-800 flex-row items-center justify-between">
                  <View>
                    <Text className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest mb-1">This Month</Text>
                    <Text className="text-white font-black text-xl">856</Text>
                  </View>
                  <View className="bg-[#32A042] w-8 h-8 rounded-full items-center justify-center">
                    <Ionicons name="car" size={14} color="white" />
                  </View>
                </View>
              </View>

              {/* 2. Your Income Card (Light Gray) */}
              <View className="flex-1 bg-[#F4F4F5] rounded-[32px] p-6 justify-between min-h-[220px]">
                <View>
                  <Text className="text-black font-extrabold text-sm mb-1">Your Income</Text>
                  <Text className="text-zinc-400 font-medium text-[10px] uppercase tracking-widest">Comparison View</Text>
                </View>
                
                <View className="mt-6">
                  <Text className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest mb-1">This Month</Text>
                  <Text className="text-black font-black text-4xl tracking-tighter">₹2.4k</Text>
                </View>

                <View className="mt-6 pt-4 border-t border-zinc-200 flex-row items-center justify-between">
                  <View>
                    <Text className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest mb-1">Last Month</Text>
                    <Text className="text-zinc-600 font-bold text-sm">₹1.9k</Text>
                  </View>
                  
                  <View className="bg-[#32A042] px-2 py-1 rounded-full flex-row items-center">
                    <Ionicons name="trending-up" size={10} color="white" />
                    <Text className="text-white font-black text-[9px] ml-1">+26%</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* ==========================================
                RENEWED RECENT ACTIVITY & MONTHLY GRAPH
            ========================================== */}
            <View className="mt-4 mb-4">
              <Text className="text-black font-extrabold text-sm mb-4">Revenue Traffic (6 Months)</Text>
              
              {/* Full-Width Smooth Bar Chart */}
              <View className="w-full bg-white rounded-3xl items-center justify-center mb-8 overflow-hidden">
                <BarChart
                  data={barData}
                  width={screenWidth - 48}
                  height={180}
                  yAxisLabel="₹"
                  yAxisSuffix="k"
                  chartConfig={barChartConfig}
                  verticalLabelRotation={0}
                  withInnerLines={true}
                  showBarTops={false}
                  fromZero={true}
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                    paddingRight: 45
                  }}
                />
              </View>
            </View>

            {/* Recent Activity List Title */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-black font-extrabold text-sm">Recent Activity</Text>
              <Ionicons name="arrow-forward" size={18} color="black" />
            </View>

            {/* Clean Line-Separated Activity Ledger */}
            <View className="mb-10">
              <View className="flex-row items-center justify-between py-4 border-b border-zinc-100">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-[#F4F4F5] rounded-full items-center justify-center mr-4">
                    <Ionicons name="car" size={16} color="black" />
                  </View>
                  <View>
                    <Text className="text-black font-black text-sm">Driver Payout</Text>
                    <Text className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">Yesterday</Text>
                  </View>
                </View>
                <Text className="text-black font-black text-base">-₹1,500</Text>
              </View>

              <View className="flex-row items-center justify-between py-4 border-b border-zinc-100">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-[#F4F4F5] rounded-full items-center justify-center mr-4">
                    <Ionicons name="checkmark" size={16} color="#32A042" />
                  </View>
                  <View>
                    <Text className="text-black font-black text-sm">Group #2045</Text>
                    <Text className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">3h ago</Text>
                  </View>
                </View>
                <Text className="text-[#32A042] font-black text-base">+₹2,000</Text>
              </View>

              <TouchableOpacity 
                onPress={() => router.push('/history')} 
                className="items-end pt-4 pb-2"
              >
                <Text className="text-zinc-400 font-extrabold text-xs uppercase tracking-widest">See all activity</Text>
              </TouchableOpacity>
            </View>
            
            <View className="h-10" />
          </ScrollView>
        </Animated.View>
      </View>
    );
  };

  // ==========================================
  // MAIN RETURN BLOCK - FIX IS HERE
  // ==========================================
  return (
    <View className="flex-1 bg-black">
      {role === "Gate Officer" ? (
        renderGateOfficerUI()
      ) : role === "Ticket" ? (
        <View className="flex-1 bg-black">
          {/* Automatically shows the TicketDashboard when logged in as Ticket */}
          <TicketDashboard />
        </View>
      ) : (
        <View className="flex-1 bg-black">
          <StaffDashboard role={role} />
        </View>
      )}

      {/* CAMERA MODAL */}
      {isCameraVisible && (
        <Animated.View entering={FadeIn.duration(300)} className="absolute top-0 left-0 right-0 bottom-0 z-50 bg-black/95">
          <CameraView className="w-full h-full absolute" facing="back" onBarcodeScanned={handleBarcodeScanned} />
          
          <View className="absolute top-0 left-0 right-0 bottom-0 justify-between p-8 pt-20 pb-16">
            <View className="items-center">
              <Text className="text-black font-bold text-sm tracking-widest uppercase bg-white px-6 py-3 rounded-full shadow-lg">
                Align QR Code
              </Text>
            </View>
            
            <View className="items-center">
              <TouchableOpacity 
                onPress={() => {
                  setCameraVisible(false);
                  router.push('/ticket-details');
                }} 
                className="bg-white px-8 py-4 rounded-full mb-6 flex-row items-center shadow-xl"
              >
                <Ionicons name="scan-circle" size={24} color="black" className="mr-2" />
                <Text className="text-black font-extrabold ml-1 text-base uppercase tracking-wider">
                  Simulate Scan
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setCameraVisible(false)} className="bg-[#2C2C2E] p-4 rounded-full border border-white/10">
                <Ionicons name="close" size={32} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
}