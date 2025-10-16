import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
import { SEMIBOLD } from "../../constants/fonts";
import { colors } from "../../styles/colors";
import { TextPoppins } from "../texts/TextPoppins";

interface Props extends PressableProps {
  onPress: (data?: any) => void;
  title: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  isLoading?: boolean;
}

export const ButtonPrimary = ({
  onPress,
  title,
  buttonStyle,
  textStyle,
  isLoading = false,
  ...rest
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, buttonStyle]}
      disabled={isLoading}
      {...rest}
    >
      <TextPoppins style={[styles.text, textStyle]} weight={SEMIBOLD}>
        {title}
      </TextPoppins>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 14,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  text: {
    textAlign: "center",
    color: "white",
    fontWeight: 600,
    fontSize: 14,
  },
});
