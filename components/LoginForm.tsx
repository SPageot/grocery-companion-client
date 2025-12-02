import React, { useState } from 'react';
import { router } from 'expo-router';
import UserInput from './UserInput';
import FormContainer from './FormContainer';
import axios from 'axios';
import { Toast } from 'toastify-react-native';
import { BASE_API } from '@/util/baseApi';

const LoginForm = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleFetchUser = async () => {
    try {
      const res = await axios.post(`${BASE_API}/users/login`, {
        username,
        password,
      });

      if (res.data) {
        Toast.success('Loggin In');
      }
    } catch (err) {
      console.log(err);
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
