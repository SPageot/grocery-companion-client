import { Button, FlatList, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '@/styles/background'
import { LinearGradient } from 'expo-linear-gradient'
import UserInput from '@/components/UserInput'
import axios from 'axios'
import { BASE_API } from '@/util/baseApi'
import ItemContainer from '@/components/ItemContainer'
import { useStore } from '@/store/store'


export default function Recipes() {
    const [chatInput, setChatInput] = useState("")
    const [recipeList, setRecipeList] = useState<any>([])
    const [allAdded,setAllAdded] = useState(false)
    const list = useStore((state: any) => state.list);
    const setList = useStore((state: any) => state.setList);
    

    useEffect(() => {
        const isAllAdded = recipeList.every((item:string) => list.includes(item))
      
if(isAllAdded){
    setAllAdded(true)
}else{
    setAllAdded(false)
}
    },[list, recipeList])

    const handleGetReceipePress=  async() => {
        const cleanChatInput = chatInput.trim()
        if(cleanChatInput){
        const res = await axios.post(`${BASE_API}/recipe/`,{
            chatInput
        })

        if(res.data){
            setRecipeList(res.data.map((item:any) => item.ingredient))
        }
    }
    }

    useEffect(() => {
        

    },[list])

    const addToList = (item:string) => {
        setList([...list, item])
    }

    const removeFromList = (item:string) => {
        setList(list.filter((listItem:string) => listItem != item))
    }

    const handleAddAllPress =() => {
        setList([...list, ...recipeList.filter((item:string) => !list.includes(item))])
    }

    const handleRemoveAllPress =() => {
        setList([list.filter((item:string) => !recipeList.includes(item))])
    }

    const handleClearAllPress =() => {
        setRecipeList([])
    }

    useEffect(() => {
        setRecipeList([])
    },[])

  return (
    <LinearGradient
      colors={['#f5f7a1', '#ffd194', '#ff9a8b']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.background}
    >
    <SafeAreaView style={{ flex:1,justifyContent:"center"}}>
        <View style={{flexDirection:"row", justifyContent:"center"}}>
            <UserInput placeholder='What recipe are you looking for' value={chatInput} onChangeText={(text) => setChatInput(text)}/>
            <Button title='Get' onPress={handleGetReceipePress}/>
        </View>
     {recipeList.length > 0 ? <FlatList
        style={{ marginBottom: 30 }}
        data={recipeList}
        renderItem={({ item }) => (
          <ItemContainer
            listItem={item}
            isInList={list.find((listItem: any) => item == listItem)}
            onRemoveFromListPress={() => removeFromList(item)}
            onAddToListPress={() => addToList(item) }
            isRecipeListItem={true}
          />
        )}
        keyExtractor={(item) => item}
      />:<View style={{flex:1, justifyContent:"center", alignItems:"center"}}><Text style={{fontSize:20, fontWeight:200,fontStyle:"italic"}}>Search For Recipes Above</Text></View>}
    
      {recipeList.length > 0 && <View
        style={{
          width: "100%",
          padding: 10,
          position: "absolute",
          bottom: 0,
          left: 0,
          backgroundColor: "orange",
        }}
      >
        <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>        
            {!allAdded ? <Button color="white" onPress={handleAddAllPress} title="Add All" />:<Button color="white" onPress={handleRemoveAllPress} title="Remove All" />}
            <Button title="Clear List" onPress={handleClearAllPress} /></View>
      </View>
      }
    </SafeAreaView>
    </LinearGradient>
  )
}