import { useLocalSearchParams } from "expo-router";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackBtn from "../components/BackBtn";
import ErrorScreen from "../components/errorScreen";
import LoadingSpinner from "../components/LoadingSpinner";
import UserProfile from "../components/UserProfile";
import { colors } from "../constants/themes";
import { useGetUserByIdQuery } from "../store/api";

export default function User() {
  const { id } = useLocalSearchParams();

  const { isError, isLoading, data } = useGetUserByIdQuery(Number(id));

  return isLoading ? (
    <SafeAreaView style={{ flex: 1 }}>
      <LoadingSpinner />
    </SafeAreaView>
  ) : isError ? (
    <ErrorScreen message="Employee not found" />
  ) : (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 10,
          paddingBottom: 30,
        }}
        ListHeaderComponent={() => <BackBtn />}
        data={data}
        showsVerticalScrollIndicator={false}
        decelerationRate={"fast"}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <UserProfile item={item} />}
      />
    </SafeAreaView>
  );
}
