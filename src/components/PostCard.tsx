import { StyleSheet, Text, View } from 'react-native';

type PostCardProps = {
  title: string;
  body: string;
};

export default function PostCard({ title, body }: PostCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a2e',
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 12,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#e94560',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#eee',
  },
  body: {
    fontSize: 14,
    color: '#aaa',
    lineHeight: 21,
  },
});
