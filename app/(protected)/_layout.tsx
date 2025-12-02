import { useStore } from '@/store/store';
import { Redirect, Stack } from 'expo-router';

export default function ProtectedLayout() {
  const isLoggedIn = useStore((state: any) => state.isLoggedIn);
  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
