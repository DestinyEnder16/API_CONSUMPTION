import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { SafeAreaView } from "react-native-safe-area-context";
import LoadingSpinner from "../components/LoadingSpinner";
import UserCard from "../components/UserCard";
import { UserIdentification } from "@/types";
import SafeAreaComponent from "../components/SafeAreaComponent";
import SearchBar from "../components/SearchBar";

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function Home() {
  const [data, setData] = useState<UserIdentification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  // IMPORTANT creating the fetcher
  async function getData() {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/users`);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(function () {
    getData();
  }, []);

  return (
    <SafeAreaComponent>
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={{ paddingVertical: 30, paddingHorizontal: 24 }}
          ListHeaderComponent={() => (
            <>
              <Ionicons
                name="person-circle"
                style={{ alignSelf: "flex-end" }}
                size={48}
              />
              <SearchBar value={searchInput} onChangeText={setSearchInput} />
            </>
          )}
          decelerationRate={"fast"}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => String(item.id)}
          data={data}
          renderItem={({ item }) => (
            <UserCard name={item.name} email={item.email} id={item.id} />
          )}
          ListEmptyComponent={() => <LoadingSpinner />}
        />
      </View>
    </SafeAreaComponent>
  );
}
