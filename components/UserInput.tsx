import { View, Text, TextInput } from 'react-native';
import React from 'react';
import { UserInputProp } from '@/types/user';

const UserInput: React.FC<UserInputProp> = ({
  value,
  onChangeText,
  textType,
  inputName,
  secureTextEntry,
  autoComplete,
  autoCapitalize,
}) => {
  return (
    <View style={{ gap: 10 }}>
      <Text style={{ color: '#0A1A2F' }}>{inputName}</Text>
      <TextInput
        textContentType={textType}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        autoComplete={autoComplete}
        autoCapitalize={autoCapitalize}
        style={{
          borderWidth: 1,
          borderColor: '#0A1A2F',
          width: 300,
          height: 40,
        }}
      />
    </View>
  );
};

export default UserInput;
