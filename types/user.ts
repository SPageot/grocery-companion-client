import { TextInputProps } from 'react-native';

export type UserInputProp = {
  value: string;
  onChangeText: (text: string) => void;
  textType?: TextInputProps['textContentType'];
  inputName?: string;
  secureTextEntry?: boolean;
  autoComplete?: TextInputProps['autoComplete'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  labelColor?: string;
  borderColor?: string;
  inputFontColor?: string;
};
