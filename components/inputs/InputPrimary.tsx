import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { colors } from "../../styles/colors";
import { FieldErrors } from "react-hook-form";

interface Props extends TextInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: VoidFunction;
  containerStyle?: ViewStyle;
  labelStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  error?: string;
}

export const InputPrimary = ({
  label,
  placeholder,
  value,
  onChange,
  containerStyle,
  labelStyle,
  inputStyle,
  error,
  ...rest
}: Props) => {
  const [focused, setFocused] = useState<boolean>(false);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          focused && styles["input-focus"],
          error && styles["input-error"],
          ,
          inputStyle,
        ]}
        placeholder={placeholder ? placeholder : undefined}
        onChangeText={onChange}
        autoCorrect={false}
        autoCapitalize="none"
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...rest}
      />
      {error && <Text style={styles["text-error"]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: {
    fontWeight: 400,
    fontSize: 12,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ACAFB5",
    borderRadius: 8,
    padding: 10,
  },
  "input-focus": {
    borderColor: colors.primary,
  },
  "input-error": {
    borderColor: "red",
  },
  "text-error": {
    color: "red",
    fontSize: 12,
  },
});
