import SignUpForm from '@/components/SignUpForm';
import { styles } from '@/styles/background';
import { buttonStyles } from '@/styles/button';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Register() {
  return (
    <LinearGradient
      colors={['#f5f7a1', '#ffd194', '#ff9a8b']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.background}
    >
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: 400,
            color: '#0A1A2F',
            alignSelf: 'flex-start',
            margin: 20,
          }}
        >
          SIGN UP
        </Text>
        <SignUpForm />
      </SafeAreaView>
    </LinearGradient>
  );
}
