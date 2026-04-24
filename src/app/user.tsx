import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
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
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 10,
          paddingBottom: 30,
        }}
        showsVerticalScrollIndicator={false}
      >
        <BackBtn />
        {data && <UserProfile item={data[0]} />}
      </ScrollView>
    </SafeAreaView>
  );
}
