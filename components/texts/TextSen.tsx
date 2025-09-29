import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from "react-native";
import { colors } from "../../styles/colors";

interface Props extends TextProps {
  style?: StyleProp<TextStyle>;
  weight?: "Regular" | "Bold" | "Medium" | "ExtraBold" | "SemiBold";
  children: React.ReactNode;
}

export const TextSen = ({ style, weight, children, ...rest }: Props) => {
  return (
    <Text
      style={[styles.text, { fontFamily: `Sen-${weight}` }, style]}
      {...rest}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 400,
    fontSize: 14,
    color: colors["primary-black"],
  },
});
