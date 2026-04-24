import { UserIdentification } from "@/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { employeeData } from "../constants/data";
import { images } from "../constants/images";
import { borderRadius, fonts, fontSizes, spacing } from "../constants/styles";
import { colors } from "../constants/themes";

type profileProps = {
  item: UserIdentification;
};

export default function UserProfile({ item }: profileProps) {
  const blurhash = "L6PZfSi_.AyE_3t7t7R**0o#DgR4";
  return (
    <View style={styles.container}>
      {images[item.id] && (
        <Image
          cachePolicy={"disk"}
          source={images[item.id]}
          style={styles.img}
          placeholder={{ blurhash }}
          transition={500}
        />
      )}
      <Text style={styles.header}>{employeeData[item.id - 1].role}</Text>

      <View style={styles.infoContainer}>
        <View style={{ marginBottom: spacing.xl }}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.body}>@{item.username}</Text>
        </View>

        <View style={styles.infoField}>
          <Ionicons style={styles.icon} name="lock-closed-outline" />
          <Text style={styles.body}>Employee ID: {item.id}</Text>
        </View>

        <View style={styles.infoField}>
          <Ionicons style={styles.icon} name="mail-outline" />
          <Text style={styles.body}>Email: {item.email}</Text>
        </View>

        <View style={styles.infoField}>
          <Ionicons style={styles.icon} name="call-outline" />
          <Text style={styles.body}>Phone: {item.phone}</Text>
        </View>

        <View style={styles.infoField}>
          <Ionicons style={styles.icon} name="globe-outline" />
          <Text style={styles.body}>Website: {item.website}</Text>
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
    textAlign: "center",
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
    alignSelf: "center",
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
