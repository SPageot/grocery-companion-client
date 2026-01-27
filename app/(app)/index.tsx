import _ from "lodash";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addList } from "@/features/listSlice";
import Toast from "react-native-toast-message";

export default function Index() {
  const [groceryList, setGroceryList] = useState(mockList)
  const [openModal, setOpenModal] = useState(false)
  const [userInput, setUserInput] = useState("")
  const [titleText, setTitleText] = useState("");
  const [openList, setOpenList] = useState(false);
  const [isModifying, setIsModifying] = useState(false)
  const [userGroceryList, setUserGroceryList] = useState<GroceryListProps>()
  const user = useSelector((state: RootState) => state.users)
  const dispatch = useDispatch()



  const handleSubtractQuantity = (name: string) => {
    setGroceryList(prev => prev.map(item => item.name == name ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item).filter(item => item.quantity > 0))
  }
  const handleAddQuantity = (name: string) => {
    setGroceryList(prev => prev.map(item => item.name == name ? { ...item, quantity: Math.max(0, item.quantity + 1) } : item))
  }

  const handleAddClick = () => {
    const checkForDup = groceryList.filter(listDetails => listDetails.name.toLowerCase() == userInput.toLowerCase());
    if (checkForDup.length === 0) {
      setGroceryList(prev => [...prev, { name: userInput, quantity: 1, is_completed: false }])
      setUserInput("")
    }
    else {
      Toast.show({
        type: 'error',
        text1: "List Duplication Error",
        text1Style: { fontSize: 10 },
        text2: "Item already on list",
        text2Style: { fontSize: 20, color: "red", fontWeight: 500 }
      })
    }
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
    const response = await axios.post(`${BASE_URL}/list/create`, {
      user_id: user._id,
      title: titleText,
      list_items: groceryList,
    })
    const list = await response.data;

    if (list) {
      setGroceryList([])
      setUserGroceryList(undefined)
      setTitleText("")
      setOpenModal(false)
      dispatch(addList({ user_id: user._id, title: titleText, list_items: groceryList }))
    }
  }

  const handleUpdateClick = async () => {
    try {

      const response = await axios.put(`${BASE_URL}/list?id=${userGroceryList?._id}`, {
        user_id: userGroceryList?.user_id,
        title: titleText,
        list_items: groceryList,
      })
      if (response.data) {
        setGroceryList([])
        setIsModifying(false)
        setTitleText("")
        setUserGroceryList(undefined)
        setOpenModal(false)
      }
    } catch (err) {
      console.log(err)
    }

  }

  const handleViewGroceryModal = () => {
    setOpenList(true)
  }

  const handleCloseViewGroceryModal = () => {
    setOpenList(false)
  }

  const handleModifyClick = async (item: GroceryListProps) => {
    const res = await axios.get(`${BASE_URL}/list?id=${item._id}`)
    setUserGroceryList(res.data)
    setGroceryList(res.data.list_items)
    setTitleText(res.data.title)
    setOpenList(false)
    setIsModifying(true)
  }

  const handleSelectedItem = (item: GroceryItemProps) => {
    setGroceryList(prev => prev.map(prevItem => prevItem.name == item.name ? { ...prevItem, isCompleted: !prevItem.is_completed } : prevItem))
  }

  const handleDeleteItem = (item: GroceryItemProps) => {
    setGroceryList(prev => prev.filter(prevItem => prevItem.name != item.name))
  }

  const handleClearList = () => {
    setGroceryList([])
    setTitleText("")
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
              onSubmitEditing={handleAddClick}
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
            {groceryList.length > 0 &&
              <Button mode="outlined" onPress={handleOpenClick}>
                <Text>Submit List</Text>
              </Button>}
            <Button mode="outlined" onPress={handleViewGroceryModal}>
              <Text>View List</Text>
            </Button>
            {groceryList.length > 0 && <Button mode="outlined" onPress={handleClearList}>
              <Text>Clear List</Text>
            </Button>}
          </View>
        </SafeAreaView>
      </GradientBackground>
      <GroceryTitleModal visible={openModal} handleCloseClick={handleCloseClick} titleText={titleText} onChangeTitleText={onChangeTitleText} handleSubmitClick={!isModifying ? handleSubmitClick : handleUpdateClick} />
      <ViewGroceryListModal visible={openList} handleCloseClick={handleCloseViewGroceryModal} handleModifyClick={handleModifyClick} userId={user._id} />
    </>
  );
}
