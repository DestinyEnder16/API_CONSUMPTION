import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackBtn from '../components/BackBtn';
import ErrorScreen from '../components/errorScreen';
import LoadingSpinner from '../components/LoadingSpinner';
import UserProfile from '../components/UserProfile';
import { colors } from '../constants/themes';
import { getUsersInfo } from '../services/getUsersInfo';

export default function User() {
  const { id } = useLocalSearchParams();

  const { isError, isLoading, data } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUsersInfo(Number(id)),
  });

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
        decelerationRate={'fast'}
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
