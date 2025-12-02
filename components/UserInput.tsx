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
  labelColor,
  borderColor,
  inputFontColor,
}) => {
  return (
    <View style={{ gap: 10 }}>
      {inputName && (
        <Text
          style={{
            color: labelColor || '#0A1A2F',
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          {inputName}
        </Text>
      )}
      <TextInput
        textContentType={textType}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        autoComplete={autoComplete}
        autoCapitalize={autoCapitalize}
        style={{
          borderWidth: 1,
          borderColor: borderColor || '#0A1A2F',
          width: 300,
          height: 40,
          color: inputFontColor || 'black',
        }}
      />
    </View>
  );
};

export default UserInput;
