import { View, Text, Pressable } from 'react-native';
import React from 'react';

export default function ItemContainer({
  listItem,
  onRemovePress,
}: {
  listItem: string;
  onRemovePress: () => void;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: '700' }}>{listItem}</Text>
      <Pressable onPress={onRemovePress}>
        <Text>X</Text>
      </Pressable>
    </View>
  );
}
