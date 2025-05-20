import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

export default function Explore() {
  const [artikel, setArtikel] = useState([]);

  const getNews = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=08a2e66c7c114f138b6e60707f745c83`
      );
      setArtikel(response.data.articles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <View style={tw`px-4 py-2`}>
            <Text style={tw`text-2xl font-bold mb-4 text-gray-900`}>
              Top Headlines
            </Text>
          </View>
          <FlatList
            data={artikel}
            keyExtractor={(item: { url: string }) => item.url}
            renderItem={({
              item,
            }: {
              item: {
                author: string;
                title: string;
                url: string;
                description: string;
                urlToImage: string;
              };
            }) => (
              <View
                style={tw`p-5 border border-gray-200 bg-white rounded-xl shadow-lg mb-4 mx-3`}
              >
                <Image
                  source={{ uri: item.urlToImage }}
                  style={tw`w-full h-48 rounded-lg mb-4`}
                  resizeMode="cover"
                />
                <Text style={tw`text-sm text-gray-500 mb-2`}>
                  {item.author || "Unknown Author"}
                </Text>
                <Text style={tw`text-lg font-bold mb-2 text-gray-900`}>
                  {item.title}
                </Text>
                <Text style={tw`text-gray-600 leading-relaxed text-base mb-3`}>
                  {item.description}
                </Text>
                <Text style={tw`text-blue-600 text-sm`}>{item.url}</Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`py-2`}
          />{" "}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
