import { UserIdentification } from '@/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';
import { employeeData } from '../constants/data';
import { images } from '../constants/images';
import { borderRadius, fonts, fontSizes, spacing } from '../constants/styles';
import { colors } from '../constants/themes';

export default function UserProfile({
  name,
  username,
  email,
  phone,
  website,
  address,
  company,
  id,
}: UserIdentification) {
  return (
    <View style={styles.container}>
      {images[id] && (
        <Image cachePolicy={'disk'} source={images[id]} style={styles.img} />
      )}
      <Text style={styles.header}>{employeeData[id - 1].role}</Text>

      <View style={styles.infoContainer}>
        <View style={{ marginBottom: spacing.xl }}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.body}>@{username}</Text>
        </View>

        <View style={styles.infoField}>
          <Ionicons style={styles.icon} name="lock-closed-outline" />
          <Text style={styles.body}>Employee ID: {id}</Text>
        </View>

        <View style={styles.infoField}>
          <Ionicons style={styles.icon} name="mail-outline" />
          <Text style={styles.body}>Email: {email}</Text>
        </View>

        <View style={styles.infoField}>
          <Ionicons style={styles.icon} name="call-outline" />
          <Text style={styles.body}>Phone: {phone}</Text>
        </View>

        <View style={styles.infoField}>
          <Ionicons style={styles.icon} name="globe-outline" />
          <Text style={styles.body}>Website: {website}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    marginVertical: 6,
    marginHorizontal: 12,
  },
  header: {
    fontSize: fontSizes.heading,
    fontFamily: fonts.bold,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  infoContainer: {
    gap: 10,
  },
  img: {
    width: 150,
    borderRadius: borderRadius.full,
    height: 150,
    marginBottom: spacing.xxxl,
    alignSelf: 'center',
  },
  title: {
    fontSize: fontSizes.xxl,
    fontFamily: fonts.bold,
    color: colors.accent,
  },
  body: {
    fontFamily: fonts.medium,
    color: colors.primaryDark,
    lineHeight: 21,
    fontSize: fontSizes.lg,
  },
  icon: {
    fontSize: 24,
    color: colors.accentDark,
  },
  infoField: {
    gap: 10,
    marginBottom: spacing.xl,
  },
});
