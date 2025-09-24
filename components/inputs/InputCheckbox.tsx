import Checkbox, { CheckboxProps } from "expo-checkbox";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";

interface Props extends CheckboxProps {
  label: string;
  value: boolean;
  containerStyle?: ViewStyle;
  checkboxStyle?: ViewStyle;
}

export const InputCheckbox = ({
  label,
  value,
  onValueChange,
  containerStyle,
  checkboxStyle,
  ...rest
}: Props) => {
  const handleToggle = () => {
    if (onValueChange) {
      onValueChange(!value);
    }
  };

  return (
    <Pressable
      style={[styles.container, containerStyle]}
      onPress={handleToggle}
    >
      <Checkbox
        style={[styles.checkbox, checkboxStyle]}
        value={value}
        color={value ? "#3085FE" : undefined}
        onValueChange={onValueChange}
        {...rest}
      />

      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkbox: {
    borderRadius: 4,
    borderWidth: 0.5,
  },
  label: {
    fontSize: 12,
    fontWeight: 400,
  },
});
