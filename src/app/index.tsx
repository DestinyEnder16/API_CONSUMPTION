import { Pressable, StyleSheet, Text, View } from "react-native";
import SafeAreaComponent from "../components/SafeAreaComponent";
import { router } from "expo-router";

export default function Index() {
  return (
    <SafeAreaComponent>
      <View style={styles.container}>
        <Pressable onPress={() => router.navigate("/home")} style={styles.btn}>
          <Text style={styles.btnText}>Access Company Data</Text>
        </Pressable>
      </View>
    </SafeAreaComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },

  btn: {
    backgroundColor: "yellow",
    color: "black",
    padding: 12,
    borderRadius: 12,
  },

  btnText: {
    fontSize: 18,
    fontWeight: 500,
  },
});
