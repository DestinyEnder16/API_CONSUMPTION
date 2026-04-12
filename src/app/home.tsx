import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import { UserIdentification } from '@/types';
import BackBtn from '../components/BackBtn';
import ErrorScreen from '../components/errorScreen';
import LoadingSpinner from '../components/LoadingSpinner';
import SafeAreaComponent from '../components/SafeAreaComponent';
import SearchBar from '../components/SearchBar';
import UserCard from '../components/UserCard';
import { spacing } from '../constants/styles';
import { colors } from '../constants/themes';
import { getUsersInfo } from '../services/getUsersInfo';

export default function Home() {
  const [data, setData] = useState<UserIdentification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  // IMPORTANT creating the fetcher
  async function getData() {
    try {
      setIsLoading(true);
      const json = await getUsersInfo();
      setData(json);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(function () {
    getData();
  }, []);

  const filteredData =
    searchInput.length > 0
      ? data.filter((datum) =>
          datum.name.toLowerCase().includes(searchInput.toLowerCase())
        )
      : data;

  const HomeHeader = (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: spacing.md,
        }}
      >
        <BackBtn />
        <Ionicons name="person-circle" size={48} />
      </View>
      <SearchBar value={searchInput} onChangeText={setSearchInput} />
    </>
  );
  return isError ? (
    <ErrorScreen message={'Employee directory could not be loaded'} />
  ) : isLoading ? (
    <LoadingSpinner />
  ) : filteredData.length > 0 ? (
    <SafeAreaComponent>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <FlatList
          contentContainerStyle={{ paddingVertical: 30, paddingHorizontal: 24 }}
          ListHeaderComponent={HomeHeader}
          decelerationRate={'fast'}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => String(item.id)}
          data={filteredData}
          renderItem={({ item }) => (
            <UserCard name={item.name} email={item.email} id={item.id} />
          )}
          ListEmptyComponent={() => <LoadingSpinner />}
        />
      </View>
    </SafeAreaComponent>
  ) : (
    <SafeAreaComponent useSafeArea={false}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          paddingVertical: 64,
          paddingHorizontal: 24,
        }}
      >
        {HomeHeader}
        <ErrorScreen message="Employee not found" />
      </View>
    </SafeAreaComponent>
  );
}
