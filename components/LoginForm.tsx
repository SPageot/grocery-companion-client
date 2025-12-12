import React, { useState } from 'react';
import { router } from 'expo-router';
import UserInput from './UserInput';
import FormContainer from './FormContainer';
import axios from 'axios';
import { BASE_API } from '@/util/baseApi';
import { useStore } from '@/store/store';
import { Toast } from 'toastify-react-native';

const LoginForm = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const setUser = useStore((state: any) => state.setUser);
  const setIsLoggedIn = useStore((state: any) => state.setIsLoggedIn);

  const handleFetchUser = async () => {
    try {
      if(!username){
        throw new Error("Username is required")
      }
      if(!password){
        throw new Error("Password is required")
      }
      const res = await axios.post(`${BASE_API}/users/login`, {
        username,
        password,
      });

      if (res.data) {
        setUser(res.data);
        setIsLoggedIn(true);
        router.replace('/');
      }
    } catch (err) {
      if(err instanceof Error){
      Toast.error(err.message);
      }
    }
  };

  return (
    <FormContainer
      onLeftButtonPress={() => router.push('/register')}
      leftButtonText="Go to Register"
      onRightButtonPress={handleFetchUser}
      rightButtonText="Login"
    >
      <UserInput
        inputName="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <UserInput
        secureTextEntry={true}
        autoComplete="password"
        autoCapitalize="none"
        inputName="Password"
        textType="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
    </FormContainer>
  );
};

export default LoginForm;
