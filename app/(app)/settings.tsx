import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import AntDesign from '@expo/vector-icons/AntDesign';
import GradientBackground from '@/component/GradientBackground';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Feather from '@expo/vector-icons/Feather';
import { BASE_URL } from '@/util/misc';
import axios from 'axios';
import { useRouter } from 'expo-router';


export default function Settings() {
    const user = useSelector((state: RootState) => state.users)
    const router = useRouter()
    const [disable, setDisable] = useState(true)
    const [userDetails, setUserDetails] = useState({
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        username: user.username,
        password: user.password
    })

    const handleSavePress = async () => {
        await axios.put(`${BASE_URL}/user?id=${user._id}`, userDetails);
        console.log("User Details Successfully Updated!!")
    }

    const handleDeletePress = async () => {
        const res = await axios.delete(`${BASE_URL}/user?id=${user._id}`);
        console.log("User Deleted Successfully")
        if (res.data) {
            router.push("/login")
        }

    }
    return (
        <GradientBackground>
            <SafeAreaView style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                <Text style={{ alignSelf: "flex-start", padding: 20, fontSize: 30, fontWeight: 800 }}>Settings</Text>
                <View style={{ alignItems: "center", flex: 1 }}>
                    <View style={{ padding: 10 }}>
                        <Text>Name</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TextInput disabled={disable} onChangeText={(text) => setUserDetails(prev => ({ ...prev, name: text }))} value={userDetails.name} mode='outlined' style={{ width: "100%" }} />

                        </View>
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text>Username</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TextInput disabled={disable} onChangeText={(text) => setUserDetails(prev => ({ ...prev, username: text }))} value={userDetails.username} mode='outlined' style={{ width: "100%" }} />

                        </View>
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text>Email</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TextInput disabled={disable} onChangeText={(text) => setUserDetails(prev => ({ ...prev, email: text }))} value={userDetails.email} mode='outlined' style={{ width: "100%" }} />

                        </View>
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text>Phone Number</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TextInput disabled={disable} onChangeText={(text) => setUserDetails(prev => ({ ...prev, phone_number: text }))} value={userDetails.phone_number} mode='outlined' style={{ width: "100%" }} />

                        </View>
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text>Password</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TextInput disabled={disable} secureTextEntry={true} onChangeText={(text) => setUserDetails(prev => ({ ...prev, password: text }))} value={userDetails.password} mode='outlined' style={{ width: "100%" }} />

                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: "100%" }}>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Text>{!disable && "Cancel"} Edit User Details</Text>
                        <AntDesign name="edit" size={24} color="black" onPress={() => setDisable(!disable)} />
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Text>Save User Details</Text>
                        <Feather onPress={handleSavePress} name="save" size={24} color="black" />
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Text>Delete User Account</Text>
                        <Feather onPress={handleDeletePress} name="save" size={24} color="black" />
                    </View>
                </View>
            </SafeAreaView>
        </GradientBackground>
    )
}