import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import LoadingSpinner from "../components/LoadingSpinner";
import UserCard from "../components/UserCard";
import { UserIdentification } from "@/types";

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
};

function SearchBar({ value, onChangeText }: SearchBarProps) {
  return (
    <TextInput
      style={searchStyles.input}
      placeholder="Search list by ID"
      placeholderTextColor="#888"
      value={value}
      onChangeText={onChangeText}
      keyboardType="numeric"
      returnKeyType="search"
    />
  );
}

const searchStyles = StyleSheet.create({
  input: {
    backgroundColor: "#1a1a2e",
    color: "#eee",
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 10,
    borderRadius: 10,
    fontSize: 16,
  },
});

export default function Home() {
  const [data, setData] = useState<UserIdentification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);

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

  // handling the searching of user posts
  const getSearchedData = useCallback(async (userId: string) => {
    if (!userId) {
      getData();
      return;
    }
    try {
      setSearching(true);
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/users?id=${userId}`,
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.log(error);
    } finally {
      setSearching(false);
    }
  }, []);

  function handleSearchChange(text: string) {
    setSearch(text);
    getSearchedData(text);
  }

  useEffect(function () {
    getData();
  }, []);

  return isLoading ? (
    <SafeAreaView style={{ flex: 1 }}>
      <LoadingSpinner />
    </SafeAreaView>
  ) : (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ paddingTop: 30, paddingBottom: 30 }}
        ListHeaderComponent={() => (
          <>
            <Text
              style={{
                fontSize: 32,
                textAlign: "center",
                fontWeight: "600",
                marginBottom: 20,
              }}
            >
              Company Employees
            </Text>

            <SearchBar value={search} onChangeText={handleSearchChange} />
          </>
        )}
        decelerationRate={"fast"}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        data={data}
        renderItem={({ item }) => (
          <UserCard name={item.name} email={item.email} id={item.id} />
        )}
      />
    </SafeAreaView>
  );
}
