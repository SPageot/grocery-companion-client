import { View, Text, Modal, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from '@/styles/modalStyle'
import { Button } from 'react-native-paper'
import axios from 'axios'
import { GroceryListProps } from '@/types/ListTypes'
import { BASE_URL } from '@/util/misc'
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
    SharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';
import Feather from '@expo/vector-icons/Feather';
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

const ViewGroceryListModal = ({ visible, handleCloseClick, handleModifyClick, userId }: { visible: boolean, handleCloseClick: () => void, handleModifyClick: (item: GroceryListProps) => Promise<void>, userId: string }) => {
    const [groceryList, setGroceryList] = useState<any[]>([])
    const list = useSelector((state: RootState) => state.list)


    useEffect(() => {
        const fetchUserGroceryList = async () => {
            const res = await axios.get(`${BASE_URL}/list/all?id=${userId}`)
            setGroceryList(res.data)
        }
        fetchUserGroceryList()
    }, [list])

    const handleDeletePress = async (item: GroceryListProps) => {
        const prevGroceryList = groceryList
        setGroceryList(prev => prev.filter(prevItem => prevItem.title != item.title))
        try {
            await axios.delete(`${BASE_URL}/list?id=${item._id}`)
        } catch (err) {
            console.log(err)
            setGroceryList(prevGroceryList)
        }
    }

    function RightAction(prog: SharedValue<number>, drag: SharedValue<number>, item: GroceryListProps) {
        const styleAnimation = useAnimatedStyle(() => {
            console.log('showRightProgress:', prog.value);
            console.log('appliedTranslation:', drag.value);

            return {
                transform: [{ translateX: drag.value + 50 }],
                justifyContent: "center",
                alignItems: "center",
                width: 60
            };
        });

        return (
            <Reanimated.View style={styleAnimation}>
                <Feather onPress={() => handleDeletePress(item)} name="trash-2" size={20} color="black" />
            </Reanimated.View>
        );
    }

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={handleCloseClick}
        >
            <View style={styles.overlay}>
                <View style={styles.viewModal}>
                    <Text style={{ fontSize: 20, fontWeight: 500, }}>Grocery List</Text>
                    {groceryList.length > 0 ? <FlatList
                        data={groceryList}
                        renderItem={({ item }) => {
                            return <ReanimatedSwipeable
                                friction={1}
                                enableTrackpadTwoFingerGesture
                                renderRightActions={(prog, drag) => RightAction(prog, drag, item)}>
                                <Button onPress={() => handleModifyClick(item)} mode='outlined'>
                                    <Text>{item.title}</Text>
                                </Button>
                            </ReanimatedSwipeable>
                        }}
                        contentContainerStyle={{ padding: 10, gap: 10 }}
                    /> : <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><Text style={{ fontSize: 24, fontWeight: 200, fontStyle: "italic" }}>No List</Text></View>}
                    <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                        <Button mode="outlined" onPress={handleCloseClick}>
                            <Text>Close</Text>
                        </Button>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ViewGroceryListModal