import { router } from 'expo-router';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SafeAreaComponent from '../components/SafeAreaComponent';
import { BriefcaseIcon } from '../constants/icons';
import {
  borderRadius,
  fonts,
  fontSizes,
  fontWeights,
  spacing,
} from '../constants/styles';
import { colors } from '../constants/themes';

export default function Index() {
  return (
    <>
      <ImageBackground source={require('@/assets/images/calm_blue.png')}>
        <SafeAreaComponent useSafeArea={false}>
          <View style={styles.container}>
            <View>
              <BriefcaseIcon />
            </View>
            <Text style={styles.header}>Welcome to Employee Directory.</Text>
            <Text style={styles.txt}>Manage your workforce with ease.</Text>
            <Pressable
              onPress={() => router.navigate('/home')}
              style={styles.btn}
            >
              <Text style={styles.btnText}>Access Company Data</Text>
            </Pressable>
          </View>
        </SafeAreaComponent>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: spacing.lg,
    gap: spacing.lg,
  },

  txt: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.medium,
    color: colors.primary,
    textAlign: 'center',
    fontFamily: fonts.regular,
  },

  header: {
    fontSize: fontSizes.xl,
    color: colors.primary,
    textAlign: 'center',
    fontFamily: fonts.semibold,
  },

  btn: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
  },

  btnText: {
    fontSize: fontSizes.lg,
    fontFamily: fonts.semibold,
    color: colors.white,
  },
});
