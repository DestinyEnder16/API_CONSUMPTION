import { StyleSheet, Text, View } from 'react-native';

type UserProfileProps = {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  city: string;
  companyName: string;
};

export default function UserProfile({
  name,
  username,
  email,
  phone,
  website,
  city,
  companyName,
}: UserProfileProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.body}>@{username}</Text>
      <Text style={styles.body}>Email: {email}</Text>
      <Text style={styles.body}>Phone: {phone}</Text>
      <Text style={styles.body}>Website: {website}</Text>
      <Text style={styles.body}>City: {city}</Text>
      <Text style={styles.body}>Company: {companyName}</Text>
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
