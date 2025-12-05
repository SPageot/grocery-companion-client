import { FlatList, View, Button, Modal, Text } from "react-native";
import React, { useState } from "react";
import { styles } from "@/styles/background";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import UserInput from "@/components/UserInput";
import ItemContainer from "@/components/ItemContainer";
import axios from "axios";
import { BASE_API } from "@/util/baseApi";
import { useStore } from "@/store/store";
import { Toast } from "toastify-react-native";
import List from "@/components/List";
import ListTitleModal from "@/components/ListTitleModal";

export default function CreateList() {
  const [listItem, setListItem] = useState("");
  const [list, setList] = useState<string[]>([]);
  const [visible, setIsVisible] = useState(false);
  const [listTitle, setListTitle] = useState("");
  const user = useStore((state: any) => state.user);

  const handleChange = (text: string) => {
    setListItem(text);
  };

  const addToList = () => {
    if (listItem) {
      if (list.includes(listItem)) {
        Toast.error("Item already in List", "bottom");
        return;
      }
      setList((prev) => [...prev, listItem]);
      setListItem("");
    }
  };

  const onModal = () => {
    setIsVisible(!visible);
  };

  const onSubmitList = async () => {
    try {
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
      console.log(err);
    }
  };

  const onRemoveListItemPress = (item: string) =>
    setList((prev) =>
      prev.filter((removeItem) => removeItem != item)
    )

  return (
    <>
      <LinearGradient
        colors={["#f5f7a1", "#ffd194", "#ff9a8b"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
      ><SafeAreaView style={{ flex: 1, justifyContent: "space-between" }}>
        <List handleListItemChange={handleChange} listItem={listItem} list={list} onAddToList={addToList} onRemoveListItemPress={onRemoveListItemPress} onModal={onModal} />
        </SafeAreaView>
      </LinearGradient>
      <ListTitleModal visible={visible} listTitle={listTitle} onRequestClose={() => setIsVisible(!visible)} onChangeTitleText={(text) => setListTitle(text)} onCancelPress={() => setIsVisible(!visible)} onSubmitList={onSubmitList} />
    </>
  );
}
