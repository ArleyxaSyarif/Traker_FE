import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

const Baru = () => {
  const [artikel, setArtikel] = useState([]);
  const getBerita = async () => {
    try {
      const response = await axios.get(
        "https://uselessfacts.jsph.pl/random.json?language=en"
      );
      setArtikel([response.data]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBerita();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <FlatList
          data={artikel}
          keyExtractor={(item: { id: string }) => item.id}
          renderItem={({
            item
          }) => (
            <View style={tw`px-4 py-2`}>
              <Text style={tw`text-2xl font-bold mb-4 text-gray-900`}>
                {item.text}
              </Text>
              <Text style={tw`text-gray-600 mt-2`}>Source: {item.source}</Text>
              <Text style={tw`text-gray-600`}>URL: {item.source_url}</Text>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
export default Baru;
