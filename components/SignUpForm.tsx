import React, { useState } from 'react';
import FormContainer from './FormContainer';
import { router } from 'expo-router';
import UserInput from './UserInput';
import { Toast } from 'toastify-react-native';
import axios, { AxiosError } from 'axios';
import { BASE_API } from '@/util/baseApi';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');

  const handleRegisterUser = async () => {
    try {
      if(!username){
        throw new Error("Missing username! Field is required")
      }
      if(!password){
        throw new Error("Missing password! Field is required")
      }
      if(!email){
        throw new Error("Missing email! Field is required")
      }
      if(!phoneNumber){
        throw new Error("Missing phone number! Field is required")
      }
      if(!fullName){
        throw new Error("Missing fullName! Field is required")
      }
      const res = await axios.post(`${BASE_API}/users/register`, {
        username,
        password,
        email,
        phoneNumber,
        fullName,
      });
      if (res.data) {
        Toast.success('Successfully Registered!');
        router.push('/login');
      }
    } catch (err) {
      console.log(err)
      if(err instanceof AxiosError){
        Toast.error(err.response?.data)
      }
      if(err instanceof Error){
        Toast.error(err.message)
      }
    }
  };

  return (
    <FormContainer
      onLeftButtonPress={() => router.push('/login')}
      leftButtonText="Go to Login"
      onRightButtonPress={handleRegisterUser}
      rightButtonText="Sign Up"
    >
      <UserInput
        inputName="Full Name"
        value={fullName}
        onChangeText={(text) => setFullName(text)}
      />
      <UserInput
        inputName="Email Address"
        textType="emailAddress"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <UserInput
        inputName="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
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

export default SignUpForm;
