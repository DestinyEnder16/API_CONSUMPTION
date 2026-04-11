import { SafeAreaView } from "react-native-safe-area-context";

interface SafeAreaComponentProps {
  children: React.ReactNode;
}

export default function SafeAreaComponent({
  children,
}: SafeAreaComponentProps) {
  return <SafeAreaView>{children}</SafeAreaView>;
}
