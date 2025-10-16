import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SEMIBOLD } from "../../../constants/fonts";
import { useCheckoutStore } from "../../../hooks/useCheckoutStore";
import { colors } from "../../../styles/colors";
import { globalStyle } from "../../../styles/globalStyle";
import { formatToIDR } from "../../../utils/string";
import { ButtonPrimary } from "../../buttons/ButtonPrimary";
import { TextPoppins } from "../../texts/TextPoppins";
import { BasicData } from "../../texts/TextRounded";

interface Props {
  data: BasicData[];
  onSelectMenu: (item: BasicData) => void;
}

const BUTTON_HEIGHT = 42;
const screenDimensions = Dimensions.get("window");
const MODAL_WIDTH = screenDimensions.width * 0.6;
const MODAL_HEIGHT = 500;

export const DetailRestaurantMenu = ({ data, onSelectMenu }: Props) => {
  const insets = useSafeAreaInsets();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { items, getTotalPrice } = useCheckoutStore();

  useEffect(() => {
    console.log("item", items);
  }, [items]);

  const onClose = () => {
    setIsOpen(false);
  };

  const MenuItem = ({ item }: { item: BasicData }) => (
    <Pressable
      style={styles["container-item"]}
      onPress={() => {
        setIsOpen(false);
        onSelectMenu(item);
      }}
    >
      <TextPoppins numberOfLines={1} ellipsizeMode="tail">
        {item.name}
      </TextPoppins>
    </Pressable>
  );

  return (
    <>
      {items.length > 0 && (
        <View
          style={[
            globalStyle["container-row"],
            globalStyle["upper-shadow"],
            {
              height: 100,
              paddingBottom: insets.bottom,
              paddingHorizontal: 16,
              justifyContent: "space-between",
              backgroundColor: colors.white,
            },
          ]}
        >
          <View>
            <Feather name="shopping-bag" size={24} color={colors.primary} />
            <View
              style={{
                height: 20,
                width: 20,
                borderRadius: 20 / 2,
                backgroundColor: colors.primary,
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: -6,
                right: -10,
              }}
            >
              <TextPoppins
                weight={SEMIBOLD}
                style={{ color: colors.white, fontSize: 12 }}
              >
                {items.length}
              </TextPoppins>
            </View>
          </View>

          <View style={globalStyle["container-row"]}>
            <TextPoppins weight={SEMIBOLD} style={{ fontSize: 16 }}>
              {formatToIDR(getTotalPrice())}
            </TextPoppins>

            <ButtonPrimary
              onPress={() => {
                console.log("checkout");
              }}
              title="Checkout"
              buttonStyle={{
                height: 40,
                paddingHorizontal: 16,
                padding: 0,
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </View>
        </View>
      )}

      <View
        style={[
          styles.floatingContainer,
          {
            bottom: items.length > 0 ? 112 : insets.bottom,
          },
        ]}
      >
        <Pressable
          style={[
            styles.button,
            globalStyle["container-row"],
            {
              gap: 2,
            },
          ]}
          onPress={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? (
            <AntDesign name="close" size={12} color={colors.white} />
          ) : (
            <AntDesign name="menu" size={12} color={colors.white} />
          )}

          <TextPoppins weight={SEMIBOLD} style={styles.title}>
            {isOpen ? "Tutup" : "Menu"}
          </TextPoppins>
        </Pressable>
      </View>

      {isOpen && (
        <Modal
          style={[
            styles.modal,
            {
              bottom:
                items.length > 0 ? BUTTON_HEIGHT + 100 : BUTTON_HEIGHT + 16,
            },
          ]}
          isVisible={isOpen}
          onBackdropPress={onClose}
          onSwipeComplete={onClose}
          propagateSwipe={true}
          coverScreen={false}
        >
          <ScrollView bounces={false} style={styles.sv}>
            {data.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
          </ScrollView>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  floatingContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    // bottom: 112,
    alignItems: "center",
  },
  button: {
    height: BUTTON_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: colors.primary,
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    zIndex: 10,
  },
  title: {
    color: colors.white,
    marginLeft: 8,
  },
  modal: {
    position: "absolute",
    right: 0,
    left: 0,
    //bottom: BUTTON_HEIGHT + 100, // button_height + tinggi dari checkout menu dari button
    alignItems: "center",
  },
  sv: {
    width: MODAL_WIDTH,
    maxHeight: MODAL_HEIGHT,
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  "container-item": {
    padding: 12,
    overflow: "hidden",
  },
});
