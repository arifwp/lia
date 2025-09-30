import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
import { TextSen } from "./TextSen";

export interface BasicData {
  id: number;
  name: string;
}

interface Props extends PressableProps {
  data: BasicData;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const TextRounded = ({
  data,
  containerStyle,
  textStyle,
  ...rest
}: Props) => {
  return (
    <Pressable style={[styles.container, containerStyle]} {...rest}>
      <TextSen style={[styles.name, textStyle]}>{data.name}</TextSen>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 34,
    borderColor: "#EDEDED",
    borderWidth: 1,
  },
  name: {
    fontSize: 14,
  },
});
