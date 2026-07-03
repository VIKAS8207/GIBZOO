import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, ImageBackground, Modal, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import Animated, { FadeInDown, FadeIn, FadeInUp } from "react-native-reanimated";
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();
  
  // Main Login State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Toggle Role State (Restored!)
  const [role, setRole] = useState("Gate Officer");
  const roles = ["Gate Officer", "Guide", "Driver"];

  // Forgot Password Flow State
  const [isForgotModalVisible, setForgotModalVisible] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); 
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

  const handleSendOTP = () => setForgotStep(2);
  const handleVerifyOTP = () => setForgotStep(3);
  const handleChangePassword = () => {
    alert("Password successfully changed!");
    setForgotModalVisible(false);
    setForgotStep(1); 
  };

  return (
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1000&auto=format&fit=crop' }} 
      className="flex-1 w-full h-screen justify-center items-center"
      resizeMode="cover"
    >
      {/* Dark overlay */}
      <View className="absolute inset-0 bg-black/60" />

      {/* Top Logo Container */}
      <View className="absolute top-20 w-full items-center z-10">
        <View className="w-48 h-16 items-center justify-center">
          <Text className="text-yellow-500 font-extrabold text-2xl tracking-widest">GIB ZOO</Text>
        </View>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="w-full px-6 items-center">
        
        <Animated.View 
          entering={FadeInDown.duration(800).springify()}
          className="w-full max-w-sm bg-black/40 p-8 rounded-3xl border border-white/10 shadow-2xl"
        >
          
          {/* CHANGE 3: Central Heading */}
          <Text className="text-white font-extrabold text-3xl mb-6 text-center tracking-tight">
            SECURE LOGIN
          </Text>

          {/* CHANGE 1: Restored Role Toggle Buttons */}
          <View className="flex-row justify-between mb-8 bg-black/60 p-1 rounded-xl border border-white/10">
            {roles.map((r) => (
              <TouchableOpacity
                key={r}
                onPress={() => setRole(r)}
                className={`flex-1 py-2 rounded-lg items-center ${
                  role === r ? "bg-yellow-500" : "bg-transparent"
                }`}
              >
                <Text className={`font-bold text-xs ${
                  role === r ? "text-black" : "text-zinc-400"
                }`}>
                  {r}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* CHANGE 2: Consolidated Email Input */}
          <View className="mb-4 w-full bg-black/60 flex-row items-center px-4 py-3 rounded-xl border border-white/10 focus:border-yellow-500">
            <Ionicons name="mail" size={20} color="#facc15" />
            <TextInput
              className="flex-1 text-white ml-3"
              placeholder="Email Address"
              placeholderTextColor="#71717a"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* CHANGE 2: Consolidated Password Input */}
          <View className="mb-8">
            <View className="w-full bg-black/60 flex-row items-center px-4 py-3 rounded-xl border border-white/10 focus:border-yellow-500">
              <Ionicons name="lock-closed" size={20} color="#facc15" />
              <TextInput
                className="flex-1 text-white ml-3"
                placeholder="Password"
                placeholderTextColor="#71717a"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
            
            <TouchableOpacity onPress={() => setForgotModalVisible(true)} className="mt-3 self-end">
              <Text className="text-yellow-500 text-xs font-bold mr-1">Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            onPress={handleLogin}
            className="w-full bg-yellow-500 py-4 rounded-xl items-center shadow-lg shadow-yellow-500/20"
          >
            <Text className="text-black font-extrabold text-lg tracking-wide">Authenticate</Text>
          </TouchableOpacity>

        </Animated.View>
      </KeyboardAvoidingView>

      <View className="absolute bottom-8 w-full items-center">
        <Text className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-medium">
          This is a ticket authentication platform
        </Text>
      </View>

      {/* ==========================================
          FORGOT PASSWORD MODAL FLOW
      ========================================== */}
      <Modal visible={isForgotModalVisible} animationType="fade" transparent={true}>
        <View className="flex-1 justify-center items-center bg-black/90 px-6">
          <Animated.View entering={FadeInUp.duration(400).springify()} className="w-full max-w-sm bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
            
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-white text-xl font-bold">
                {forgotStep === 1 ? "Reset Password" : forgotStep === 2 ? "Verify OTP" : "New Password"}
              </Text>
              <TouchableOpacity onPress={() => {
                setForgotModalVisible(false);
                setForgotStep(1); 
              }}>
                <Ionicons name="close" size={24} color="#52525b" />
              </TouchableOpacity>
            </View>

            {/* STEP 1 */}
            {forgotStep === 1 && (
              <Animated.View entering={FadeIn}>
                <Text className="text-zinc-400 text-sm mb-6">Enter your registered email address to receive a verification code.</Text>
                <TextInput
                  className="w-full bg-black text-white px-4 py-3 rounded-xl border border-zinc-800 mb-6"
                  placeholder="user@gibzoo.com"
                  placeholderTextColor="#52525b"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={resetEmail}
                  onChangeText={setResetEmail}
                />
                <TouchableOpacity onPress={handleSendOTP} className="w-full bg-yellow-500 py-3 rounded-xl items-center">
                  <Text className="text-black font-bold">Send OTP</Text>
                </TouchableOpacity>
              </Animated.View>
            )}

            {/* STEP 2 */}
            {forgotStep === 2 && (
              <Animated.View entering={FadeIn}>
                <Text className="text-zinc-400 text-sm mb-6">Enter the 4-digit code sent to {resetEmail || "your email"}.</Text>
                <TextInput
                  className="w-full bg-black text-white px-4 py-3 rounded-xl border border-zinc-800 mb-6 text-center text-2xl tracking-[1em]"
                  placeholder="••••"
                  placeholderTextColor="#52525b"
                  keyboardType="numeric"
                  maxLength={4}
                  value={otp}
                  onChangeText={setOtp}
                />
                <TouchableOpacity onPress={handleVerifyOTP} className="w-full bg-yellow-500 py-3 rounded-xl items-center">
                  <Text className="text-black font-bold">Verify Code</Text>
                </TouchableOpacity>
              </Animated.View>
            )}

            {/* STEP 3 */}
            {forgotStep === 3 && (
              <Animated.View entering={FadeIn}>
                <Text className="text-zinc-400 text-sm mb-6">Create a secure new password for your account.</Text>
                <TextInput
                  className="w-full bg-black text-white px-4 py-3 rounded-xl border border-zinc-800 mb-4"
                  placeholder="New Password"
                  placeholderTextColor="#52525b"
                  secureTextEntry
                  value={newPassword}
                  onChangeText={setNewPassword}
                />
                <TextInput
                  className="w-full bg-black text-white px-4 py-3 rounded-xl border border-zinc-800 mb-6"
                  placeholder="Confirm Password"
                  placeholderTextColor="#52525b"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <TouchableOpacity onPress={handleChangePassword} className="w-full bg-yellow-500 py-3 rounded-xl items-center">
                  <Text className="text-black font-bold">Save Password</Text>
                </TouchableOpacity>
              </Animated.View>
            )}

          </Animated.View>
        </View>
      </Modal>

    </ImageBackground>
  );
}