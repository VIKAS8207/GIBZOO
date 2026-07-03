import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

// We can pass the 'role' as a prop so the component knows who is looking at it!
export default function StaffDashboard({ role }: { role: string }) {
  return (
    <>
      {/* Stats Card */}
      <View className="w-full bg-zinc-900 p-6 rounded-3xl border border-zinc-800 mb-6 flex-row justify-between items-center">
        <View>
          <Text className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-1">Completed</Text>
          <Text className="text-yellow-500 font-extrabold text-4xl">24</Text>
          <Text className="text-white font-medium text-sm">Tickets Today</Text>
        </View>
        <Ionicons name="ticket" size={60} color="#27272a" />
      </View>

      <Text className="text-white font-bold text-lg mb-4 ml-1">Recent Activity: {role}</Text>
      
      {/* Scrollable Ticket List */}
      <ScrollView className="flex-1 w-full" showsVerticalScrollIndicator={false}>
        {[1, 2, 3, 4, 5].map((item) => (
          <View key={item} className="bg-zinc-900 p-4 rounded-2xl mb-3 border border-zinc-800 flex-row justify-between items-center">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-black rounded-full items-center justify-center border border-zinc-800 mr-4">
                <Ionicons name="checkmark-done" size={20} color="#facc15" />
              </View>
              <View>
                <Text className="text-white font-bold">Tour Group #{1020 + item}</Text>
                <Text className="text-zinc-500 text-xs mt-1">4 Guests • 2 hours ago</Text>
              </View>
            </View>
            <TouchableOpacity className="bg-black px-3 py-2 rounded-lg border border-zinc-800">
              <Text className="text-yellow-500 text-xs font-bold">View</Text>
            </TouchableOpacity>
          </View>
        ))}
        <View className="h-10" /> 
      </ScrollView>
    </>
  );
}