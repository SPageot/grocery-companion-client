import { View, Text, Modal, Button } from 'react-native'
import React from 'react'
import UserInput from './UserInput'
import { UserListTitleProps } from '@/types/list'

export default function ListTitleModal({visible,onRequestClose,onChangeTitleText,listTitle,onCancelPress,onSubmitList}:UserListTitleProps) {
  return (
    <Modal
    visible={visible}
    animationType="fade"
    onRequestClose={onRequestClose}
    transparent={true}
  >
    <View
      style={{
        height: "100%",
        width: "100%",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        backgroundColor: "rgba(0,0,0,0.9)",
      }}
    >
      <UserInput
        borderColor="white"
        labelColor="white"
        inputFontColor="white"
        inputName="Add Title To List"
        onChangeText={onChangeTitleText}
        value={listTitle}
      />
      <View style={{ flexDirection: "row" }}>
        <Button title="Cancel" onPress={onCancelPress} />
        <Button title="Submit List" onPress={onSubmitList} />
      </View>
    </View>
  </Modal>
  )
}