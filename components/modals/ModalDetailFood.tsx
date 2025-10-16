import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Dispatch, SetStateAction, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { BOLD, SEMIBOLD } from "../../constants/fonts";
import { useMainNavigation } from "../../hooks/useAppNav";
import { FoodVariant } from "../../screens/main/ModalMenuVariantScreen";
import { colors } from "../../styles/colors";
import { blurImg } from "../../styles/globalStyle";
import { formatToIDR } from "../../utils/string";
import { ButtonPrimary } from "../buttons/ButtonPrimary";
import { TextPoppins } from "../texts/TextPoppins";
import { ModalBase } from "./ModalBase";

export interface ModalDetailFood {
  id: string;
  name: string;
  desc: string;
  price: number;
  img?: string;
  isFavorite?: boolean;
  stock: number;
  variants?: FoodVariant[];
}

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  data: ModalDetailFood;
}

export const ModalDetailFood = ({ isOpen, setIsOpen, data }: Props) => {
  const navigation = useMainNavigation();

  const [isFavorite, setIsFavorite] = useState<boolean>(
    data.isFavorite || false
  );

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleAddMenu = () => {
    if (data.stock === 0) return;

    if (data.variants && data.variants.length > 0) {
      setIsOpen(false);
      setTimeout(() => {
        navigation.navigate("ModalMenuVariant", {
          idFood: data.id,
        });
      }, 300);
    } else {
      console.log("Tambahkan Menu", data);
    }
  };

  const footer = (
    <View style={styles["wrap-bottom-tools"]}>
      <View style={styles["wrap-tools"]}>
        <Pressable
          style={styles["button-tools"]}
          onPress={(e) => {
            e.preventDefault();
            setIsFavorite((prev) => !prev);
          }}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={16}
            color={isFavorite ? colors.red : colors["primary-black"]}
          />

          <TextPoppins weight={SEMIBOLD}>
            {isFavorite ? "Disimpan" : "Simpan"}
          </TextPoppins>
        </Pressable>

        <View
          style={[
            styles["wrap-tools"],
            { justifyContent: "flex-end", gap: 12 },
          ]}
        >
          <Pressable
            style={styles["button-tools"]}
            onPress={(e) => {
              e.preventDefault();
            }}
          >
            <Ionicons name="alert" size={16} color="black" />

            <TextPoppins weight={SEMIBOLD}>Report</TextPoppins>
          </Pressable>

          <Pressable
            style={styles["button-tools"]}
            onPress={(e) => {
              e.preventDefault();
            }}
          >
            <MaterialIcons name="share" size={16} color="black" />

            <TextPoppins weight={SEMIBOLD}>Share</TextPoppins>
          </Pressable>
        </View>
      </View>

      <ButtonPrimary
        onPress={handleAddMenu}
        buttonStyle={{
          backgroundColor:
            data.stock === 0 ? colors["primary-gray"] : colors.primary,
        }}
        title={data.stock === 0 ? "Stok Habis" : "Tambahkan Menu"}
      />
    </View>
  );

  return (
    <ModalBase
      isVisible={isOpen}
      onClose={handleClose}
      title="Detail"
      footer={footer}
    >
      <View style={styles["container-modal"]}>
        <View style={styles["wrap-summary"]}>
          {data.img && (
            <Image
              style={styles.image}
              placeholder={blurImg}
              transition={1000}
              source={data.img}
              contentFit="contain"
            />
          )}

          <TextPoppins weight={SEMIBOLD} style={styles["name-modal"]}>
            {data.name}
          </TextPoppins>

          <TextPoppins style={styles["desc-modal"]}>{data.desc}</TextPoppins>

          <TextPoppins style={styles["price-modal"]} weight={BOLD}>
            {formatToIDR(data.price)}
          </TextPoppins>
        </View>
      </View>
    </ModalBase>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    aspectRatio: 1 / 1,
    borderRadius: 12,
  },
  "wrap-summary": {
    flexDirection: "column",
    gap: 12,
  },
  "container-modal": {
    flexDirection: "column",
    gap: 24,
    position: "relative",
  },
  "name-modal": {
    fontSize: 20,
    color: colors["primary-black"],
  },
  "desc-modal": {
    color: colors["primary-gray"],
  },
  "price-modal": {
    fontSize: 16,
    color: colors["primary-black"],
  },
  "wrap-bottom-tools": {
    gap: 16,
  },
  "wrap-tools": {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  "button-tools": {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderWidth: 1,
    gap: 6,
    borderColor: "#e5e5e5",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
});
