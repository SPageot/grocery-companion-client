import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from '@/styles/background';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

export default function List() {
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
          gap: 50,
        }}
      >
        <Link
          style={{
            width: '70%',
            borderRadius: 700,
            backgroundColor: 'orange',
            padding: 20,
            flexDirection: 'row',
            justifyContent: 'center',
          }}
          href="/create"
          asChild
        >
          <TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                color: 'white',
                fontWeight: '800',
                textAlign: 'center',
              }}
            >
              Create List
            </Text>
          </TouchableOpacity>
        </Link>
        <Link
          style={{
            width: '70%',
            borderRadius: 700,
            backgroundColor: 'orange',
            padding: 20,
          }}
          href="/modify"
          asChild
        >
          <TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                color: 'white',
                fontWeight: '800',
                textAlign: 'center',
              }}
            >
              Modify List
            </Text>
          </TouchableOpacity>
        </Link>
      </SafeAreaView>
    </LinearGradient>
  );
}
