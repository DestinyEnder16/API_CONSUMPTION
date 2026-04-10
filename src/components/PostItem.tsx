import { router } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';

type PostItemProps = {
  title: string;
  body: string;
  id: number;
};

export default function PostItem({ title, body, id }: PostItemProps) {
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
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
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
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  body: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
