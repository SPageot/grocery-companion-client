import { View, Text } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '@/styles/background';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ModifyList() {
  return (
    <LinearGradient
      colors={['#f5f7a1', '#ffd194', '#ff9a8b']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.background}
    >
      <SafeAreaView></SafeAreaView>
    </LinearGradient>
  );
}
