import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useMainNavigation } from "../../hooks/useAppNav";
import { colors } from "../../styles/colors";

interface InputSearchProps {
  value?: string;
  onChange?: (text: string) => void;
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
  isSearchScreen?: boolean;
}

export const InputSearch = ({
  value = "",
  onChange,
  placeholder = "Cari menu atau restoran...",
  containerStyle,
  isSearchScreen = false,
}: InputSearchProps) => {
  const navigation = useMainNavigation();
  const [search, setSearch] = useState<string>(value);

  const handleChangeText = useCallback(
    (text: string) => {
      setSearch(text);
      onChange?.(text);
    },
    [onChange]
  );

  const handleClear = useCallback(() => {
    setSearch("");
    onChange?.("");
  }, [onChange]);

  if (!isSearchScreen) {
    return (
      <TouchableOpacity
        style={[styles.container, containerStyle]}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Search")}
      >
        <Ionicons name="search" size={20} color="#888" style={styles.icon} />
        <View pointerEvents="none" style={{ flex: 1 }}>
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={colors["primary-gray"]}
            editable={false}
          />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <Ionicons name="search" size={20} color="#888" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors["primary-gray"]}
        value={search}
        onChangeText={handleChangeText}
        autoCorrect={false}
        autoCapitalize="none"
        autoFocus={isSearchScreen}
      />
      {search.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Ionicons
            name="close-circle"
            size={20}
            color={colors["primary-gray"]}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 42,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    fontFamily: "Poppins-Regular",
  },
  clearButton: {
    marginLeft: 8,
  },
});
