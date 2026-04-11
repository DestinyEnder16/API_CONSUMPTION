import { SafeAreaView } from "react-native-safe-area-context";

interface SafeAreaComponentProps {
  children: React.ReactNode;
  useSafeArea?: boolean;
}

export default function SafeAreaComponent({
  useSafeArea = true,
  children,
}: SafeAreaComponentProps) {
  return useSafeArea ? (
    <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
  ) : (
    children
  );
}
