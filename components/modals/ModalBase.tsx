import React, { useState } from "react";
import {
  Dimensions,
  LayoutChangeEvent,
  ScrollView,
  View,
  Pressable,
  StyleSheet,
} from "react-native";
import Modal from "react-native-modal";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TextPoppins } from "../texts/TextPoppins";
import { colors } from "../../styles/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BOLD } from "../../constants/fonts";

export const ModalBase = ({
  isVisible,
  children,
  onClose,
  title,
}: {
  isVisible: boolean;
  onClose: VoidFunction;
  title: string;
  children: React.ReactNode;
}) => {
  const insets = useSafeAreaInsets();
  const screenHeight = Dimensions.get("window").height;
  const [contentHeight, setContentHeight] = useState(0);

  const handleLayout = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    setContentHeight(height);
  };

  const modalHeight = Math.min(
    contentHeight + 40 + insets.bottom,
    screenHeight * 0.95
  ); // max 95% layar

  return (
    <Modal
      style={styles.modal}
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
    >
      <View
        style={[
          styles.container,
          { maxHeight: screenHeight * 0.95, height: modalHeight },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <TextPoppins style={styles.title} weight={BOLD}>
            {title}
          </TextPoppins>
          <Pressable onPress={onClose}>
            <MaterialIcons
              name="close"
              size={22}
              color={colors["primary-black"]}
            />
          </Pressable>
        </View>

        {/* Content */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <View onLayout={handleLayout}>{children}</View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    color: colors["primary-black"],
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
});
