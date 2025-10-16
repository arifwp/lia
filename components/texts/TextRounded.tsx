import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
import { colors } from "../../styles/colors";
import { TextPoppins } from "./TextPoppins";

export interface BasicData {
  id: number | string;
  name: string;
  img?: string;
  desc?: string;
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
      <TextPoppins style={textStyle} numberOfLines={1} ellipsizeMode="tail">
        {data.name}
      </TextPoppins>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 200,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 34,
    borderColor: colors["medium-gray"],
    borderWidth: 0.5,
  },
});
