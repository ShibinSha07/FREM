import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import Modal from "react-native-modal";
import { useSocket } from "../context/SocketContext";
import { useNavigation } from "@react-navigation/native";

const Popup = () => {

  const { popup, setPopup } = useSocket();
  const navigation = useNavigation()

  const handleNavigateToMap = () => {
    navigation.navigate("MapScreen", { coordinates: popup.coordinates });
    setPopup(null);
  };

  return (
    <Modal
      isVisible={!!popup}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
    >
      <View className="bg-white p-6 rounded-lg">
        <Text className="text-xl font-bold mb-4 text-center">🚨 New Incident Reported</Text>

        <Text className="text-lg mb-2">
          <Text className='font-bold'>Location: </Text>
          {popup.place}
        </Text>

        <Text className="text-lg">
          <Text className='font-bold'>Coordinates: </Text>
          {popup.coordinates}
        </Text>

        <View className="flex-row justify-between mt-5 space-x-4">
          <TouchableOpacity className="bg-red-500 px-4 py-2 rounded-lg" onPress={() => setPopup(null)}>
            <Text className="text-white text-lg font-semibold">Close</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-blue-500 px-4 py-2 rounded-lg" onPress={handleNavigateToMap}>
            <Text className="text-white text-lg font-semibold">View</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default Popup