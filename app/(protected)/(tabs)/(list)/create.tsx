import { FlatList, View, Button, Modal } from 'react-native';
import React, { useState } from 'react';
import { styles } from '@/styles/background';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserInput from '@/components/UserInput';
import ItemContainer from '@/components/ItemContainer';
import axios from 'axios';
import { BASE_API } from '@/util/baseApi';
import { useStore } from '@/store/store';
import { Toast } from 'toastify-react-native';

export default function CreateList() {
  const [listItem, setListItem] = useState('');
  const [list, setList] = useState<string[]>([]);
  const [visible, setIsVisible] = useState(false);
  const [listTitle, setListTitle] = useState('');
  const user = useStore((state: any) => state.user);

  const handleChange = (text: string) => {
    setListItem(text);
  };

  const addToList = () => {
    if (listItem) {
      if (list.includes(listItem)) {
        Toast.error('Item already in List', 'bottom');
        return;
      }
      setList((prev) => [...prev, listItem]);
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
          listItems: list,
        },
      });

      if (res.data) {
        setList([]);
        setIsVisible(false);
        setListTitle('');
        Toast.success('List Successfully Saved');
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
        <SafeAreaView style={{ flex: 1, justifyContent: 'space-between' }}>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <UserInput onChangeText={handleChange} value={listItem} />
            {listItem && <Button title="Add" onPress={addToList} />}
          </View>
          <FlatList
            style={{ marginBottom: 30 }}
            data={list}
            renderItem={({ item }) => (
              <ItemContainer
                listItem={item}
                onRemovePress={() =>
                  setList((prev) =>
                    prev.filter((removeItem) => removeItem != item)
                  )
                }
              />
            )}
            keyExtractor={(item) => item}
          />
          {list.length > 0 && (
            <View
              style={{
                width: '100%',
                padding: 10,
                position: 'absolute',
                bottom: 0,
                left: 0,
                backgroundColor: 'orange',
              }}
            >
              <Button color="white" onPress={onModal} title="Submit List" />
            </View>
          )}
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
