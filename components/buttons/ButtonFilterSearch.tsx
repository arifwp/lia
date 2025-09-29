import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { colors } from "../../styles/colors";
import { ModalBase } from "../modals/ModalBase";
import { SearchModalFilter } from "../page/search/SearchModalFilter";

interface Props extends PressableProps {
  style?: StyleProp<ViewStyle>;
}

export const ButtonFilterSearch = ({ style, ...rest }: Props) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <View>
      <Pressable
        style={[styles.container, style]}
        onPress={() => {
          setIsModalVisible(true);
        }}
        {...rest}
      >
        <Ionicons name="options-sharp" size={24} color={"white"} />
      </Pressable>

      <SearchModalFilter isVisible={isModalVisible} onClose={onModalClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: colors.primary,
    justifyContent: "center",
    borderRadius: 12,
  },
});
