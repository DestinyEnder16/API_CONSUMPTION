import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { employeeData } from '../constants/data';
import { borderRadius, fonts, fontSizes, spacing } from '../constants/styles';
import { colors } from '../constants/themes';

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
      <View style={styles.idContainer}>
        <Text style={styles.id}>{id}</Text>
      </View>

      <View style={{ paddingVertical: 8 }}>
        <Text style={styles.title}>{name}</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.body}>{email}</Text>
        </View>

        <Text style={styles.desc}>{employeeData[id - 1].role}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginVertical: spacing.lg,
    borderRadius: borderRadius.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    flexDirection: 'row',
    gap: spacing.md,
  },
  desc: {
    fontFamily: fonts.medium,
    color: colors.textPrimary,
  },
  id: {
    fontSize: fontSizes.xxl,
    fontFamily: fonts.bold,
    color: colors.textOnPrimary,
  },
  idContainer: {
    backgroundColor: colors.primaryDark,
    padding: spacing.md,
    borderTopLeftRadius: borderRadius.md,
    borderBottomLeftRadius: borderRadius.md,
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSizes.lg,
    fontFamily: fonts.bold,
    marginBottom: 6,
    color: '#333',
  },
  body: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: fonts.medium,
    lineHeight: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: colors.primaryDark,
  },
});
