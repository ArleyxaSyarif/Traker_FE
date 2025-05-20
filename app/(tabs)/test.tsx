import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import tw from "twrnc";

const Test = () => {
  const [artikel, setArtikel] = useState([]);

  const getNews = async () => {
    try {
      const response = await axios.get(
        `https://dog.ceo/api/breeds/image/random`
      );
      setArtikel([response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <View style={tw`flex-1 p-4`}>
      <FlatList
        data={artikel}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({
          item,
        }: {
          item: {
            message: string;
            status: string;
          };
        }) => (
          <View style={tw`mb-4 bg-white rounded-xl shadow-md p-4`}>
            <Image
              source={{ uri: item.message }}
              style={tw`w-full h-[300px] rounded-lg`}
              resizeMode="cover"
            />
            <Text style={tw`mt-3 text-base font-medium text-gray-800`}>
              {item.status}
            </Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Test;
