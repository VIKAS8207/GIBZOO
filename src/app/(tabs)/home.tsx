import React, { useState, useCallback } from "react";
import { Text, View, TouchableOpacity, ScrollView, Dimensions, Image, BackHandler } from "react-native";
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';

// Chart Kit Imports
import { PieChart, LineChart } from "react-native-chart-kit";

// Segregated Components
import StaffDashboard from "../../components/StaffDashboard";

// ==========================================
// 🎛️ MASTER UI CONTROLS (Customize Here)
// ==========================================
// Change this to "max-w-full" to stretch edge-to-edge on phones, 
// or set to something like "max-w-[500px]" to restrict it on tablets/web!
const APP_MAX_WIDTH = "max-w-full w-full mx-auto"; 

// The color of the screen below the hero image.
const LOWER_BG_COLOR = "bg-[#F9DCB4]"; 

// Mobile Chart Padding Fix
const chartWidth = Dimensions.get("window").width - 80; 

export default function DashboardScreen() {
  const router = useRouter();
  
  const { userRole } = useLocalSearchParams();
  const roleString = (userRole as string) || "Gate Officer"; 
  
  const [isCameraVisible, setCameraVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [isSyncing, setIsSyncing] = useState(false);

  // ==========================================
  // FORCE HARDWARE BACK BUTTON TO LOGIN
  // ==========================================
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

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1500);
  };

  // ==========================================
  // GATE OFFICER UI 
  // ==========================================
  const renderGateOfficerUI = () => {
    
    const pieData = [
      { name: "Normal", population: 215, color: "#facc15", legendFontColor: "#d4d4d8" }, 
      { name: "Mediocre", population: 130, color: "#3f3f46", legendFontColor: "#d4d4d8" }, 
      { name: "VIP", population: 45, color: "#18181b", legendFontColor: "#d4d4d8" },      
    ];

    const lineData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [{ data: [20, 45, 28, 80, 99, 43] }]
    };

    const chartConfig = {
      backgroundColor: "#18181b",
      backgroundGradientFrom: "#18181b",
      backgroundGradientTo: "#18181b",
      decimalPlaces: 0,
      color: (opacity = 1) => `rgba(250, 204, 21, ${opacity})`, 
      labelColor: (opacity = 1) => `rgba(161, 161, 170, ${opacity})`, 
      style: { borderRadius: 16 },
      propsForDots: { r: "4", strokeWidth: "2", stroke: "#facc15" }
    };

    return (
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        
        {/* FIXED: Removed negative margins and w-screen. Just w-full! */}
        <View className="w-full h-48">
          <Image 
            source={require("../../../assets/hero.jpg")}
            className="w-full h-full opacity-70"
            resizeMode="cover"
          />
        </View>

        {/* FIXED: Lower background acts as a wrapper without negative margins */}
        <View className={`flex-1 ${LOWER_BG_COLOR} pt-8 rounded-t-2xl -mt-6 shadow-2xl shadow-black pb-12`}>
          
          {/* Inner wrapper to keep padding safe from the edges */}
          <View className="px-6">
            {/* Quick Action Grid */}
            <View className="flex-row justify-between items-center mb-8 w-full">
              <TouchableOpacity onPress={openCamera} className="flex-1 bg-yellow-500 py-4 rounded-2xl items-center justify-center mr-2 shadow-lg shadow-yellow-500/20">
                <Ionicons name="qr-code-outline" size={24} color="#050505" className="mb-1" />
                <Text className="text-[#050505] font-bold text-[10px] uppercase tracking-wider text-center">Scan</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/history')} className="flex-1 bg-zinc-900 py-4 rounded-2xl items-center justify-center mx-1 border border-zinc-800">
                <Ionicons name="time-outline" size={24} color="white" className="mb-1" />
                <Text className="text-white font-semibold text-[10px] uppercase tracking-wider text-center">History</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/guides')} className="flex-1 bg-zinc-900 py-4 rounded-2xl items-center justify-center mx-1 border border-zinc-800">
                <Ionicons name="map-outline" size={24} color="white" className="mb-1" />
                <Text className="text-white font-semibold text-[10px] uppercase tracking-wider text-center">Guides</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/drivers')} className="flex-1 bg-zinc-900 py-4 rounded-2xl items-center justify-center ml-2 border border-zinc-800">
                <Ionicons name="car-outline" size={24} color="white" className="mb-1" />
                <Text className="text-white font-semibold text-[10px] uppercase tracking-wider text-center">Drivers</Text>
              </TouchableOpacity>
            </View>

            <Text className="text-zinc-500 font-bold text-lg mb-4 ml-1">Recent Tickets</Text>
          </View>

          {/* Active Tickets (Horizontal Scroll) */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8 pl-6">
            
            <View className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 mr-4 w-64 shadow-xl">
              <View className="flex-row justify-between items-center mb-2 pb-2 border-b border-zinc-800/50">
                <Text className="text-yellow-500 font-bold text-xs uppercase tracking-widest">VIP Ticket</Text>
                <Text className="text-zinc-500 text-xs font-medium">10m ago</Text>
              </View>
              <Text className="text-white font-extrabold text-xl mb-3">Group #2045</Text>
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Ionicons name="person" size={14} color="#a1a1aa" />
                  <Text className="text-zinc-400 text-xs ml-1">Neha S.</Text>
                </View>
                <View className="flex-row items-center">
                  <Ionicons name="car" size={14} color="#a1a1aa" />
                  <Text className="text-zinc-400 text-xs ml-1">Vikash</Text>
                </View>
              </View>
            </View>

            <View className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 mr-4 w-64 shadow-xl">
              <View className="flex-row justify-between items-center mb-2 pb-2 border-b border-zinc-800/50">
                <Text className="text-zinc-300 font-bold text-xs uppercase tracking-widest">Normal</Text>
                <Text className="text-zinc-500 text-xs font-medium">25m ago</Text>
              </View>
              <Text className="text-white font-extrabold text-xl mb-3">Group #2044</Text>
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Ionicons name="person" size={14} color="#a1a1aa" />
                  <Text className="text-zinc-400 text-xs ml-1">Amit S.</Text>
                </View>
                <View className="flex-row items-center">
                  <Ionicons name="car" size={14} color="#a1a1aa" />
                  <Text className="text-zinc-400 text-xs ml-1">Rahul V.</Text>
                </View>
              </View>
            </View>
            {/* Added spacer to let the user scroll fully to the right edge */}
            <View className="w-10" />
          </ScrollView>

          {/* Re-apply safe padding for the charts */}
          <View className="px-6">
            {/* The Pie Chart (Ticket Types) */}
            <View className="w-full bg-zinc-900 p-4 rounded-3xl mb-6 border border-zinc-800 shadow-xl">
              <Text className="text-zinc-400 font-bold uppercase tracking-widest text-xs mb-4 ml-2">Ticket Types</Text>
              <PieChart
                data={pieData}
                width={chartWidth}
                height={160}
                chartConfig={chartConfig}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={"0"}
                center={[10, 0]}
                absolute 
              />
            </View>

            {/* The Line Graph (Revenue Trend) */}
            <View className="w-full bg-zinc-900 p-4 pt-6 rounded-3xl mb-8 border border-zinc-800 shadow-xl">
              <Text className="text-zinc-400 font-bold uppercase tracking-widest text-xs mb-4 ml-2">Revenue Trend (₹ k)</Text>
              <LineChart
                data={lineData}
                width={chartWidth} 
                height={180}
                chartConfig={{...chartConfig, paddingRight: 30}} 
                bezier 
                style={{ borderRadius: 16 }}
                withInnerLines={false}
              />
            </View>

            {/* Today's Scheduled Tickets List */}
            <Text className="text-zinc-500 font-bold text-lg mb-4 ml-1">Today's Schedule</Text>
            {[1, 2, 3].map((item) => (
              <View key={item} className="bg-zinc-900 p-4 rounded-2xl mb-3 border border-zinc-800 flex-row justify-between items-center shadow-xl">
                <View className="flex-row items-center">
                  <View className="w-12 h-12 bg-black rounded-xl items-center justify-center border border-zinc-700 mr-4">
                    <Text className="text-yellow-500 font-extrabold text-sm">{8 + item}:00</Text>
                  </View>
                  <View>
                    <Text className="text-white font-bold">Group #{2040 + item}</Text>
                    <Text className="text-zinc-500 text-xs mt-1">Guide: Amit S. • Driver: Rahul V.</Text>
                  </View>
                </View>
                <TouchableOpacity className="bg-black px-3 py-2 rounded-lg border border-zinc-800">
                  <Text className="text-yellow-500 text-xs font-bold">Details</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          
        </View>
      </ScrollView>
    );
  };

  return (
    // The Root Background
    <View className="flex-1 bg-[#050505]">
      {/* The Constraining Wrapper for Tablets/Desktop */}
      <View className={`${APP_MAX_WIDTH} flex-1 overflow-hidden`}>
        {/* FIXED: Removed the global p-6 padding so the inner content hits the edges */}
        <Animated.View entering={FadeIn.duration(800)} className="flex-1 pt-12 pb-0">
          
          {/* Mobile Adjusted Header (Added px-6 here to keep it padded) */}
          <View className="flex-row justify-between items-center  pb-2 z-10 px-6">
            <View>
              <Text className="text-[#F9DCB4] text-[8px] font-bold tracking-widest uppercase mb-1">
                {roleString.toUpperCase()}
              </Text>
              <Text className="text-white font-bold text-2xl tracking-tight">
                Dashboard
              </Text>
            </View>
            
            <View className="flex-row items-center">
              {roleString === "Gate Officer" ? (
                <TouchableOpacity 
                  onPress={handleSync}
                  disabled={isSyncing}
                  className="bg-zinc-900 border border-zinc-700 px-4 py-2 rounded-full flex-row items-center shadow-lg shadow-black"
                >
                  <Ionicons name="sync" size={16} color={isSyncing ? "#a1a1aa" : "#F9DCB4"} />
                  <Text className={isSyncing ? "text-zinc-400 font-bold ml-2 text-xs" : "text-[#F9DCB4] font-bold ml-2 text-xs"}>
                    {isSyncing ? "SYNCING..." : "SYNC"}
                  </Text>
                </TouchableOpacity>
              ) : (
                <>
                  <Text className="text-zinc-300 font-bold text-xs mr-3 text-right">
                    {roleString === "Guide" ? "Amit Sharma" : "Rahul Verma"}
                  </Text>
                  <View className="w-10 h-10 bg-zinc-800 rounded-full items-center justify-center border border-yellow-500 shadow-sm shadow-yellow-500/20">
                    <Ionicons name="person" size={20} color="white" />
                  </View>
                </>
              )}
            </View>
          </View>

          {roleString === "Gate Officer" 
            ? renderGateOfficerUI() 
            : (
              // Add padding back specifically for the Staff Dashboard 
              <View className="px-6 flex-1">
                <StaffDashboard role={roleString} /> 
              </View>
            )
          }

        </Animated.View>

        {/* CAMERA MODAL */}
        {isCameraVisible && (
          <Animated.View entering={FadeIn.duration(300)} className="absolute top-0 left-0 right-0 bottom-0 z-50 bg-black">
            <CameraView className="w-full h-full" facing="back" onBarcodeScanned={handleBarcodeScanned} />
            <View className="absolute top-0 left-0 right-0 bottom-0 justify-between p-12 pt-20">
              <View className="items-center">
                <Text className="text-yellow-500 font-bold text-sm tracking-wider uppercase bg-black/80 px-6 py-3 rounded-full border border-yellow-500/30">
                  Align QR Code
                </Text>
              </View>
              
              <View className="items-center mb-10">
                <TouchableOpacity 
                  onPress={() => {
                    setCameraVisible(false);
                    router.push('/ticket-details');
                  }} 
                  className="bg-yellow-500 px-6 py-3 rounded-full mb-6 flex-row items-center shadow-lg shadow-yellow-500/20"
                >
                  <Ionicons name="arrow-forward-circle" size={20} color="black" className="mr-2" />
                  <Text className="text-black font-extrabold ml-2">Simulate Scan</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setCameraVisible(false)} className="bg-black/80 p-4 rounded-full border border-zinc-700">
                  <Ionicons name="close" size={32} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        )}
      </View>
    </View>
  );
}