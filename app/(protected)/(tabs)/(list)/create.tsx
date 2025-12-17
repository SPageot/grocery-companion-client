import React, { useEffect, useState } from "react";
import { styles } from "@/styles/background";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { BASE_API } from "@/util/baseApi";
import { useStore } from "@/store/store";
import { Toast } from "toastify-react-native";
import List from "@/components/List";
import ListTitleModal from "@/components/ListTitleModal";

export default function CreateList() {
  const [listItem, setListItem] = useState("");
  const [visible, setIsVisible] = useState(false);
  const [listTitle, setListTitle] = useState("");
  const user = useStore((state: any) => state.user);
  const list = useStore((state: any) => state.list);
  const setList = useStore((state: any) => state.setList);

  const handleChange = (text: string) => {
    setListItem(text);
  };

  useEffect(() => {
    console.log(list)
  },[])

  const addToList = () => {
    if (listItem) {
      if (list.includes(listItem)) {
        Toast.error("Item already in List", "bottom");
        return;
      }
      setList(([...list, listItem]));
      setListItem("");
    }
  };

  const onModal = () => {
    setIsVisible(!visible);
  };

  const onSubmitList = async () => {
    try {
      if (!listTitle){
      throw new Error("List title is required")
      }
      const res = await axios.post(`${BASE_API}/lists/create`, {
        list: {
          userId: user._id,
          title: listTitle,
          listItems: list,
        },
      });

      if (res.data) {
        setList([]);
        setIsVisible(false);
        setListTitle("");
        Toast.success("List Successfully Saved");
      }
    } catch (err) {
      if(err instanceof Error){
        Toast.error(err.message);
      }
    }
  };

  const onRemoveListItemPress = (item: string) =>
    setList(
      list.filter((removeItem: any) => removeItem != item)
    )

  return (
    <>
      <LinearGradient
        colors={["#f5f7a1", "#ffd194", "#ff9a8b"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
      >
      <SafeAreaView style={{ flex: 1, justifyContent: "space-between" }}>
        <List 
          handleListItemChange={handleChange} 
          listItem={listItem} 
          list={list} 
          onAddToList={addToList} 
          onRemoveListItemPress={onRemoveListItemPress} 
          onModal={onModal} />
      </SafeAreaView>
      </LinearGradient>
        <ListTitleModal 
          visible={visible} 
          listTitle={listTitle} 
          onRequestClose={() => setIsVisible(!visible)} 
          onChangeTitleText={(text) => setListTitle(text)} 
          onCancelPress={() => setIsVisible(!visible)} 
          onSubmitList={onSubmitList} 
        />
    </>
  );
}
