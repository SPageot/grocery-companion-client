import { Tabs } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function ProtectedLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => {
            return <AntDesign name="home" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          headerShown: false,
          title: 'List',
          tabBarIcon: ({ color, size }) => {
            return (
              <FontAwesome5 name="clipboard-list" size={size} color={color} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="(list)"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
