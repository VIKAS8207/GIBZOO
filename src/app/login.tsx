import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import Animated, { FadeIn, FadeInLeft } from "react-native-reanimated";
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();
  
  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Role State
  const [role, setRole] = useState("Gate Officer");
  const roles = ["Gate Officer", "Guide", "Driver"];

  // View State Machine: Controls WHICH form is showing without changing the page
  type ViewState = 'login' | 'forgot-email' | 'forgot-otp' | 'forgot-password';
  const [currentView, setCurrentView] = useState<ViewState>('login');

  // Forgot Password Data
  const [resetEmail, setResetEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = () => {
    router.replace({
      pathname: "/(tabs)/home",
      params: { userRole: role }
    });
  };

  const handleChangePassword = () => {
    alert("Password successfully changed!");
    setCurrentView('login'); // Send them back to the login form
  };

  return (
    <ImageBackground 
      source={require('../../assets/getstarted.jpg')}
      className="flex-1 w-full h-screen"
      resizeMode="cover"
    >
      {/* Dark overlay */}
      <View className="absolute inset-0 bg-black/70" />

      {/* The PRO way to handle keyboards: KeyboardAvoidingView + ScrollView */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        className="flex-1"
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 32 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          
          

          {/* ==========================================
              VIEW 1: STANDARD LOGIN
          ========================================== */}
          {currentView === 'login' && (
            <Animated.View entering={FadeInLeft.duration(600).springify()}>
              
              {/* Left-Aligned Heading */}
              <View className="mb-10">
                <Text className="text-white font-light text-4xl mb-2">
                  Login
                </Text>
                <Text className="text-zinc-400 font-medium tracking-wide">
                  Enter your details here to continue.
                </Text>
              </View>

              {/* Minimalist Role Toggle */}
              <View className="flex-row justify-between mb-10 bg-zinc-900/50 p-1 rounded-full border border-zinc-700/50">
                {roles.map((r) => (
                  <TouchableOpacity
                    key={r}
                    onPress={() => setRole(r)}
                    className={`flex-1 py-2 rounded-full items-center ${
                      role === r ? "bg-[#F9DCB4]" : "bg-transparent"
                    }`}
                  >
                    <Text className={`font-bold text-xs ${
                      role === r ? "text-black" : "text-white"
                    }`}>
                      {r}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Minimalist Line Input: Email */}
              <View className="mb-8 w-full flex-row items-center border-b border-zinc-400 pb-3">
                <Ionicons name="mail-outline" size={20} color="#F9DCB4" />
                <TextInput
                  className="flex-1 text-white ml-4 text-base"
                  placeholder="Email Address"
                  placeholderTextColor="#71717a"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              {/* Minimalist Line Input: Password */}
              <View className="mb-8 w-full flex-row items-center border-b border-zinc-400 pb-3">
                <Ionicons name="lock-closed-outline" size={20} color="#F9DCB4" />
                <TextInput
                  className="flex-1 text-white ml-4 text-base"
                  placeholder="Password"
                  placeholderTextColor="#71717a"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
              
              {/* CHANGE 3: Self-end pushes the link to the right side perfectly */}
              <TouchableOpacity onPress={() => setCurrentView('forgot-email')} className="mb-12 self-end">
                <Text className="text-zinc-400 text-sm font-medium pb-0.5">
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={handleLogin}
                className="w-full bg-[#F9DCB4] py-4 rounded-full items-center shadow-lg shadow-yellow-500/20 mb-6"
              >
                <Text className="text-black font-extrabold text-lg tracking-widest uppercase">
                  Authenticate
                </Text>
              </TouchableOpacity>

            </Animated.View>
          )}

          {/* ==========================================
              VIEW 2: FORGOT PASSWORD - EMAIL
          ========================================== */}
          {currentView === 'forgot-email' && (
            <Animated.View entering={FadeInLeft.duration(500)}>
              <TouchableOpacity onPress={() => setCurrentView('login')} className="mb-8 self-start flex-row items-center">
                <Ionicons name="arrow-back" size={20} color="#F9DCB4" />
                <Text className="text-[#F9DCB4] font-bold ml-2">Back to Login</Text>
              </TouchableOpacity>

              <Text className="text-white font-light text-3xl mb-3">Reset Password</Text>
              <Text className="text-zinc-400 font-medium mb-10 leading-relaxed">
                Enter your registered email address. We will send you a 4-digit verification code.
              </Text>

              <View className="mb-10 w-full flex-row items-center border-b border-zinc-400 pb-3">
                <Ionicons name="mail-outline" size={20} color="#F9DCB4" />
                <TextInput
                  className="flex-1 text-white ml-4 text-base"
                  placeholder="user@gibzoo.com"
                  placeholderTextColor="#71717a"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={resetEmail}
                  onChangeText={setResetEmail}
                />
              </View>

              <TouchableOpacity onPress={() => setCurrentView('forgot-otp')} className="w-full bg-[#F9DCB4] py-4 rounded-full items-center">
                <Text className="text-black font-extrabold text-lg tracking-widest uppercase">Send OTP</Text>
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* ==========================================
              VIEW 3: FORGOT PASSWORD - OTP
          ========================================== */}
          {currentView === 'forgot-otp' && (
            <Animated.View entering={FadeInLeft.duration(500)}>
              <TouchableOpacity onPress={() => setCurrentView('forgot-email')} className="mb-8 self-start flex-row items-center">
                <Ionicons name="arrow-back" size={20} color="#F9DCB4" />
                <Text className="text-[#F9DCB4] font-bold ml-2">Back</Text>
              </TouchableOpacity>

              <Text className="text-white font-light text-3xl mb-3">Verification</Text>
              <Text className="text-zinc-400 font-medium mb-10">
                Enter the 4-digit code sent to your email.
              </Text>

              <View className="mb-10 w-full border-b border-zinc-400 pb-3">
                <TextInput
                  className="w-full text-white text-center text-3xl tracking-[1em]"
                  placeholder="••••"
                  placeholderTextColor="#71717a"
                  keyboardType="numeric"
                  maxLength={4}
                  value={otp}
                  onChangeText={setOtp}
                />
              </View>

              <TouchableOpacity onPress={() => setCurrentView('forgot-password')} className="w-full bg-[#F9DCB4] py-4 rounded-full items-center">
                <Text className="text-black font-extrabold text-lg tracking-widest uppercase">Verify Code</Text>
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* ==========================================
              VIEW 4: FORGOT PASSWORD - NEW PASSWORD
          ========================================== */}
          {currentView === 'forgot-password' && (
            <Animated.View entering={FadeInLeft.duration(500)}>
              <Text className="text-white font-light text-3xl mb-3 mt-8">Secure Account</Text>
              <Text className="text-zinc-400 font-medium mb-10">
                Create a new, strong password for your account.
              </Text>

              <View className="mb-8 w-full flex-row items-center border-b border-zinc-400 pb-3">
                <Ionicons name="lock-closed-outline" size={20} color="#F9DCB4" />
                <TextInput
                  className="flex-1 text-white ml-4 text-base"
                  placeholder="New Password"
                  placeholderTextColor="#71717a"
                  secureTextEntry
                  value={newPassword}
                  onChangeText={setNewPassword}
                />
              </View>

              {/* CHANGE 2: Confirm Password Input */}
              <View className="mb-12 w-full flex-row items-center border-b border-zinc-400 pb-3">
                <Ionicons name="checkmark-circle-outline" size={20} color="#F9DCB4" />
                <TextInput
                  className="flex-1 text-white ml-4 text-base"
                  placeholder="Confirm Password"
                  placeholderTextColor="#71717a"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>

              <TouchableOpacity onPress={handleChangePassword} className="w-full bg-[#F9DCB4] py-4 rounded-full items-center mt-4">
                <Text className="text-black font-extrabold text-lg tracking-widest uppercase">Save Password</Text>
              </TouchableOpacity>
            </Animated.View>
          )}

        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}