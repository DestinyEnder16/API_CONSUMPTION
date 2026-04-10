import { useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingSpinner from '../components/LoadingSpinner';
import PostCard from '../components/PostCard';

type responseData = {
  userId: string;
  id: number;
  title: string;
  body: string;
};

const userIdInfo: Record<string, string> = {
  '1': 'Destiny',
  '2': 'Nifemi',
  '3': 'James',
  '4': 'John',
  '5': 'Gabriel',
  '6': 'Fame',
  '7': 'Precious',
  '8': 'Eric',
  '9': 'Maureen',
  '10': 'Grace',
};

export default function User() {
  const [data, setData] = useState<responseData[]>([]);
  const { id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const getData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/posts?userId=${id}`
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
    <SafeAreaView>
      <LoadingSpinner />
    </SafeAreaView>
  ) : (
    <SafeAreaView>
      <FlatList
        style={{ paddingHorizontal: 20, paddingTop: 10 }}
        ListHeaderComponent={() => (
          <View>
            <Text style={styles.header}>{userIdInfo[String(id)]}</Text>
          </View>
        )}
        data={data}
        showsVerticalScrollIndicator={false}
        decelerationRate={'fast'}
        keyExtractor={(item) => String(item.title)}
        renderItem={({ item }) => (
          <PostCard title={item.title} body={item.body} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 32,
    fontWeight: 500,
    marginBottom: 30,
  },
});
