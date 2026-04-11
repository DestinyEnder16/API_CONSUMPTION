import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingSpinner from "../components/LoadingSpinner";
import UserProfile from "../components/UserProfile";
import { UserIdentification } from "@/types";
import { borderRadius, fonts, fontSizes } from "../constants/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../constants/themes";

export default function User() {
  const [data, setData] = useState<UserIdentification[]>([]);
  const { id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const getData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/users?id=${id}`,
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  return isLoading ? (
    <SafeAreaView style={{ flex: 1 }}>
      <LoadingSpinner />
    </SafeAreaView>
  ) : (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 10,
          paddingBottom: 30,
        }}
        ListHeaderComponent={() => (
          <Pressable onPress={() => router.back()} style={styles.btn}>
            <Ionicons
              name="arrow-back-outline"
              size={32}
              style={styles.btnIcon}
            />
          </Pressable>
        )}
        data={data}
        showsVerticalScrollIndicator={false}
        decelerationRate={"fast"}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <UserProfile
            id={item.id}
            name={item.name}
            username={item.username}
            email={item.email}
            phone={item.phone}
            website={item.website}
            address={item.address}
            company={item.company}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btnIcon: {
    backgroundColor: colors.accentDark,
    borderRadius: borderRadius.full,
    padding: 5,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
