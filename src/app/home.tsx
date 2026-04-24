import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { FlatList, View } from 'react-native';

import BackBtn from '../components/BackBtn';
import ErrorScreen from '../components/errorScreen';
import LoadingSpinner from '../components/LoadingSpinner';
import SafeAreaComponent from '../components/SafeAreaComponent';
import SearchBar from '../components/SearchBar';
import UserCard from '../components/UserCard';
import { spacing } from '../constants/styles';
import { colors } from '../constants/themes';
import { useGetUsersQuery } from '../store/api';

export default function Home() {
  const [searchInput, setSearchInput] = useState('');

  const { isError, isLoading, data } = useGetUsersQuery();

  const filteredData =
    searchInput.length > 0 && data
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
  ) : filteredData && filteredData.length > 0 ? (
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
