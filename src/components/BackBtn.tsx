import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import { borderRadius } from '../constants/styles';
import { colors } from '../constants/themes';

export default function BackBtn() {
  return (
    <Pressable onPress={() => router.back()} style={styles.btn}>
      <Ionicons name="arrow-back-outline" size={32} style={styles.btnIcon} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btnIcon: {
    backgroundColor: colors.accentDark,
    borderRadius: borderRadius.full,
    padding: 5,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
