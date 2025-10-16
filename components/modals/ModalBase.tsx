import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useState } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { BOLD } from "../../constants/fonts";
import { colors } from "../../styles/colors";
import { TextPoppins } from "../texts/TextPoppins";

interface Props {
  isVisible: boolean;
  onClose: VoidFunction;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const ModalBase = ({
  isVisible,
  children,
  onClose,
  title,
  footer,
}: Props) => {
  const screenHeight = Dimensions.get("window").height;
  const [footerHeight, setFooterHeight] = useState<number>(0);

  return (
    <Modal
      style={styles.modal}
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      propagateSwipe={true}
    >
      <View
        style={[
          styles.container,
          {
            maxHeight: screenHeight * 0.93,
          },
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
          bounces={false}
          contentContainerStyle={[
            styles.scrollContainer,
            {
              paddingBottom: footerHeight + 16,
            },
          ]}
        >
          {children}
        </ScrollView>

        {footer && (
          <View
            style={styles.footer}
            onLayout={(e) => setFooterHeight(e.nativeEvent.layout.height)}
          >
            {footer}
          </View>
        )}
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
    flexShrink: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexShrink: 0,
  },
  title: {
    fontSize: 18,
    color: colors["primary-black"],
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    flexGrow: 1,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    backgroundColor: colors.white,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
});
