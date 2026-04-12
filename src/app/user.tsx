import { UserIdentification } from '@/types';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackBtn from '../components/BackBtn';
import ErrorScreen from '../components/errorScreen';
import LoadingSpinner from '../components/LoadingSpinner';
import UserProfile from '../components/UserProfile';
import { borderRadius } from '../constants/styles';
import { colors } from '../constants/themes';
import { getUsersInfo } from '../services/getUsersInfo';

export default function User() {
  const [data, setData] = useState<UserIdentification[]>([]);
  const { id } = useLocalSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function getData() {
    try {
      setIsLoading(true);
      const json = await getUsersInfo(Number(id));
      setData(json);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

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

const styles = StyleSheet.create({
  btnIcon: {
    backgroundColor: colors.accentDark,
    borderRadius: borderRadius.full,
    padding: 5,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
