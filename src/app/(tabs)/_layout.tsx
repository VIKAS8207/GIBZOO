import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, 
        tabBarShowLabel: false, // Keeping it clean and icon-only
        
        tabBarStyle: {
          backgroundColor: '#FFFFFF', 
          borderTopWidth: 1,
          borderTopColor: '#F9DCB4', 
          
          // 1. Reduced the height slightly so it doesn't feel overly spacious
          height: Platform.OS === 'ios' ? 85 : 60,
          // Removed the global paddingTop so we can control it per-item below
        },

        // 2. THE FIX: This forces the icons to sit in the exact middle of the available space
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          // Pushes the icons down slightly to counteract the missing text space
          marginTop: Platform.OS === 'ios' ? 10 : 0, 
        },
        
        tabBarActiveTintColor: '#8B5A2B', 
        tabBarInactiveTintColor: '#D4A373', 
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={26} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="master"
        options={{
          title: 'Master',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "cube" : "cube-outline"} size={26} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "person" : "person-outline"} size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}