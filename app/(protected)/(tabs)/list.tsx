import { FlatList, View, Button, Modal } from 'react-native';
import React, { useState } from 'react';
import { styles } from '@/styles/background';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserInput from '@/components/UserInput';
import { ListItems } from '@/types/list';
import ItemContainer from '@/components/ItemContainer';
import axios from 'axios';
import { BASE_API } from '@/util/baseApi';
import { useStore } from '@/store/store';

export default function List() {
  const [listItem, setListItem] = useState('');
  const [list, setList] = useState<ListItems[]>([]);
  const [visible, setIsVisible] = useState(false);
  const [listTitle, setListTitle] = useState('');
  const user = useStore((state: any) => state.user);

  const handleChange = (text: string) => {
    setListItem(text);
  };

  const addToList = () => {
    if (listItem) {
      setList((prev) => [
        ...prev,
        { id: String(Number(list.length + 1)), listItem },
      ]);
      setListItem('');
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
          listItems: list.map((item) => item.listItem),
        },
      });

      if (res.data) {
        setList([]);
        setIsVisible(false);
        setListTitle('');
      }
    } catch (err) {
      console.log(err);
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
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            <UserInput onChangeText={handleChange} value={listItem} />
            {listItem && <Button title="Add" onPress={addToList} />}
          </View>
          <FlatList
            style={{
              flex: 1,
            }}
            data={list}
            renderItem={({ item }) => (
              <ItemContainer
                listItem={item.listItem}
                onRemovePress={() =>
                  setList((prev) =>
                    prev.filter(
                      (removeItem) => removeItem.listItem != item.listItem
                    )
                  )
                }
              />
            )}
            keyExtractor={(item) => item.id}
          />
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              borderWidth: 1,
              width: '100%',
            }}
          >
            <Button onPress={onModal} title="Submit List" />
          </View>
        </SafeAreaView>
      </LinearGradient>
      <Modal
        visible={visible}
        animationType="fade"
        onRequestClose={() => setIsVisible(!visible)}
        transparent={true}
      >
        <View
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            backgroundColor: 'rgba(0,0,0,0.9)',
          }}
        >
          <UserInput
            borderColor="white"
            labelColor="white"
            inputFontColor="white"
            inputName="Add Title To List"
            onChangeText={(text) => setListTitle(text)}
            value={listTitle}
          />
          <View style={{ flexDirection: 'row' }}>
            <Button title="Cancel" onPress={() => setIsVisible(!visible)} />
            <Button title="Submit List" onPress={onSubmitList} />
          </View>
        </View>
      </Modal>
    </>
  );
}
