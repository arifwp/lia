import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
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
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, buttonStyle]}
      activeOpacity={0.8}
      {...rest}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
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
