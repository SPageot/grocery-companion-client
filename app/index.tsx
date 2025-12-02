import { styles } from '@/styles/background';
import { buttonStyles } from '@/styles/button';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

export default function Index() {
  return (
    <LinearGradient
      colors={['#f5f7a1', '#ffd194', '#ff9a8b']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.background}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 50,
        }}
      >
        <Text
          style={{
            fontSize: 40,
            fontWeight: 'bold',
            color: '#0A1A2F',
          }}
        >
          Dont 4Get
        </Text>
        <View style={buttonStyles.buttonContainer}>
          <TouchableOpacity
            style={buttonStyles.button}
            onPress={() => router.push('/login')}
          >
            <Text style={{ color: '#0A1A2F' }}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={buttonStyles.button}
            onPress={() => router.push('/register')}
          >
            <Text style={{ color: '#0A1A2F' }}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}
