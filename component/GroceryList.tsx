import { FlatList, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Text } from 'react-native-paper';
import { GroceryItemProps } from '@/types/ListTypes';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';


export default function GroceryList({ groceryList, handleSubtractQuantity, handleAddQuantity, handleSelectedItem, handleDeleteItem }: {
  groceryList: GroceryItemProps[], handleSubtractQuantity: (name: string) => void, handleAddQuantity: (name: string) => void, handleSelectedItem: (item: GroceryItemProps) => void, handleDeleteItem: (item: GroceryItemProps) => void

}) {

  return (
    <FlatList
      data={groceryList}
      renderItem={({ item }) =>
        <Button mode="outlined" style={{ width: "95%", backgroundColor: item.isCompleted ? "grey" : "unset" }} onLongPress={() => handleSelectedItem(item)}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: 5, gap: 5, }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', textDecorationLine: item.isCompleted ? "line-through" : "none" }}>{item.name}</Text>
            <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
              <AntDesign name="minus-circle" size={24} color="black" onPress={() => handleSubtractQuantity(item.name)} />
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.quantity}</Text>
              <AntDesign name="plus-circle" size={24} color="black" onPress={() => handleAddQuantity(item.name)} />
            </View>
            <Feather name="trash-2" size={24} color="black" onPress={() => handleDeleteItem(item)} />
          </View>
        </ Button>}
      keyExtractor={(item) => item.name}
      contentContainerStyle={{ gap: 15, alignItems: "center" }}
    />
  )
}