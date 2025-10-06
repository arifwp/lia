import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useDebounce } from "../../hooks/useDebounce";
import { RootStackParamList } from "../../navs/RootNav";
import { colors } from "../../styles/colors";

interface InputSearchProps {
  value?: string;
  onChange?: (text: string) => void;
  placeholder?: string;
  debounceTime?: number;
  containerStyle?: StyleProp<ViewStyle>;
  isSearchScreen?: boolean;
}

export const InputSearch = ({
  value = "",
  onChange,
  placeholder = "Search food or restaurants...",
  debounceTime = 1000,
  containerStyle,
  isSearchScreen = false,
}: InputSearchProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [search, setSearch] = useState<string>(value);
  const debouncedValue = useDebounce(search, debounceTime);

  // Ref untuk tracking apakah onChange sudah dipanggil
  const isFirstRender = useRef(true);

  // Sync external value changes ke internal state
  useEffect(() => {
    setSearch(value);
  }, [value]);

  // Debounce effect
  useEffect(() => {
    // Skip first render untuk menghindari double call
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    onChange?.(debouncedValue);
  }, [debouncedValue]);

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

  // Interactive search
  return (
    <View style={[styles.container, containerStyle]}>
      <Ionicons name="search" size={20} color="#888" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors["primary-gray"]}
        value={search}
        onChangeText={setSearch}
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
    height: 52,
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
    fontSize: 16,
    color: "#333",
    fontFamily: "Sen-Regular",
  },
  clearButton: {
    marginLeft: 8,
  },
});
