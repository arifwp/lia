import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { colors } from "../../styles/colors";

interface Props extends TouchableOpacityProps {
  onPress: (data?: any) => void;
  title: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
}

export const ButtonPrimary = ({
  onPress,
  title,
  buttonStyle,
  textStyle,
  ...rest
}: Props) => {
  return (
    <Pressable onPress={onPress} style={[styles.button, buttonStyle]} {...rest}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
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
