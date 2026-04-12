import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';
import { fonts, fontSizes, spacing } from '../constants/styles';
import { colors } from '../constants/themes';
import SafeAreaComponent from './SafeAreaComponent';

interface ErrorScreenProps {
  message: string;
}

export default function ErrorScreen({ message }: ErrorScreenProps) {
  return (
    <SafeAreaComponent>
      <View style={styles.container}>
        <Ionicons name="alert-circle-outline" size={64} color={colors.error} />
        <Text style={styles.title}>Something went wrong</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </SafeAreaComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xxl,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.xxl,
    color: colors.textPrimary,
    marginTop: spacing.lg,
  },
  message: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
