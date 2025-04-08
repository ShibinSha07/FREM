import { View, Text, FlatList, TouchableOpacity, Linking } from 'react-native';
import React, { useState } from 'react';

const fireStations = [
    { id: '1', name: 'Fire Station 1', phone: '0487 242 4192', place: 'City Center' },
    { id: '2', name: 'Fire Station 2', phone: '2345678901', place: 'Downtown' },
    { id: '3', name: 'Fire Station 3', phone: '3456789012', place: 'Northside' },
    { id: '4', name: 'Fire Station 4', phone: '4567890123', place: 'Southside' },
    { id: '5', name: 'Fire Station 5', phone: '5678901234', place: 'West End' },
    { id: '6', name: 'Fire Station 6', phone: '6789012345', place: 'East Side' },
    { id: '7', name: 'Fire Station 7', phone: '7890123456', place: 'Suburb' },
    { id: '8', name: 'Fire Station 8', phone: '8901234567', place: 'Industrial Area' },
];

const policeStations = [
    { id: '1', name: 'Thrissur East Police Station', phone: '0487 242 4192', place: 'New, Pattalam Rd, Sakthan Thampuran Nagar, Veliyannur, Thrissur,' },
    { id: '2', name: 'Thrissur West Police Station', phone: '0487 236 3608', place: 'G5CR+F6H, Outpost Rd, Kalyan Nagar, Ayyanthole, Thrissur,' },
    { id: '3', name: 'Police Station 3', phone: '3034045050', place: 'West District' },
    { id: '4', name: 'Police Station 4', phone: '4045056060', place: 'South District' },
    { id: '5', name: 'Police Station 5', phone: '5056067070', place: 'East District' },
    { id: '6', name: 'Police Station 6', phone: '6067078080', place: 'Old Town' },
    { id: '7', name: 'Police Station 7', phone: '7078089090', place: 'Uptown' },
    { id: '8', name: 'Police Station 8', phone: '8089091010', place: 'Downtown' },
];

const HelpNumbers = () => {

    const [showAllFire, setShowAllFire] = useState(false);
    const [showAllPolice, setShowAllPolice] = useState(false);

    const dialNumber = (phone) => {
        const url = `tel:${phone}`;
        Linking.openURL(url).catch((err) => console.error("Error opening dialer", err));
    };

    return (
        <View className="flex-1 bg-white p-4 rounded-md mb-2">
            <Text className="text-xl font-bold mb-4">Fire Stations</Text>
            <FlatList
                data={showAllFire ? fireStations : fireStations.slice(0, 3)}
                nestedScrollEnabled={true}
                keyExtractor={(item) => `fire-${item.id}`}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => dialNumber(item.phone)}>
                        <View className="bg-gray-200 p-4 rounded-lg mb-2">
                            <Text className="text-lg font-bold">{item.name}</Text>
                            <Text className="text-base my-1">📞 {item.phone}</Text>
                            <Text className="text-base">📍 {item.place}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />

            <Text
                onPress={() => setShowAllFire(!showAllFire)}
                className="text-blue-500 text-right font-semibold"
            >
                {showAllFire ? "Show less" : "Show more"}
            </Text>

            <Text className="text-xl font-bold mt-8 mb-4">Police Stations</Text>
            <FlatList
                data={showAllPolice ? policeStations : policeStations.slice(0, 3)}
                nestedScrollEnabled={true}
                keyExtractor={(item) => `police-${item.id}`}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => dialNumber(item.phone)}>
                        <View className="bg-gray-200 p-4 rounded-lg mb-2">
                            <Text className="text-lg font-bold">{item.name}</Text>
                            <Text className="text-base my-1">📞 {item.phone}</Text>
                            <Text className="text-base">📍 {item.place}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />

            <Text
                onPress={() => setShowAllPolice(!showAllPolice)}
                className="text-blue-500 text-right font-semibold"
            >
                {showAllPolice ? "Show less" : "Show more"}
            </Text>
        </View>
    );
};

export default HelpNumbers;