import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp, Layout } from 'react-native-reanimated';

// Type definitions for our state
type Tourist = {
  id: string;
  name: string;
  gender: string;
};

export default function CreateTicketScreen() {
  const router = useRouter();

  // --- 1 & 2. GLOBAL TICKET STATE (Vehicle & Contact) ---
  const [vehicleType, setVehicleType] = useState('LMV');
  const [contactNumber, setContactNumber] = useState('');
  const [tourists, setTourists] = useState<Tourist[]>([]);

  // --- 3. CURRENT TOURIST FORM STATE ---
  const [name, setName] = useState('');
  const [gender, setGender] = useState('Male');
  const [age, setAge] = useState('');
  const [nationality, setNationality] = useState('Indian');
  const [customNationality, setCustomNationality] = useState('');
  const [idProof, setIdProof] = useState('Aadhar');
  const [idNumber, setIdNumber] = useState('');

  // --- ACTIONS ---
  const handleAddTourist = () => {
    if (!name.trim() || !age || !idNumber.trim() || (nationality === 'Other' && !customNationality.trim())) {
      alert("Please fill all details for the current tourist.");
      return;
    }

    const newTourist: Tourist = {
      id: Math.random().toString(),
      name: name.trim(),
      gender: gender,
    };

    setTourists([...tourists, newTourist]);

    // Reset Form for the next person
    setName('');
    setGender('Male');
    setAge('');
    setNationality('Indian');
    setCustomNationality('');
    setIdProof('Aadhar');
    setIdNumber('');
  };

  const handleGenerateTicket = () => {
    if (!contactNumber.trim() || contactNumber.length < 10) {
      alert("Please provide a valid contact number in Step 1.");
      return;
    }
    if (tourists.length === 0) {
      alert("Please add at least one tourist to generate the ticket.");
      return;
    }

    alert(`Ticket Generated Successfully!\nContact: ${contactNumber}\nTotal Tourists: ${tourists.length}\nVehicle: ${vehicleType}`);
    router.back();
  };

  // ==========================================
  // CUSTOM NEO-BRUTALIST DROPDOWN COMPONENT
  // ==========================================
  const FormDropdown = ({ label, options, selectedValue, onSelect }: { label: string, options: string[], selectedValue: string, onSelect: (val: string) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <View className="mb-5 z-10">
        <Text className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest mb-2">{label}</Text>
        <TouchableOpacity 
          onPress={() => setIsOpen(!isOpen)}
          activeOpacity={0.9}
          className={`bg-[#F4F4F5] border-2 ${isOpen ? 'border-black' : 'border-transparent'} p-4 rounded-xl flex-row justify-between items-center`}
        >
          <Text className="text-black font-bold">{selectedValue}</Text>
          <Ionicons name={isOpen ? "chevron-up" : "chevron-down"} size={16} color="black" />
        </TouchableOpacity>
        
        {isOpen && (
          <View className="bg-white border-2 border-black rounded-xl mt-1 overflow-hidden shadow-sm">
            {options.map((opt, index) => (
              <TouchableOpacity
                key={opt}
                onPress={() => { onSelect(opt); setIsOpen(false); }}
                className={`p-4 ${index < options.length - 1 ? 'border-b border-black/10' : ''} ${selectedValue === opt ? 'bg-[#E6E5F3]' : ''}`}
              >
                <Text className="text-black font-bold">{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1 bg-[#F4F4F5]">
      
      {/* HEADER */}
      <View className="bg-[#E6E5F3] pt-16 pb-6 px-6 flex-row items-center justify-between z-20">
        
        <Text className="text-black font-black text-xl tracking-tight">Ticket Form</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        
        {/* ==========================================
            UNIFIED FORM CONTAINER
        ========================================== */}
        <View className="bg-white border-2 border-black rounded-[32px] p-6 mb-8 shadow-sm">
          
          {/* --- STEP 1 & 2: VEHICLE & CONTACT --- */}
          <Text className="text-black font-black text-lg border-b border-black/10 pb-3 mb-5">1. Booking Details</Text>
          
          <FormDropdown 
            label="Vehicle Assignment" 
            options={['LMV', 'HMV']} 
            selectedValue={vehicleType} 
            onSelect={setVehicleType} 
          />

          <View className="mb-8">
            <Text className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest mb-2">Primary Contact Number</Text>
            <TextInput
              className="w-full bg-[#F4F4F5] text-black font-bold text-base p-4 rounded-xl border-2 border-transparent focus:border-black"
              placeholder="+91 99999 99999"
              placeholderTextColor="#a1a1aa"
              keyboardType="phone-pad"
              maxLength={10}
              value={contactNumber}
              onChangeText={setContactNumber}
            />
          </View>

          {/* --- STEP 3: ADD TOURIST FORM --- */}
          <Text className="text-black font-black text-lg border-b border-black/10 pb-3 mb-5">
            2. {tourists.length === 0 ? "Add First Tourist" : "Add Another Tourist"}
          </Text>

          <View className="mb-5">
            <Text className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest mb-2">Full Name</Text>
            <TextInput
              className="bg-[#F4F4F5] text-black font-bold p-4 rounded-xl border-2 border-transparent focus:border-black"
              placeholder="Enter tourist name"
              placeholderTextColor="#a1a1aa"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View className="flex-row gap-x-3 z-40">
            <View className="flex-[2]">
              <FormDropdown 
                label="Gender" 
                options={['Male', 'Female', 'Other']} 
                selectedValue={gender} 
                onSelect={setGender} 
              />
            </View>
            <View className="flex-1">
              <Text className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest mb-2">Age</Text>
              <TextInput
                className="bg-[#F4F4F5] text-black font-bold p-4 rounded-xl text-center border-2 border-transparent focus:border-black"
                placeholder="25"
                placeholderTextColor="#a1a1aa"
                keyboardType="number-pad"
                maxLength={3}
                value={age}
                onChangeText={setAge}
              />
            </View>
          </View>

          <View className="z-30">
            <FormDropdown 
              label="Nationality" 
              options={['Indian', 'Other']} 
              selectedValue={nationality} 
              onSelect={setNationality} 
            />
            {nationality === 'Other' && (
              <Animated.View entering={FadeInUp.duration(300)} className="mb-5 -mt-2">
                <TextInput
                  className="bg-[#F4F4F5] text-black font-bold p-4 rounded-xl border-2 border-transparent focus:border-black"
                  placeholder="Enter Nationality"
                  placeholderTextColor="#a1a1aa"
                  value={customNationality}
                  onChangeText={setCustomNationality}
                />
              </Animated.View>
            )}
          </View>

          <View className="z-20 mb-2">
            <FormDropdown 
              label="ID Proof Document" 
              options={['Aadhar', 'PAN Card', 'Other']} 
              selectedValue={idProof} 
              onSelect={setIdProof} 
            />
            <View className="-mt-2 mb-6">
              <TextInput
                className="bg-[#F4F4F5] text-black font-bold p-4 rounded-xl border-2 border-transparent focus:border-black"
                placeholder="Enter ID Number"
                placeholderTextColor="#a1a1aa"
                autoCapitalize="characters"
                value={idNumber}
                onChangeText={setIdNumber}
              />
            </View>
          </View>

          <TouchableOpacity 
            onPress={handleAddTourist}
            className="w-full bg-[#E6E5F3] py-4 rounded-xl items-center border-2 border-black"
          >
            <Text className="text-black font-black text-sm uppercase tracking-widest">+ Add To List</Text>
          </TouchableOpacity>
        </View>

        {/* ==========================================
            ADDED TOURISTS LIST
        ========================================== */}
        {tourists.length > 0 && (
          <View className="mb-8">
            <Text className="text-black font-extrabold text-sm uppercase tracking-widest mb-3">Passenger List ({tourists.length})</Text>
            {tourists.map((t, index) => (
              <Animated.View 
                key={t.id} 
                layout={Layout.springify()} 
                entering={FadeInUp.springify()}
                className="bg-white p-4 rounded-2xl mb-2 flex-row justify-between items-center border-2 border-black shadow-sm"
              >
                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-[#E6E5F3] border border-black/10 rounded-full items-center justify-center mr-3">
                    <Ionicons name={t.gender === 'Female' ? "woman" : t.gender === 'Male' ? "man" : "person"} size={16} color="black" />
                  </View>
                  <Text className="text-black font-black text-base">{t.name}</Text>
                </View>
                <View className="bg-[#F4F4F5] px-3 py-1 rounded-full border border-black/10">
                  <Text className="text-black font-bold text-[10px] uppercase tracking-widest">{t.gender}</Text>
                </View>
              </Animated.View>
            ))}
          </View>
        )}

        {/* ==========================================
            MAIN SUBMIT BUTTON
        ========================================== */}
        <TouchableOpacity 
          onPress={handleGenerateTicket}
          className="w-full bg-black py-5 rounded-full items-center mb-12 border-2 border-black"
        >
          <Text className="text-white font-black text-lg uppercase tracking-widest">Generate Ticket</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}