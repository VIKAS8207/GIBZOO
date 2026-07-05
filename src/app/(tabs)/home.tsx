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

// Warm off-white/cream base color for the lower half
const LOWER_BG_COLOR = "bg-[#FAF8F5]"; 

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
    
    // Updated Chart Data with Earth Tones
    const pieData = [
      { name: "Normal", population: 215, color: "#8B5A2B", legendFontColor: "#7A5C4A" }, 
      { name: "Mediocre", population: 130, color: "#D4A373", legendFontColor: "#7A5C4A" }, 
      { name: "VIP", population: 45, color: "#F9DCB4", legendFontColor: "#7A5C4A" },      
    ];

    const lineData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [{ data: [20, 45, 28, 80, 99, 43] }]
    };

    // Clean, white background chart configuration
    const chartConfig = {
      backgroundColor: "#FFFFFF",
      backgroundGradientFrom: "#FFFFFF",
      backgroundGradientTo: "#FFFFFF",
      decimalPlaces: 0,
      color: (opacity = 1) => `rgba(139, 90, 43, ${opacity})`, 
      labelColor: (opacity = 1) => `rgba(122, 92, 74, ${opacity})`, 
      style: { borderRadius: 16 },
      propsForDots: { r: "5", strokeWidth: "3", stroke: "#8B5A2B" } 
    };

    return (
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        
        {/* Hero Image Section */}
        <View className="w-full h-48 relative">
          <Image 
            source={require("../../../assets/hero.jpg")}
            className="w-full h-full opacity-90"
            resizeMode="cover"
          />
        </View>

        {/* REFINED: Increased top margin/padding (-mt-10, pt-10) to fix overlap, deeper shadow */}
        <View className={`flex-1 ${LOWER_BG_COLOR} -mt-10 pt-10 rounded-t-[32px] shadow-2xl shadow-[#4A3728]/20 pb-12`}>
          
          {/* Inner wrapper to keep padding safe from the edges */}
          <View className="px-6">
            {/* Quick Action Grid - Popped borders and shadows */}
            <View className="flex-row justify-between items-center mb-10 w-full">
              <TouchableOpacity onPress={openCamera} className="flex-1 bg-[#8B5A2B] py-4 rounded-2xl items-center justify-center mr-2 shadow-xl shadow-[#8B5A2B]/40 border-2 border-[#8B5A2B]">
                <Ionicons name="qr-code-outline" size={24} color="#F9DCB4" className="mb-1" />
                <Text className="text-[#F9DCB4] font-extrabold text-[10px] uppercase tracking-wider text-center">Scan</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/history')} className="flex-1 bg-white py-4 rounded-2xl items-center justify-center mx-1 border-2 border-[#D4A373]/50 shadow-md shadow-[#8B5A2B]/15">
                <Ionicons name="time-outline" size={24} color="#8B5A2B" className="mb-1" />
                <Text className="text-[#8B5A2B] font-extrabold text-[10px] uppercase tracking-wider text-center">History</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/guides')} className="flex-1 bg-white py-4 rounded-2xl items-center justify-center mx-1 border-2 border-[#D4A373]/50 shadow-md shadow-[#8B5A2B]/15">
                <Ionicons name="map-outline" size={24} color="#8B5A2B" className="mb-1" />
                <Text className="text-[#8B5A2B] font-extrabold text-[10px] uppercase tracking-wider text-center">Guides</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/drivers')} className="flex-1 bg-white py-4 rounded-2xl items-center justify-center ml-2 border-2 border-[#D4A373]/50 shadow-md shadow-[#8B5A2B]/15">
                <Ionicons name="car-outline" size={24} color="#8B5A2B" className="mb-1" />
                <Text className="text-[#8B5A2B] font-extrabold text-[10px] uppercase tracking-wider text-center">Drivers</Text>
              </TouchableOpacity>
            </View>

            <Text className="text-[#8B5A2B] font-black text-lg mb-4 ml-1">Recent Tickets</Text>
          </View>

          {/* Active Tickets (Horizontal Scroll) */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8 pl-6">
            
            <View className="bg-white p-5 rounded-3xl border-2 border-[#D4A373]/40 mr-4 w-64 shadow-xl shadow-[#8B5A2B]/20">
              <View className="flex-row justify-between items-center mb-3 pb-3 border-b-2 border-[#F9DCB4]/50">
                <Text className="text-[#8B5A2B] font-black text-xs uppercase tracking-widest">VIP Ticket</Text>
                <Text className="text-[#A07A63] text-xs font-bold">10m ago</Text>
              </View>
              <Text className="text-[#4A3728] font-black text-2xl mb-4">Group #2045</Text>
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Ionicons name="person" size={16} color="#8B5A2B" />
                  <Text className="text-[#8B5A2B] font-bold text-xs ml-1.5">Neha S.</Text>
                </View>
                <View className="flex-row items-center">
                  <Ionicons name="car" size={16} color="#8B5A2B" />
                  <Text className="text-[#8B5A2B] font-bold text-xs ml-1.5">Vikash</Text>
                </View>
              </View>
            </View>

            <View className="bg-white p-5 rounded-3xl border-2 border-[#D4A373]/40 mr-4 w-64 shadow-xl shadow-[#8B5A2B]/20">
              <View className="flex-row justify-between items-center mb-3 pb-3 border-b-2 border-[#F9DCB4]/50">
                <Text className="text-[#8B5A2B] font-black text-xs uppercase tracking-widest">Normal</Text>
                <Text className="text-[#A07A63] text-xs font-bold">25m ago</Text>
              </View>
              <Text className="text-[#4A3728] font-black text-2xl mb-4">Group #2044</Text>
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Ionicons name="person" size={16} color="#8B5A2B" />
                  <Text className="text-[#8B5A2B] font-bold text-xs ml-1.5">Amit S.</Text>
                </View>
                <View className="flex-row items-center">
                  <Ionicons name="car" size={16} color="#8B5A2B" />
                  <Text className="text-[#8B5A2B] font-bold text-xs ml-1.5">Rahul V.</Text>
                </View>
              </View>
            </View>
            <View className="w-10" />
          </ScrollView>

          {/* Re-apply safe padding for the charts */}
          <View className="px-6">
            {/* The Pie Chart (Ticket Types) */}
            <View className="w-full bg-white p-5 rounded-3xl mb-8 border-2 border-[#D4A373]/40 shadow-2xl shadow-[#8B5A2B]/15">
              <Text className="text-[#8B5A2B] font-black uppercase tracking-widest text-xs mb-4 ml-2">Ticket Types</Text>
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
            <View className="w-full bg-white p-5 pt-6 rounded-3xl mb-10 border-2 border-[#D4A373]/40 shadow-2xl shadow-[#8B5A2B]/15">
              <Text className="text-[#8B5A2B] font-black uppercase tracking-widest text-xs mb-4 ml-2">Revenue Trend (₹ k)</Text>
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
            <Text className="text-[#8B5A2B] font-black text-lg mb-4 ml-1">Today's Schedule</Text>
            {[1, 2, 3].map((item) => (
              <View key={item} className="bg-white p-4 rounded-2xl mb-4 border-2 border-[#D4A373]/30 flex-row justify-between items-center shadow-lg shadow-[#8B5A2B]/10">
                <View className="flex-row items-center">
                  <View className="w-12 h-12 bg-[#F9DCB4] rounded-xl items-center justify-center mr-4 shadow-sm shadow-[#8B5A2B]/20">
                    <Text className="text-[#8B5A2B] font-black text-sm">{8 + item}:00</Text>
                  </View>
                  <View>
                    <Text className="text-[#4A3728] font-black text-lg">Group #{2040 + item}</Text>
                    <Text className="text-[#8B5A2B] text-xs mt-1 font-bold">Guide: Amit S. • Driver: Rahul V.</Text>
                  </View>
                </View>
                <TouchableOpacity className="bg-[#8B5A2B] px-4 py-2.5 rounded-xl shadow-md shadow-[#8B5A2B]/30">
                  <Text className="text-[#F9DCB4] text-xs font-black">Details</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          
        </View>
      </ScrollView>
    );
  };

  return (
    // The Root Background updated to warm tone
    <View className="flex-1 bg-[#FAF8F5]">
      {/* The Constraining Wrapper for Tablets/Desktop */}
      <View className={`${APP_MAX_WIDTH} flex-1 overflow-hidden`}>
        <Animated.View entering={FadeIn.duration(800)} className="flex-1 pt-12 pb-0">
          
          {/* Mobile Adjusted Header */}
          <View className="flex-row justify-between items-center pb-2 z-10 px-6">
            <View>
              <Text className="text-[#8B5A2B] text-[10px] font-extrabold tracking-widest uppercase mb-1">
                {roleString.toUpperCase()}
              </Text>
              <Text className="text-[#4A3728] font-black text-3xl tracking-tight">
                Dashboard
              </Text>
            </View>
            
            <View className="flex-row items-center">
              {roleString === "Gate Officer" ? (
                <TouchableOpacity 
                  onPress={handleSync}
                  disabled={isSyncing}
                  className="bg-white border-2 border-[#D4A373]/50 px-5 py-2.5 rounded-full flex-row items-center shadow-lg shadow-[#8B5A2B]/15"
                >
                  <Ionicons name="sync" size={16} color={isSyncing ? "#D4A373" : "#8B5A2B"} />
                  <Text className={isSyncing ? "text-[#D4A373] font-bold ml-2 text-xs" : "text-[#8B5A2B] font-extrabold ml-2 text-xs"}>
                    {isSyncing ? "SYNCING..." : "SYNC"}
                  </Text>
                </TouchableOpacity>
              ) : (
                <>
                  <Text className="text-[#8B5A2B] font-extrabold text-xs mr-3 text-right">
                    {roleString === "Guide" ? "Amit Sharma" : "Rahul Verma"}
                  </Text>
                  <View className="w-11 h-11 bg-[#F9DCB4] rounded-full items-center justify-center border-2 border-[#8B5A2B] shadow-md shadow-[#8B5A2B]/20">
                    <Ionicons name="person" size={20} color="#8B5A2B" />
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
          <Animated.View entering={FadeIn.duration(300)} className="absolute top-0 left-0 right-0 bottom-0 z-50 bg-[#4A3728]/95">
            <CameraView className="w-full h-full" facing="back" onBarcodeScanned={handleBarcodeScanned} />
            <View className="absolute top-0 left-0 right-0 bottom-0 justify-between p-12 pt-20">
              <View className="items-center">
                <Text className="text-[#F9DCB4] font-bold text-sm tracking-widest uppercase bg-[#4A3728]/90 px-6 py-3 rounded-full border border-[#F9DCB4]/30 shadow-lg">
                  Align QR Code
                </Text>
              </View>
              
              <View className="items-center mb-10">
                <TouchableOpacity 
                  onPress={() => {
                    setCameraVisible(false);
                    router.push('/ticket-details');
                  }} 
                  className="bg-[#8B5A2B] px-6 py-4 rounded-full mb-6 flex-row items-center shadow-xl shadow-[#4A3728]"
                >
                  <Ionicons name="arrow-forward-circle" size={22} color="#F9DCB4" className="mr-2" />
                  <Text className="text-[#F9DCB4] font-extrabold ml-2 text-base">Simulate Scan</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setCameraVisible(false)} className="bg-[#4A3728]/90 p-4 rounded-full border border-[#F9DCB4]/30">
                  <Ionicons name="close" size={32} color="#F9DCB4" />
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        )}
      </View>
    </View>
  );
}