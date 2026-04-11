import { StyleSheet, TextInput } from "react-native";
import { colors } from "../constants/themes";
import { borderRadius, fonts, fontSizes, spacing } from "../constants/styles";

interface SearchProps {
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}

export default function SearchBar({ value, onChangeText }: SearchProps) {
  return (
    <TextInput
      style={searchStyles.input}
      placeholder="Search employees by name"
      placeholderTextColor={colors.textMuted}
      value={value}
      onChangeText={(e) => onChangeText(e)}
      keyboardType="numeric"
      returnKeyType="search"
    />
  );
}
const searchStyles = StyleSheet.create({
  input: {
    backgroundColor: colors.primaryDark,
    color: colors.textOnPrimary,
    padding: spacing.md,
    marginVertical: spacing.md,
    borderRadius: borderRadius.md,
    fontSize: fontSizes.md,
    fontFamily: fonts.medium,
  },
});
