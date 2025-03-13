import { View, Text, LayoutAnimation } from 'react-native';
import React, { useEffect, useState } from 'react';

const quotes = [
    { quote: "Stay calm, act fast,\nFirst aid can save a life.", bg: "bg-red-100", border: "border-red-500", text: "text-red-800" },
    { quote: "Burns need cool water,\nNot ice or butter.", bg: "bg-blue-100", border: "border-blue-500", text: "text-blue-800" },
    { quote: "Inhaling smoke? Get low,\nFresh air is the way to go.", bg: "bg-green-100", border: "border-green-500", text: "text-green-800" },
    { quote: "Stop the bleeding, apply pressure,\nThen seek medical attention.", bg: "bg-yellow-100", border: "border-yellow-500", text: "text-yellow-800" },
    { quote: "Shock can be deadly,\nKeep the victim warm and breathing.", bg: "bg-purple-100", border: "border-purple-500", text: "text-purple-800" },
];

const Quote = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // 🔥 Smooth transition
            setIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <View className={`h-32 ${quotes[index].bg} ${quotes[index].border} border rounded-md mb-6 flex justify-center items-center`}>
            <Text className={`text-center text-xl ${quotes[index].text}`}>
                {quotes[index].quote}
            </Text>
        </View>
    );
}

export default Quote;
