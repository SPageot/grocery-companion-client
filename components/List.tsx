import { View, Text, Button, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import UserInput from './UserInput'
import ItemContainer from './ItemContainer'
import { UserListProps } from '@/types/list'

export default function List({handleListItemChange, listItem, onAddToList, list, onRemoveListItemPress, onModal, onModifyPress}:UserListProps) {
  return (
    <>
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <UserInput
        placeholder="Add items here"
        onChangeText={handleListItemChange}
        value={listItem}
      />
      {listItem && <Button title="Add" onPress={onAddToList} />}
    </View>
    {list.length > 0 ? (
      <FlatList
        style={{ marginBottom: 30 }}
        data={list}
        renderItem={({ item }) => (
          <ItemContainer
            listItem={item}
            onModifyPress={onModifyPress}
            onRemovePress={onRemoveListItemPress ? () => onRemoveListItemPress(item):undefined }
          />
        )}
        keyExtractor={(item) => item}
      />
    ) : (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{ fontSize: 30, fontWeight: 200, fontStyle: "italic" }}
        >
          No Items In List
        </Text>
      </View>
    )}
    {list.length > 0 && (
      <View
        style={{
          width: "100%",
          padding: 10,
          position: "absolute",
          bottom: 0,
          left: 0,
          backgroundColor: "orange",
        }}
      >
        <Button color="white" onPress={onModal} title="Submit List" />
      </View>
    )}
  </>
  )
}