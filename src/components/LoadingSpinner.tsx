import { ActivityIndicator, View } from 'react-native';

export default function LoadingSpinner() {
  return (
    <View
      style={{
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator size={100} color={'red'} />
    </View>
  );
}
