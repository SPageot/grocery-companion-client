import { FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '@/styles/background';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { BASE_API } from '@/util/baseApi';
import { useStore } from '@/store/store';
import ItemContainer from '@/components/ItemContainer';
import { ListProps } from '@/types/list';
import List from '@/components/List';
import { Toast } from 'toastify-react-native';
import ListTitleModal from '@/components/ListTitleModal';

export default function ModifyList() {
  const [list, setList] = useState<{id:string, title:string}[] | []>([]);
  const [listItem, setListItem] = useState<ListProps | {}>({});
  const [userList,setUserList] = useState<string[]>([])
  const [userListItem, setUserListItem] = useState("")
  const [listTitle, setListTitle] = useState("");
  const [visible, setIsVisible] = useState(false);
  const user = useStore((state: any) => state.user);

  useEffect(() => {
    const fetchList = async () => {
      const res = await axios.get(`${BASE_API}/lists/${user._id}`);
      if (res.data) {
        setList(res.data.map((item:ListProps) => ({id:item._id, title:item.title})));
      }
    };

    fetchList();
  }, []);

  
  const getItem = async(listId:string) => {
    const res = await axios.get(`${BASE_API}/lists/userList/${listId}`)
    setListItem(res.data)
    setUserList(res.data.listItems)
    setListTitle(res.data.title)
  }

  const handleChange= (text:string) => {
    setUserListItem(text)
  }

  const onModal = () => {
    setIsVisible(!visible);
  };

  const addToList = () => {
    if (listItem) {
      if (userList.includes(userListItem)) {
        Toast.error("Item already in List", "bottom");
        return;
      }
      setUserList((prev) => [...prev, userListItem]);
    }
  };

  const onRemoveListItemPress = (item: string) =>
    setList((prev) =>
      prev.filter((removeItem) => removeItem.title != item)
    )

    const onUpdateList = async () => {
      if("_id" in listItem){
      try {
        const res = await axios.put(`${BASE_API}/lists/${listItem._id}`, {
          list: {
            userId: user._id,
            title: listTitle,
            listItems: userList,
          },
        });
  
        if (res.data) {
          setList([]);
          setIsVisible(false);
          setListTitle("");
          Toast.success("List Successfully Updated");
        }else{
          throw new Error("Error getting data from server, Please try again!")
        }
      } catch (err) {
        if(err instanceof Error){
        Toast.error(err.message)
        }
        console.error(err)
      }
    }
    };

  return (
    <>
    <LinearGradient
      colors={['#f5f7a1', '#ffd194', '#ff9a8b']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.background}
    >
      {userList.length > 0? <SafeAreaView style={{ flex: 1, justifyContent: "space-between" }}>
      <List handleListItemChange={handleChange} listItem={userListItem} list={userList} onAddToList={addToList} onRemoveListItemPress={onRemoveListItemPress} onModal={onModal}  />
       
      </SafeAreaView>
      :<SafeAreaView><FlatList
          data={list}
          renderItem={({ item }:{item: {id:string, title:string}}) => (
            <ItemContainer
              listItem={item.title}
              onModifyPress={() => getItem(item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
     }
    </LinearGradient>
    <ListTitleModal visible={visible} listTitle={listTitle} onRequestClose={() => setIsVisible(!visible)} onChangeTitleText={(text) => setListTitle(text)} onCancelPress={() => setIsVisible(!visible)} onSubmitList={onUpdateList} />
    </>
  );
}
