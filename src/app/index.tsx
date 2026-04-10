import { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingSpinner from '../components/LoadingSpinner';
import PostItem from '../components/PostItem';

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
};

function SearchBar({ value, onChangeText }: SearchBarProps) {
  return (
    <TextInput
      style={searchStyles.input}
      placeholder="Search posts by ID"
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
    backgroundColor: '#1a1a2e',
    color: '#eee',
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 10,
    borderRadius: 10,
    fontSize: 16,
  },
});

export default function Index() {
  const [data, setData] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [searching, setSearching] = useState(false);

  // SOLUTION Showing a single post per user
  const uniqueUserPosts = data.filter(
    (post, index, self) =>
      self.findIndex((p) => p.userId === post.userId) === index
  );

  // IMPORTANT creating the fetcher
  async function getData() {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/posts`);
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
        `${process.env.EXPO_PUBLIC_API_URL}/posts?userId=${userId}`
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
    <SafeAreaView>
      <LoadingSpinner />
    </SafeAreaView>
  ) : (
    <SafeAreaView>
      <FlatList
        style={{ paddingBottom: 10 }}
        ListHeaderComponent={() => (
          <>
            <Text
              style={{ fontSize: 32, textAlign: 'center', fontWeight: '600' }}
            >
              Data
            </Text>

            <SearchBar value={search} onChangeText={handleSearchChange} />
          </>
        )}
        decelerationRate={'fast'}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => String(item.title)}
        data={search ? data : uniqueUserPosts}
        renderItem={({ item }) => (
          <PostItem title={item.title} body={item.body} id={item.userId} />
        )}
      />
    </SafeAreaView>
  );
}
