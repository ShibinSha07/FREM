import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';

const FirstAid = () => {
  const emergencyCards = [
    {
      id: 1,
      title: 'Snake Bite',
      icon: '🐍',
      color: 'bg-red-100',
      borderColor: 'border-red-300',
      textColor: 'text-red-700',
      steps: [
        'Keep the victim calm and immobile',
        'Keep the bitten area below heart level',
        'Remove any jewelry or tight clothing',
        'Clean the wound gently with soap and water',
        'Cover with a clean, dry dressing',
        'Do NOT cut the wound or try to suck out venom',
        'Do NOT apply a tourniquet',
        'Seek medical help immediately'
      ]
    },
    {
      id: 2,
      title: 'Drowning',
      icon: '🌊',
      color: 'bg-blue-100',
      borderColor: 'border-blue-300',
      textColor: 'text-blue-700',
      steps: [
        'Ensure your safety first',
        'Remove the person from water',
        'Check for breathing and pulse',
        'If not breathing, begin CPR immediately',
        'If breathing, place in recovery position',
        'Keep person warm with dry blankets',
        'Call emergency services',
        'Monitor until help arrives'
      ]
    },
    {
      id: 3,
      title: 'Fire Incident',
      icon: '🔥',
      color: 'bg-orange-100',
      borderColor: 'border-orange-300',
      textColor: 'text-orange-700',
      steps: [
        'Ensure your safety first',
        'If clothing is on fire: Stop, Drop, and Roll',
        'For burns, cool with running water for 10-15 minutes',
        'Do NOT apply ice, butter, or ointments',
        'Remove jewelry and loose clothing',
        'Cover with clean, dry cloth',
        'Do NOT break blisters',
        'Seek medical help for serious burns'
      ]
    },
    {
      id: 4,
      title: 'Heart Attack',
      icon: '❤️',
      color: 'bg-purple-100',
      borderColor: 'border-purple-300',
      textColor: 'text-purple-700',
      steps: [
        'Call emergency services immediately',
        'Have the person sit or lie down',
        'Loosen tight clothing',
        'If the person is not allergic to aspirin, give them one to chew',
        'If the person stops breathing, perform CPR if trained',
        'Stay with the person until help arrives',
        'Be prepared to report symptoms to medical personnel',
        'Comfort and reassure the person'
      ]
    },
    {
      id: 5,
      title: 'Fracture',
      icon: '🦴',
      color: 'bg-green-100',
      borderColor: 'border-green-300',
      textColor: 'text-green-700',
      steps: [
        'Do not move the person unless absolutely necessary',
        'Immobilize the injured area',
        'Apply cold pack wrapped in cloth to reduce swelling',
        'Do NOT attempt to realign bones',
        'For open fractures, cover wound with clean dressing',
        'Treat for shock if necessary',
        'Do NOT give food or drink',
        'Seek medical help immediately'
      ]
    },
  ];

  const EmergencyCard = ({ item }) => (
    <TouchableOpacity 
      className={`rounded-xl p-4 mb-4 border ${item.color} ${item.borderColor}`}
    >
      <View className="flex-row items-center mb-3">
        <Text className="text-4xl mr-3">{item.icon}</Text>
        <Text className={`text-xl font-bold ${item.textColor}`}>{item.title}</Text>
      </View>
      
      <Text className={`font-bold mb-2 ${item.textColor}`}>Emergency Steps:</Text>
      
      <View>
        {item.steps.map((step, index) => (
          <View key={index} className="flex-row mb-1">
            <Text className={`${item.textColor} font-bold mr-2`}>{index + 1}.</Text>
            <Text className={`${item.textColor} flex-1`}>{step}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    // <View>
    //     <Text>hel</Text>
    //     <Text>hel</Text>
    //     <Text>hel</Text>
    //     <Text>hel</Text>
    //     <Text>hel</Text>
    //     <Text>hel</Text>
    //     <Text>hel</Text>
    //     <Text>hel</Text>
    //     <Text>hel</Text>
    // </View>
    <View className="flex-1 bg-gray-50">
      <View className="bg-red-600 p-4 pt-14">
        <Text className="text-white text-2xl font-bold mb-1">Emergency First Aid</Text>
        <Text className="text-white text-sm opacity-80">Quick guides for emergency situations</Text>
      </View>
      
      <ScrollView className="flex-1 p-4">
        <Text className="text-gray-700 mb-4">
          These cards provide basic first aid guidance for common emergencies. Always seek professional medical help in any emergency situation.
        </Text>
        
        {emergencyCards.map(card => (
          <EmergencyCard key={card.id} item={card} />
        ))}
        
        <View className="h-6"></View>
      </ScrollView>
      
      <View className="bg-gray-100 p-4 border-t border-gray-200">
        <Text className="text-center text-gray-500 text-sm">
          IMPORTANT: These are basic guidelines only. In an emergency, call local emergency services immediately.
        </Text>
      </View>
    </View>
  );
};

export default FirstAid;