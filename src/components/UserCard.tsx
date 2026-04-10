import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type PostItemProps = {
  name: string;
  email: string;
  id: number;
};

export default function UserCard({ name, email, id }: PostItemProps) {
  return (
    <Pressable
      onPress={() =>
        router.navigate({
          pathname: '/user',
          params: {
            id,
          },
        })
      }
      style={styles.container}
    >
      <Text style={styles.title}>{name}</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.body}>{email}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  body: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});
