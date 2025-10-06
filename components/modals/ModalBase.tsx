import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { PropsWithChildren } from "react";
import {
  Dimensions,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import Modal from "react-native-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BOLD } from "../../constants/fonts";
import { colors } from "../../styles/colors";
import { TextPoppins } from "../texts/TextPoppins";

interface Props extends PropsWithChildren {
  isVisible: boolean;
  onClose: VoidFunction;
  title: string;
  style?: StyleProp<ViewStyle>;
  height?: string;
}

export const ModalBase = ({
  isVisible,
  children,
  onClose,
  style,
  title,
  height,
}: Props) => {
  const insets = useSafeAreaInsets();
  const screenHeight = Dimensions.get("window").height;

  const getHeight = () => {
    if (!height) return screenHeight - insets.top;

    if (typeof height === "string" && height.includes("%")) {
      const percent = parseFloat(height) / 100;
      return screenHeight * percent;
    }

    return Number(height);
  };

  return (
    <View>
      <Modal
        style={styles.modal}
        animationIn={"slideInUp"}
        animationOut={"slideOutDown"}
        isVisible={isVisible}
        swipeDirection={"down"}
        swipeThreshold={90}
        onBackdropPress={onClose}
        onSwipeComplete={onClose}
        onBackButtonPress={onClose}
      >
        {/* Modal Content */}
        <View style={[styles["modal-content"], { height: getHeight() }]}>
          <View style={styles["title-container"]}>
            <TextPoppins style={styles.title} weight={BOLD}>
              {title}
            </TextPoppins>
            <Pressable onPress={onClose}>
              <MaterialIcons
                name="close"
                color={colors["primary-black"]}
                size={22}
              />
            </Pressable>
          </View>

          <View style={[styles["view-children"], style]}>{children}</View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  "modal-content": {
    // height: "75%",
    width: "100%",
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  "title-container": {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    color: colors["primary-black"],
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "flex-end",
  },
  "view-children": {
    flexDirection: "column",
    paddingHorizontal: 20,
    gap: 16,
  },
});
