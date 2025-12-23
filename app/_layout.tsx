import { styles } from '@/styles/background';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import ToastManager from 'toastify-react-native';
import { PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  return (
    <LinearGradient
      colors={['#f5f7a1', '#ffd194', '#ff9a8b']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.background}
    >
      <ToastManager />
      <PaperProvider>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: 'transparent' },
        }}
      >
        <Stack.Screen
          name="(protected)"
          options={{ headerShown: false, animation: 'none' }}
        />
        <Stack.Screen
          name="login"
          options={{ headerShown: false, animation: 'fade' }}
        />
        <Stack.Screen
          name="register"
          options={{ headerShown: false, animation: 'fade' }}
        />
      </Stack>
      </PaperProvider>
    </LinearGradient>
  );
}
