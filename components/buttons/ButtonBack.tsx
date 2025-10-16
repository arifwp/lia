import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";
import { RootStackParamList } from "../../navs/navigation";
import { colors } from "../../styles/colors";
import { globalStyle } from "../../styles/globalStyle";

interface Props extends PressableProps {
  containerStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  iconSize?: number;
  iconColor?: string;
  children?: React.ReactNode;
}

export const ButtonBack = ({
  containerStyle,
  iconStyle,
  iconSize = 24,
  iconColor = colors["primary-black"],
  children,
  ...rest
}: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable
      style={[globalStyle["circle-button"], containerStyle]}
      onPress={() => navigation.goBack()}
      {...rest}
    >
      {children || (
        <Octicons
          name="arrow-left"
          size={iconSize}
          color={iconColor}
          style={iconStyle}
        />
      )}
    </Pressable>
  );
};
