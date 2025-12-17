import { View, Text, Pressable } from 'react-native';
import React from 'react';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function ItemContainer({
  listItem,
  onRemovePress,
  onModifyPress,
  onAddToListPress,
  isInList,
  isRecipeListItem,
  onRemoveFromListPress

}: {
  listItem: string;
  onRemovePress?: () => void;
  onModifyPress?:() => void;
  onAddToListPress?:() => void;
  isInList?:boolean;
  isRecipeListItem?:boolean;
  onRemoveFromListPress?:() => void
}) {


  return (
    <Pressable
      onPress={onModifyPress}
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
      {onRemovePress &&<Pressable onPress={onRemovePress}>
      <EvilIcons name="trash" size={24} color="black" />
      </Pressable>}
      {isRecipeListItem && ((onAddToListPress && !isInList )? <Pressable onPress={onAddToListPress}><Entypo name="add-to-list" size={24} color="black" /></Pressable>:<Pressable onPress={onRemoveFromListPress}><AntDesign name="check-circle" size={24} color="green" /></Pressable>)}
    </Pressable>
  );
}
