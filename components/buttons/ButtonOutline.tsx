import {
  Pressable,
  StyleProp,
  StyleSheet,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { SEMIBOLD } from "../../constants/fonts";
import { colors } from "../../styles/colors";
import { TextPoppins } from "../texts/TextPoppins";

interface Props extends TouchableOpacityProps {
  onPress: (data?: any) => void;
  title: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
  isLoading?: boolean;
}

export const ButtonOutline = ({
  onPress,
  title,
  buttonStyle,
  textStyle,
  isLoading = false,
  ...rest
}: Props) => {
  return (
    <Pressable onPress={onPress} style={[styles.button, buttonStyle]} {...rest}>
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
    borderWidth: 1,
    borderColor: colors.primary,
  },
  text: {
    textAlign: "center",
    color: colors.primary,
  },
});
