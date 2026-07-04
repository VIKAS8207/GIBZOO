import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function GetStartedScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <ImageBackground 
        source={require('../../assets/getstarted.jpg')} 
        className="flex-1 w-full justify-end"
        resizeMode="cover"
      >
        {/* Let the gradient touch the absolute edges of the screen */}
        <LinearGradient
          colors={['transparent', 'rgba(83, 41, 26,0.8)', '#53291A', '#53291A']}
          className="absolute bottom-0 w-full h-[65%] justify-end"
        >
          <Animated.View entering={FadeInDown.duration(800).delay(200)}>
            
            {/* THE FIX: A standard wrapper View to handle all spacing perfectly */}
            <View className="px-8 pb-16 pt-10">
              <Text className="text-white font-extrabold text-4xl tracking-tight mb-3">
                Explore the Wild.
              </Text>
              
              <Text className="text-white font-medium text-base mb-8 leading-tight">
                The ultimate wildlife park experience. Seamlessly authenticate tickets, manage tours, and track live schedules.
              </Text>

              <TouchableOpacity 
                onPress={() => router.push('/login')}
                className="w-full bg-white py-4 rounded-full items-center shadow-lg shadow-white-500/40 border border-white"
              >
                <Text className="text-[#53291A] font-extrabold text-lg tracking-wide uppercase">
                  Get Started
                </Text>
              </TouchableOpacity>
            </View>

          </Animated.View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}