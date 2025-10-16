import { Image } from "expo-image";
import { useState } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { BOLD, SEMIBOLD } from "../../constants/fonts";
import { FoodVariant } from "../../screens/main/ModalMenuVariantScreen";
import { colors } from "../../styles/colors";
import { blurImg, globalStyle } from "../../styles/globalStyle";
import { ModalDetailFood } from "../modals/ModalDetailFood";
import { TextPoppins } from "../texts/TextPoppins";

export interface FoodHorizontalCard {
  id: string;
  name: string;
  desc: string;
  price: number;
  img?: string;
  soldCount: number;
  likeCount: number;
  variants?: FoodVariant[];
  stock: number;
}

interface Props {
  data: FoodHorizontalCard;
  style?: StyleProp<ViewStyle>;
}

export const FoodHorizontalCard = ({ data, style }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Pressable
        style={[styles.container, style]}
        onPress={() => setIsOpen((prev) => !prev)}
      >
        <View style={styles["container-info"]}>
          <View style={styles.info}>
            <TextPoppins weight={SEMIBOLD} style={{ fontSize: 16 }}>
              {data.name}
            </TextPoppins>

            <View
              style={[
                globalStyle["container-row"],
                {
                  gap: 8,
                },
              ]}
            >
              <TextPoppins style={styles["text-info"]}>
                Terjual {data.soldCount}
              </TextPoppins>

              <View style={globalStyle["dot-divider"]} />

              <TextPoppins style={styles["text-info"]}>
                Disukai {data.likeCount}
              </TextPoppins>
            </View>

            <TextPoppins
              style={styles["text-info"]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {data.desc}
            </TextPoppins>
          </View>

          <TextPoppins weight={BOLD}>{data.price}</TextPoppins>
        </View>

        <Image
          style={styles.image}
          placeholder={blurImg}
          transition={500}
          source={data.img}
          contentFit="cover"
        />
      </Pressable>

      {isOpen && (
        <ModalDetailFood data={data} isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  "container-info": {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  info: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 8,
  },
  "text-info": {
    color: colors["primary-gray"],
    fontSize: 12,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 12,
    aspectRatio: 1 / 1,
  },
});
