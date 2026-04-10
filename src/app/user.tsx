import { useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingSpinner from '../components/LoadingSpinner';
import UserProfile from '../components/UserProfile';

type responseData = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export default function User() {
  const [data, setData] = useState<responseData[]>([]);
  const { id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const getData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/users?id=${id}`
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
          <View>
            <Text style={styles.header}>{data[0]?.name}</Text>
          </View>
        )}
        data={data}
        showsVerticalScrollIndicator={false}
        decelerationRate={'fast'}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <UserProfile
            name={item.name}
            username={item.username}
            email={item.email}
            phone={item.phone}
            website={item.website}
            city={item.address.city}
            companyName={item.company.name}
          />
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
