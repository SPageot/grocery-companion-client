import GradientBackground from "@/component/GradientBackground";
import GroceryList from "@/component/GroceryList";
import { mockList } from "@/mock/mocklist";
import { useState } from "react";
import { View, TextInput } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from '@expo/vector-icons/Feather';
import GroceryTitleModal from "@/component/GroceryTitleModal";
import axios from 'axios'
import ViewGroceryListModal from "@/component/ViewGroceryListModal";
import { GroceryItemProps, GroceryListProps } from "@/types/ListTypes";
import { BASE_URL } from "@/util/misc";

export default function Index() {
  const [groceryList, setGroceryList] = useState(mockList)
  const [openModal, setOpenModal] = useState(false)
  const [userInput, setUserInput] = useState("")
  const [titleText, setTitleText] = useState("");
  const [openList, setOpenList] = useState(false);
  const userId = "12ed2d2"

  const handleSubtractQuantity = (name: string) => {
    setGroceryList(prev => prev.map(item => item.name == name ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item).filter(item => item.quantity > 0))
  }
  const handleAddQuantity = (name: string) => {
    setGroceryList(prev => prev.map(item => item.name == name ? { ...item, quantity: Math.max(0, item.quantity + 1) } : item))
  }

  const handleAddClick = () => {
    setGroceryList(prev => [...prev, { name: userInput, quantity: 1, isCompleted: false }])
    setUserInput("")
  }

  const handleCloseClick = () => {
    setOpenModal(false)
  }

  const handleOpenClick = () => {
    setOpenModal(true)
  }

  const onChangeTitleText = (text: string) => {
    setTitleText(text)
  }

  const handleSubmitClick = async () => {
    const response = await axios.post(`${BASE_URL}/lists/create`, {
      list: {
        userId,
        title: titleText,
        listItems: groceryList,
      }

    })
    const list = await response.data
  }

  const handleViewGroceryModal = () => {
    setOpenList(true)
  }

  const handleCloseViewGroceryModal = () => {
    setOpenList(false)
  }

  const handleModifyClick = async (item: GroceryListProps) => {
    const res = await axios.get(`${BASE_URL}/lists/userList/${item._id}`)
    setGroceryList(res.data.listItems)
    setTitleText(res.data.title)
    setOpenList(false)
  }

  const handleSelectedItem = (item: GroceryItemProps) => {
    setGroceryList(prev => prev.map(prevItem => prevItem.name == item.name ? { ...prevItem, isCompleted: !prevItem.isCompleted } : prevItem))
  }

  const handleDeleteItem = (item: GroceryItemProps) => {
    setGroceryList(prev => prev.filter(prevItem => prevItem.name != item.name))
  }

  return (
    <>
      <GradientBackground>
        <SafeAreaView
          style={{
            flex: 1,
          }}
          edges={['top', 'left', 'right']}
        >
          <View style={{ flexDirection: "row", alignItems: "center", borderBottomColor: "black", borderBottomWidth: 1, margin: 20 }}>
            <TextInput
              value={userInput}
              onChangeText={text => setUserInput(text)}
              style={{ flex: 1, padding: 5 }}
            />
            <Button onPress={handleAddClick}><Feather name="plus" size={24} color="black" /></Button>
          </View>
          {groceryList.length > 0 ?
            <GroceryList groceryList={groceryList}
              handleSubtractQuantity={handleSubtractQuantity}
              handleAddQuantity={handleAddQuantity}
              handleSelectedItem={handleSelectedItem}
              handleDeleteItem={handleDeleteItem}
            /> :
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 30, fontWeight: 200, fontStyle: "italic" }}>List Empty
              </Text>
            </View>
          }

          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", padding: 20, gap: 10 }}>
            {groceryList.length > 0 && <Button mode="outlined" onPress={handleOpenClick}>
              <Text>Submit List</Text>
            </Button>}
            <Button mode="outlined" onPress={handleViewGroceryModal}>
              <Text>View List</Text>
            </Button>
            {groceryList.length > 0 && <Button mode="outlined" onPress={() => setGroceryList([])}>
              <Text>Clear List</Text>
            </Button>}
          </View>
        </SafeAreaView>
      </GradientBackground>
      <GroceryTitleModal visible={openModal} handleCloseClick={handleCloseClick} titleText={titleText} onChangeTitleText={onChangeTitleText} handleSubmitClick={handleSubmitClick} />
      <ViewGroceryListModal visible={openList} handleCloseClick={handleCloseViewGroceryModal} handleModifyClick={handleModifyClick} userId={userId} />
    </>
  );
}
