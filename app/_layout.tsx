import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store } from "../store/store"
import { Provider } from 'react-redux'
import Toast from 'react-native-toast-message';


export default function RootLayout() {
  return (
    <>
      <GestureHandlerRootView>
        <Provider store={store}>
          <Stack screenOptions={{ headerShown: false }} />
        </Provider>
      </GestureHandlerRootView>
      <Toast />
    </>
  )
}
